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
	homeURL     = "/"
	bioURL      = "/api/bio"
	blogURL     = "/api/blog"
	projectsURL = "/api/projects"
	contactURL  = "/api/contact"
	adminURL    = "/api/admin"
)

type homeHandler struct {
	l *log.Logger
}

func newHomeHandler(l *log.Logger) *homeHandler {
	return &homeHandler{l}
}

/*
el método serveHTTP del homeHandler se encarga de
embeber la aplicación react en el servidor y lanzarla
cuando se recibe una petición al homeURL ("/").

La directiva //go:embed le indica a go la ruta de la
aplicación react.
*/

//go:embed dist
var reactApp embed.FS

func (h homeHandler) serveHTTP(w http.ResponseWriter, r *http.Request) {
	fsys := fs.FS(reactApp)
	reactApp, _ := fs.Sub(fsys, "dist")

	http.FileServer(http.FS(reactApp)).ServeHTTP(w, r)
}

func main() {
	fmt.Printf("Gateway server listening on port %v\n", port)
	l := log.New(os.Stdout, "gateway server", log.LstdFlags)

	homeHandler := newHomeHandler(l)
	adminHandler := adminswitch.NewAdminHandler(l)
	bioHandler := bioswitch.NewBioHandler(l)
	blogHandler := blogswitch.NewBlogHandler(l)
	contactHandler := contactswitch.NewContactHandler(l)
	projectsHandler := projectsswitch.NewProjectsHandler(l)

	serveMux := http.NewServeMux()
	serveMux.HandleFunc(homeURL, homeHandler.serveHTTP)
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
