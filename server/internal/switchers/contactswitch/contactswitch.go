package contactswitch

import (
	"io"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/dan-almenar/go-react-ts-portfolio/server/internal/utils"
)

const (
	contactURL = "https://database-plp22s5ufa-uc.a.run.app/contact"
)

type contactHandler struct {
	l *log.Logger
}

func NewContactHandler(l *log.Logger) *contactHandler {
	return &contactHandler{l}
}

func (h contactHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

func (h contactHandler) handleGet(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received contact GET request")
	data, err := http.Get(contactURL)
	if err != nil {
		w.Write([]byte("Error"))
	}
	defer data.Body.Close()
	io.Copy(w, data.Body)
}

func (h contactHandler) handlePut(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received contact PUT request...")
	res, err := utils.MakeRequest(r.Method, contactURL, r.Body)
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

func (h contactHandler) handleDelete(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received contact DELETE request...")
	res, err := utils.MakeRequest(r.Method, contactURL, r.Body)
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

func (h contactHandler) handlePost(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received contact POST request...")
	res, err := utils.MakeRequest(r.Method, contactURL, r.Body)
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
