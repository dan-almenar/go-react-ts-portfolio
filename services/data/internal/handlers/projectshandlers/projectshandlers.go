package projectshandlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/dan-almenar/go-react-ts-portfolio/services/data/internal/data/projectsdata"
	"github.com/dan-almenar/go-react-ts-portfolio/services/data/internal/utils/firebaseutils"
)

type projectsHandler struct {
	l *log.Logger
}

func NewProjectsHandler(l *log.Logger) *projectsHandler {
	return &projectsHandler{l}
}

func (h projectsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.l.Printf("Received /projects request: %v\n", r.Method)
	switch r.Method {
	case "POST":
		h.handlePost(w, r)
	case "DELETE":
		h.handleDelete(w, r)
	case "PUT":
		h.handlePut(w, r)
	default:
		h.handleGet(w, r)
	}
}

func (h projectsHandler) handleGet(w http.ResponseWriter, r *http.Request) error {
	projectsDocs, err := firebaseutils.GetAllDocuments("projects")
	if err != nil {
		h.l.Printf("Error getting documents: %v\n", err)
		http.Error(w, "Error getting documents", http.StatusInternalServerError)
		return err
	}

	encoder := json.NewEncoder(w)
	err = encoder.Encode(projectsDocs)
	if err != nil {
		h.l.Printf("Error serializing documents: %v\n", err)
		http.Error(w, "Error serializing documents", http.StatusInternalServerError)
		return err
	}

	return err
}

func (h projectsHandler) handlePut(w http.ResponseWriter, r *http.Request) error {
	/*
		El método handlePut sobrescribe por completo el documento en la base de datos,
		por lo que es necesario que el cliente envíe el documento completo,
		con los datos actualizados y los datos que se mantendrán tal cual.
	*/

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

	project := &projectsdata.ProjectSchema{}
	err = project.FromJSON(r.Body)
	if err != nil {
		h.l.Printf("Error decoding JSON: %v\n", err)
		http.Error(w, "Error decoding JSON", http.StatusInternalServerError)
		return err
	}

	dbClient, err := firebaseutils.GetFirestore()
	if err != nil {
		return err
	}

	_, err = dbClient.Collection("test").Doc(docId).Set(r.Context(), project)
	if err != nil {
		h.l.Printf("Error updating document: %v\n", err)
		http.Error(w, "Error updating document", http.StatusInternalServerError)
		return err
	}

	w.Write([]byte("Document updated successfully"))
	return nil

}

func (h projectsHandler) handlePost(w http.ResponseWriter, r *http.Request) error {
	/*
		El método handlePost crea un objeto de tipo Project
		con la data recibida del request y posteriormente crea
		un documento en la base de datos que sigue la misma estructura
		del objeto previamente creado, garantizando la consistencia en las
		propiedades de cada documento de la colección.
	*/

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

	project := &projectsdata.ProjectSchema{}
	err = project.FromJSON(r.Body)
	if err != nil {
		h.l.Printf("Error decoding JSON: %v\n", err)
		http.Error(w, "Error decoding JSON", http.StatusInternalServerError)
		return err
	}

	dbClient, err := firebaseutils.GetFirestore()
	if err != nil {
		return err
	}

	doc, _, err := dbClient.Collection("test").Add(r.Context(), project)
	if err != nil {
		h.l.Printf("Error creating document: %v\n", err)
		http.Error(w, "Error creating document", http.StatusInternalServerError)
		return err
	}

	h.l.Println("Document created successfully: ", doc.ID)

	w.Write([]byte("Document updated successfully: " + doc.ID))
	return nil
}

func (h projectsHandler) handleDelete(w http.ResponseWriter, r *http.Request) error {
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
