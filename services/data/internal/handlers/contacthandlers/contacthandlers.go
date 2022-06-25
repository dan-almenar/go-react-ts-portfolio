package contacthandlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/dan-almenar/go-react-ts-portfolio/services/data/internal/data/contactdata"
	"github.com/dan-almenar/go-react-ts-portfolio/services/data/internal/utils/firebaseutils"
)

type contactHandler struct {
	l *log.Logger
}

func NewContactHandler(l *log.Logger) *contactHandler {
	return &contactHandler{l}
}

func (h contactHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.l.Printf("Received request for '/contact': %v\n", r.Method)
	switch r.Method {
	case "PUT":
		http.Error(w, "PUT not allowed", http.StatusMethodNotAllowed)
	case "DELETE":
		h.handleDelete(w, r)
	case "POST":
		h.handlePost(w, r)
	default:
		h.handleGet(w, r)
	}
}

func (h contactHandler) handleGet(w http.ResponseWriter, r *http.Request) error {
	isAdmin, err := firebaseutils.VerifyAdminToken(r.Header.Get("Authorization"), r.Context())
	if err != nil {
		h.l.Printf("Error verifying admin token: %v\n", err)
		http.Error(w, "Error: "+err.Error(), http.StatusInternalServerError)
		return err
	}
	if !isAdmin {
		h.l.Printf("Error: not an admin user\n")
		http.Error(w, "Error: Forbidden access", http.StatusForbidden)
		return err
	}

	contactDocs, err := firebaseutils.GetAllDocuments("comments")
	if err != nil {
		h.l.Printf("Error getting documents: %v\n", err)
		http.Error(w, "Error getting documents", http.StatusInternalServerError)
		return err
	}

	encoder := json.NewEncoder(w)
	err = encoder.Encode(contactDocs)
	if err != nil {
		h.l.Printf("Error serializing documents: %v\n", err)
		http.Error(w, "Error serializing documents", http.StatusInternalServerError)
		return err
	}

	return err
}

func (h contactHandler) handlePost(w http.ResponseWriter, r *http.Request) error {
	/*
		El método handlePost crea un objeto de tipo Comment
		con la data recibida del request y posteriormente crea
		un documento en la base de datos que sigue la misma estructura
		del objeto previamente creado, garantizando la consistencia en las
		propiedades de cada documento de la colección.
	*/

	contact := &contactdata.Comment{}
	err := contact.FromJSON(r.Body)
	if err != nil {
		h.l.Printf("Error decoding JSON: %v\n", err.Error())
		http.Error(w, "Error decoding JSON", http.StatusInternalServerError)
		return err
	}

	dbClient, err := firebaseutils.GetFirestore()
	if err != nil {
		return err
	}

	doc, _, err := dbClient.Collection("comments").Add(r.Context(), contact)
	if err != nil {
		h.l.Printf("Error creating document: %v\n", err)
		http.Error(w, "Error creating document", http.StatusInternalServerError)
		return err
	}

	h.l.Println("Contact document created successfully: ", doc.ID)

	w.Write([]byte("Contact document created successfully: " + doc.ID))
	return nil
}

func (h contactHandler) handleDelete(w http.ResponseWriter, r *http.Request) error {
	isAdmin, err := firebaseutils.VerifyAdminToken(r.Header.Get("Authorization"), r.Context())
	if err != nil {
		h.l.Printf("Error verifying admin token: %v\n", err)
		http.Error(w, "Error: "+err.Error(), http.StatusInternalServerError)
		return err
	}
	if !isAdmin {
		h.l.Printf("Error: not an admin user\n")
		http.Error(w, "Error: Forbidden access", http.StatusForbidden)
		return err
	}

	docId := r.URL.Query().Get("id")
	h.l.Println("docId: ", docId)

	dbClient, err := firebaseutils.GetFirestore()
	if err != nil {
		return err
	}

	_, err = dbClient.Collection("test").Doc(docId).Delete(r.Context())
	if err != nil {
		h.l.Printf("Error deleting document: %v\n", err)
		http.Error(w, "Error deleting document", http.StatusInternalServerError)
		return err
	}

	w.Write([]byte("Document deleted successfully"))
	return nil

}
