package biohandlers

import (
	"log"
	"net/http"

	"github.com/dan-almenar/go-react-ts-portfolio/services/data/internal/data/biodata"
	"github.com/dan-almenar/go-react-ts-portfolio/services/data/internal/utils/firebaseutils"
)

type bioHandler struct {
	l *log.Logger
}

func NewBioHandler(l *log.Logger) *bioHandler {
	return &bioHandler{l}
}

func (h bioHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.l.Printf("Received /bio request: %v\n", r.Method)
	switch r.Method {
	case "POST":
		http.Error(w, "POST requests are not allowed", http.StatusMethodNotAllowed)
	case "DELETE":
		http.Error(w, "DELETE requests are not allowed", http.StatusMethodNotAllowed)
	case "PUT":
		h.handlePut(w, r)
	default:
		h.handleGet(w, r)
	}
}

func (h bioHandler) handleGet(w http.ResponseWriter, r *http.Request) error {
	dbClient, err := firebaseutils.GetFirestore()
	if err != nil {
		return err
	}

	docSnap, err := dbClient.Collection("personalInfo").Doc("bio").Get(r.Context())
	if err != nil {
		h.l.Printf("Error getting document: %v\n", err)
		http.Error(w, "Error getting document", http.StatusInternalServerError)
		return err
	}

	bio := &biodata.Bio{}
	docSnap.DataTo(bio)

	err = bio.ToJSON(w)
	if err != nil {
		h.l.Printf("Error serializing document: %v\n", err)
		http.Error(w, "Error serializing document", http.StatusInternalServerError)
		return err
	}

	return nil
}

func (h bioHandler) handlePut(w http.ResponseWriter, r *http.Request) error {
	/*
		El método handlePut sobrescribe por completo el documento en la base de datos,
		por lo que es necesario que el cliente envíe el documento completo,
		con los datos actualizados y los datos que se mantendrán tal cual.
	*/

	// (Auth verify admin claims)
	isAdmin, err := firebaseutils.VerifyAdminToken(r.Header.Get("Authorization"), r.Context())
	if err != nil {
		h.l.Printf("Error verifying admin token: %v\n", err)
		http.Error(w, "Error: "+err.Error(), http.StatusInternalServerError)
		return err
	}
	if !isAdmin {
		h.l.Printf("User is not an admin\n")
		http.Error(w, "Forbidden access", http.StatusForbidden)
		return nil
	}

	bio := &biodata.Bio{}
	err = bio.FromJSON(r.Body)
	if err != nil {
		h.l.Printf("Error decoding JSON: %v\n", err)
		http.Error(w, "Error decoding JSON", http.StatusInternalServerError)
		return err
	}

	dbClient, err := firebaseutils.GetFirestore()
	if err != nil {
		return err
	}

	_, err = dbClient.Collection("test").Doc("test").Set(r.Context(), bio)
	if err != nil {
		h.l.Printf("Error updating document: %v\n", err)
		http.Error(w, "Error updating document", http.StatusInternalServerError)
		return err
	}

	w.Write([]byte("Document updated successfully"))
	return nil
}
