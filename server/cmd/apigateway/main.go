package main

import (
	"context"
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/dan-almenar/go-react-ts-portfolio/server/internal/switchers/adminswitch"
	"github.com/dan-almenar/go-react-ts-portfolio/server/internal/switchers/bioswitch"
	"github.com/dan-almenar/go-react-ts-portfolio/server/internal/switchers/blogswitch"
	"github.com/dan-almenar/go-react-ts-portfolio/server/internal/switchers/contactswitch"
	"github.com/dan-almenar/go-react-ts-portfolio/server/internal/switchers/projectsswitch"
)

const (
	port        = ":8080"
	bioURL      = "/bio"
	blogURL     = "/blog"
	projectsURL = "/projects"
	contactURL  = "/contact"
	adminURL    = "/admin"
)

type gatewayHandler struct {
	l *log.Logger
}

func newGatewayHandler(l *log.Logger) *gatewayHandler {
	return &gatewayHandler{l}
}

//go:embed dist
var reactApp embed.FS

func (h gatewayHandler) serveHTTP(w http.ResponseWriter, r *http.Request) {
	fsys := fs.FS(reactApp)
	reactApp, _ := fs.Sub(fsys, "dist")
	// if err != nil {
	// 	h.l.Println("error getting static content:", err)
	// 	http.Error(w, "error getting static content", http.StatusInternalServerError)
	// 	return
	// }

	http.FileServer(http.FS(reactApp)).ServeHTTP(w, r)
}

func main() {
	fmt.Printf("Gateway server listening on port %v\n", port)
	l := log.New(os.Stdout, "gateway server", log.LstdFlags)

	homeHandler := newGatewayHandler(l)
	adminHandler := adminswitch.NewAdminHandler(l)
	bioHandler := bioswitch.NewBioHandler(l)
	blogHandler := blogswitch.NewBlogHandler(l)
	contactHandler := contactswitch.NewContactHandler(l)
	projectsHandler := projectsswitch.NewProjectsHandler(l)

	serveMux := http.NewServeMux()
	serveMux.HandleFunc("/", homeHandler.serveHTTP)
	serveMux.HandleFunc(adminURL, adminHandler.ServeHTTP)
	serveMux.HandleFunc(bioURL, bioHandler.ServeHTTP)
	serveMux.HandleFunc(blogURL, blogHandler.ServeHTTP)
	serveMux.HandleFunc(contactURL, contactHandler.ServeHTTP)
	serveMux.HandleFunc(projectsURL, projectsHandler.ServeHTTP)

	server := &http.Server{
		Addr:         port,
		Handler:      serveMux,
		IdleTimeout:  time.Second * 15,
		ReadTimeout:  time.Second * 5,
		WriteTimeout: time.Second * 5,
	}

	go func() {
		err := server.ListenAndServe()
		if err != nil {
			l.Fatal(err)
		}
	}()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt)
	signal.Notify(sigChan, syscall.SIGTERM)

	sig := <-sigChan
	l.Println("Received terminate signal, graceful shutdown", sig)

	timeoutContext, cancel := context.WithTimeout(context.Background(), time.Second*15)
	cancel()
	server.Shutdown(timeoutContext)
}
