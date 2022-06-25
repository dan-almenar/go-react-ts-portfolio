package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/dan-almenar/go-react-ts-portfolio/services/data/internal/handlers/biohandlers"
	"github.com/dan-almenar/go-react-ts-portfolio/services/data/internal/handlers/contacthandlers"
	"github.com/dan-almenar/go-react-ts-portfolio/services/data/internal/handlers/projectshandlers"
)

const (
	port = ":5000"
)

type notFoundHandler struct {
	l *log.Logger
}

func (h notFoundHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.l.Println("Received request for '/', returning 404")
	http.Error(w, "404 page not found", http.StatusNotFound)
}

func NewNotFoundHandler(l *log.Logger) *notFoundHandler {
	return &notFoundHandler{l}
}

func main() {
	logger := log.New(os.Stdout, "Data microservice: ", log.LstdFlags)
	fmt.Printf("Database microservice listening on port %v \n", port)

	handler := NewNotFoundHandler(logger)
	bioHandler := biohandlers.NewBioHandler(logger)
	projectsHandler := projectshandlers.NewProjectsHandler(logger)
	contactHandler := contacthandlers.NewContactHandler(logger)

	serveMux := http.NewServeMux()
	serveMux.HandleFunc("/", handler.ServeHTTP)
	serveMux.HandleFunc("/bio", bioHandler.ServeHTTP)
	serveMux.HandleFunc("/projects", projectsHandler.ServeHTTP)
	serveMux.HandleFunc("/contact", contactHandler.ServeHTTP)

	server := &http.Server{
		Addr:         port,
		Handler:      serveMux,
		IdleTimeout:  time.Second * 15,
		ReadTimeout:  time.Second * 10,
		WriteTimeout: time.Second * 10,
	}

	go func() {
		err := server.ListenAndServe()
		if err != nil {
			log.Fatal(err)
		}
	}()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt)
	signal.Notify(sigChan, syscall.SIGTERM)

	sig := <-sigChan
	log.Printf("Received signal %v. Exiting", sig)

	timeoutContext, cancel := context.WithTimeout(context.Background(), time.Second*15)
	cancel()
	server.Shutdown(timeoutContext)
}
