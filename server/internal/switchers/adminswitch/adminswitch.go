package adminswitch

import (
	"io"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/dan-almenar/go-react-ts-portfolio/server/internal/utils"
)

const (
	adminURL = "http://localhost:5000/admin"
)

type adminHandler struct {
	l *log.Logger
}

func NewAdminHandler(l *log.Logger) *adminHandler {
	return &adminHandler{l}
}

func (h adminHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "PUT":
		h.handlePut(w, r)
	case "DELETE":
		h.handleDelete(w, r)
	case "POST":
		h.handlePost(w, r)
	default:
		h.handleGet(w, r)
	}
}

func (h adminHandler) handleGet(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received admin GET request")
	data, err := http.Get(adminURL)
	if err != nil {
		w.Write([]byte("Error"))
	}
	defer data.Body.Close()
	io.Copy(w, data.Body)
}

func (h adminHandler) handlePut(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received admin PUT request...")
	res, err := utils.MakeRequest(r.Method, adminURL, r.Body)
	if err != nil {
		http.Error(w, "Error", http.StatusInternalServerError)
	}
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		h.l.Printf("Error reading response body: %v\n", err)
		http.Error(w, "Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(res.StatusCode)
	w.Write(body)
}

func (h adminHandler) handleDelete(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received admin DELETE request...")
	res, err := utils.MakeRequest(r.Method, adminURL, r.Body)
	if err != nil {
		http.Error(w, "Error", http.StatusInternalServerError)
	}
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		h.l.Printf("Error reading response body: %v\n", err)
		http.Error(w, "Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(res.StatusCode)
	w.Write(body)
}

func (h adminHandler) handlePost(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received admin POST request...")
	res, err := utils.MakeRequest(r.Method, adminURL, r.Body)
	if err != nil {
		http.Error(w, "Error", http.StatusInternalServerError)
	}
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		h.l.Printf("Error reading response body: %v\n", err)
		http.Error(w, "Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(res.StatusCode)
	w.Write(body)
}
