package projectsswitch

import (
	"io"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/dan-almenar/go-react-ts-portfolio/server/internal/utils"
)

const (
	projectsURL = "http://localhost:5000/projects"
)

type projectsHandler struct {
	l *log.Logger
}

func NewProjectsHandler(l *log.Logger) *projectsHandler {
	return &projectsHandler{l}
}

func (h projectsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

func (h projectsHandler) handleGet(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received projects GET request")
	data, err := http.Get(projectsURL)
	if err != nil {
		w.Write([]byte("Error"))
	}
	defer data.Body.Close()
	io.Copy(w, data.Body)
}

func (h projectsHandler) handlePut(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received projects PUT request...")
	res, err := utils.MakeRequest(r.Method, projectsURL, r.Body)
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

func (h projectsHandler) handleDelete(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received projects DELETE request...")
	res, err := utils.MakeRequest(r.Method, projectsURL, r.Body)
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

func (h projectsHandler) handlePost(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received projects POST request...")
	res, err := utils.MakeRequest(r.Method, projectsURL, r.Body)
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
