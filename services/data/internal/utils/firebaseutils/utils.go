package firebaseutils

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
)

const (
	bucketURL = "gs://dan-almenar.appspot.com"
)

type FBDoc struct {
	ID   string                 `json:"id"`
	Data map[string]interface{} `json:"data"`
}

func newApp() (*firebase.App, error) {
	ctx := context.Background()
	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
		return nil, err
	}
	return app, nil
}

// firestore related functions
func GetFirestore() (*firestore.Client, error) {
	ctx := context.Background()
	app, err := newApp()
	if err != nil {
		return nil, err
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalf("error initializing firestore: %v\n", err)
		return nil, err
	}

	return client, nil
}

func GetAllDocuments(collection string) ([]*FBDoc, error) {
	ctx := context.Background()
	client, err := GetFirestore()
	if err != nil {
		return nil, err
	}
	defer client.Close()

	query := client.Collection(collection).Documents(ctx)
	docs, err := query.GetAll()
	if err != nil {
		return nil, err
	}

	var fbdocs []*FBDoc
	for _, doc := range docs {
		fbdoc := FBDoc{}
		fbdoc.ID = doc.Ref.ID
		fbdoc.Data = doc.Data()
		fbdocs = append(fbdocs, &fbdoc)
	}

	return fbdocs, nil
}

// auth related functions
func GetAuth() (*auth.Client, error) {
	ctx := context.Background()
	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		return nil, err
	}

	client, err := app.Auth(ctx)
	if err != nil {
		log.Fatalf("error initializing auth: %v\n", err)
		return nil, err
	}

	return client, nil
}

func VerifyAdminToken(t string, ctx context.Context) (bool, error) {
	// ctx := context.Background()

	client, err := GetAuth()
	if err != nil {
		return false, err
	}

	token, err := client.VerifyIDToken(ctx, t)
	if err != nil {
		return false, err
	}

	return token.Claims["admin"].(bool), nil
}

// GCP Storage related functions
