package bioswitch

import (
	"io"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/dan-almenar/go-react-ts-portfolio/server/internal/utils"
)

const (
	bioURL = "https://database-plp22s5ufa-uc.a.run.app/bio"
)

type bioHandler struct {
	l *log.Logger
}

func NewBioHandler(l *log.Logger) *bioHandler {
	return &bioHandler{l}
}

func (h bioHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

func (h bioHandler) handleGet(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received Bio GET request")
	data, err := http.Get(bioURL)
	if err != nil {
		w.Write([]byte("Error"))
	}
	defer data.Body.Close()
	io.Copy(w, data.Body)
}

func (h bioHandler) handlePut(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received Bio PUT request...")
	res, err := utils.MakeRequest(r.Method, bioURL, r.Body)
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

func (h bioHandler) handleDelete(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received Bio DELETE request...")
	res, err := utils.MakeRequest(r.Method, bioURL, r.Body)
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

func (h bioHandler) handlePost(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received Bio POST request...")
	res, err := utils.MakeRequest(r.Method, bioURL, r.Body)
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
