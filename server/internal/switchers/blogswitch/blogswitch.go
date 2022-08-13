package blogswitch

import (
	"io"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/dan-almenar/go-react-ts-portfolio/server/internal/utils"
)

const (
	blogURL = "https://database-plp22s5ufa-uc.a.run.app/blog"
)

type blogHandler struct {
	l *log.Logger
}

func NewBlogHandler(l *log.Logger) *blogHandler {
	return &blogHandler{l}
}

func (h blogHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

func (h blogHandler) handleGet(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received blog GET request")
	data, err := http.Get(blogURL)
	if err != nil {
		w.Write([]byte("Error"))
	}
	defer data.Body.Close()
	io.Copy(w, data.Body)
}

func (h blogHandler) handlePut(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received blog PUT request...")
	res, err := utils.MakeRequest(r.Method, blogURL, r.Body)
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

func (h blogHandler) handleDelete(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received blog DELETE request...")
	res, err := utils.MakeRequest(r.Method, blogURL, r.Body)
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

func (h blogHandler) handlePost(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received blog POST request...")
	res, err := utils.MakeRequest(r.Method, blogURL, r.Body)
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
