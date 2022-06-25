# Dan Almenar Personal Portfolio
### **Dan Almenar** 

## **Español**
### Introducción:
Para el proyecto final del bootcamp de programación [Codo a Codo: Go + React](https://www.buenosaires.gob.ar/educacion/codo-codo) del Gobierno de la Ciudad de Buenos Aires, decidí actualizar mi portafolio personal, el cual estuvo previamente desarrollado en [VueJS](https://vuejs.org/) + [Typescript](https://www.typescriptlang.org/), y que en su momento me sirvió para profundizar mi conocimiento sobre Vue, especialmente en el uso del Composition API, así como de puerta de entrada de Typescript. El código fuente de esa versión del portafolio está disponible en [GitHub](https://github.com/dan-almenar/vue-ts-portfolio).


### Arquitectura del proyecto:
El proyecto consta de un servidor web, un microservicio de base de datos y un cliente. Tanto el servidor como el microservicio están desarrollados en [Golang](https://golang.org/), y el cliente está desarrollado en [React](https://reactjs.org/) y Typescript. El servidor, además de servir la app cliente desde la ruta '/' (véase el archivo README.md de la carpeta server), funciona además como [API Gateway](https://microservices.io/patterns/apigateway.html) entre el cliente y el microservicio de base de datos.

### Cliente:
Como plantilla para la app cliente, utilicé [este bosquejo](https://dan-almenar.netlify.app/), desarrollado igualmente para el bootcamp Codo a Codo. Dicho bosquejo -y por ende, la app cliente- están fuertemente basados en [Bulma](https://bulma.io/), y contiene también algunos iconos de [Google Material](https://fonts.google.com/icons).

## **English**
### Introduction:
For the final project of the [Codo a Codo: Go + React](https://www.buenosaires.gob.ar/educacion/codo-codo) bootcamp of the Government of the City of Buenos Aires, I decided to update my personal portfolio, which was previously developed in [VueJS](https://vuejs.org/) + [Typescript](https://www.typescriptlang.org/), and which at the moment served as a tool to deepen my knowledge about Vue, especially in the use of the Composition API, as well as of the entry point of Typescript. The source code of this version of the portfolio is available on [GitHub](https://github.com/dan-almenar/vue-ts-portfolio).

### Project Architecture:
The project consists of a web server, a microservice database and a client. Both the server and the microservice are developed in [Golang](https://golang.org/) and the client is developed in [React](https://reactjs.org/) and Typescript. The server, besides serving the client app from the route '/' (see the file README.md of the folder server), also functions as [API Gateway](https://microservices.io/patterns/apigateway.html) between the client and the microservice database.

### Client
The client side of the portfolio is developed using [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/).

As a template for the UI, I used [this mockup portfolio](https://dan-almenar.netlify.app/) which I developed as part of the [Codo a Codo](https://www.buenosaires.gob.ar/educacion/codo-codo) Go + React programming Bootcamp held by the Buenos Aires City Government. Said mockup -and thus, the React client- are heavily based in [Bulma](https://bulma.io/) and uses some [Google Material Icons](https://fonts.google.com/icons); yet, both Bulma and the material icons library are directly imported to the CSS and HTML source files rather than being included as a dependencies.

Some changes were made to the mockup to make it more suitable for the portfolio, such as:
- Including bilingual support for English and Spanish.
- Minor changes on the content, for the mockup's is not proffessional.
- The mockup held all the data on the Javascript file, whilst the React client fetches the data from the database via the server's API.

The App itself was created with [Vite](https://vitejs.dev/).

# Server
The server side of the portfolio is developed using [Go](https://go.dev/) and consists on an HTTP server that serves the static files -resulting from the React client build- and the API endpoints.

The data served by each endpoint is fetched from the database microservice, thus the server follows the [API gateway pattern](https://microservices.io/patterns/apigateway.html).

# microservices
The microservices used in the portfolio are:
- database: This microservice is responsible for the data storage and retrieval by the server. It is a [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) microservice, which means that it is able to receive and send data in the form of [JSON](https://www.json.org/).
- auth: This microservice is responsible for the authentication and authorization of the admin user.

Most requests doesn't require authentication, yet Whenever a request does, the auth microservice is called to check if the user is authenticated. If the user is authenticated, the request is forwarded to the database microservice. If the user is not authenticated, the request is rejected. This is only the case for the admin user to access specific data like metrics, messages, etc.

Both the *database* and the *auth* microservices work with [Firebase](https://firebase.google.com/) under the hood, thus all data and authentication is handled by the Firebase service.
