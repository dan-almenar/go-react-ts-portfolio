# Dan Almenar Personal Portfolio
### **Dan Almenar** 

## **Español**
### Introducción:
Para el proyecto final del bootcamp de programación [Codo a Codo: Go + React](https://www.buenosaires.gob.ar/educacion/codo-codo) del Gobierno de la Ciudad de Buenos Aires, decidí actualizar mi portafolio personal, el cual estuvo previamente desarrollado en [VueJS](https://vuejs.org/) + [Typescript](https://www.typescriptlang.org/), y que en su momento me sirvió para profundizar mi conocimiento sobre Vue, especialmente en el uso del Composition API, así como de puerta de entrada de Typescript. El código fuente de esa versión del portafolio está disponible en [GitHub](https://github.com/dan-almenar/vue-ts-portfolio).


### Arquitectura del proyecto:
![alt text](./Proyect%20Architecture.png "Arquitectura del proyecto")

El proyecto consta de un servidor web, un microservicio de base de datos y un cliente. Tanto el servidor como el microservicio están desarrollados en [Golang](https://golang.org/), y el cliente está desarrollado en [React](https://reactjs.org/) y Typescript. El servidor, además de servir la app cliente desde la ruta '/' (véase el archivo README.md de la carpeta server), funciona además como [API Gateway](https://microservices.io/patterns/apigateway.html) entre el cliente y el microservicio de base de datos.

### Cliente
El FrontEnd del portafolio está desarrollado en [React](https://reactjs.org/) y [Typescript](https://www.typescriptlang.org/).

Como plantilla para la app cliente, utilicé [este bosquejo](https://dan-almenar.netlify.app/), desarrollado igualmente para el bootcamp Codo a Codo. Dicho bosquejo -y por ende, la app cliente- están fuertemente basados en [Bulma](https://bulma.io/), y contiene también algunos iconos de [Google Material](https://fonts.google.com/icons).

### Servidor
El Backend del portafolio está desarrollado en [Golang](https://golang.org/) y consiste en un servidor HTTP que sirve la aplicación cliente desde la ruta '/' y maneja las rutas de la API.

La data servida por cada una de las rutas, es obtenida de un microservicio de base de datos, por lo cual el servidor sigue un patrón de [API Gateway](https://microservices.io/patterns/apigateway.html).

### microservicios
Los microservicioss usados en el portafolio son:
- database: Este microservicio es responsable de almacenar y recuperar la data por el servidor. Es un microservicio [RESTful](https://es.wikipedia.org/wiki/Transferencia_de_Estado_Representacional), que recibe y envía datos en formato [JSON](https://www.json.org/).
- auth: Este microservicio es responsable de la autenticación y autorización del administrador.

La mayoría de las solicitudes no requieren autenticación, pero en aquellos casos en los que es requerida, se hace un llamado previo al microservicio para validar la autenticación. Si el usuario está autenticado, la solicitud es redirigida al microservicio de base de datos. Si el usuario no está autenticado, la solicitud es rechazada. Este aplica únicamente cuando el usuario administrador pueda acceder a datos específicos como métricas, mensajes, etc.

Ambos microservicios trabajan con [Firebase](https://firebase.google.com/), por lo que toda la data y autenticación son manejados por este.

### Docker
Tanto el servidor como los microservicios han sido contenedorizados con [Docker](https://www.docker.com/).

### Despliegue
Toda la aplicación ha sido desplegada como un proyecto de [Google Cloud](https://cloud.google.com/), y el portafolio está disponible en [esta página](https://danielalmenar.com).

### Otros
El embebido de la aplicación React en el servidor se hizo a través de la librería [embed de Golang](https://golang.org/pkg/embed/).

Para automatizar este proceso, desarrollé un script de [NodeJS](https://nodejs.org/en/) que se encarga de mover la subcarpeta 'dist' desde la carpeta del cliente hasta la carpeta del servidor. Este proceso es previo a la contenedorización del servidor, y se invoca cada vez que se realizan cambios en el FrontEnd.

Dicho script (*distfolder.js*) se encuentra en la carpeta 'server'.

## **English**
### Introduction:
For the final project of the [Codo a Codo: Go + React](https://www.buenosaires.gob.ar/educacion/codo-codo) bootcamp of the Government of the City of Buenos Aires, I decided to update my personal portfolio, which was previously developed in [VueJS](https://vuejs.org/) + [Typescript](https://www.typescriptlang.org/), and which at the moment served as a tool to deepen my knowledge about Vue, especially in the use of the Composition API, as well as of the entry point of Typescript. The source code of this version of the portfolio is available on [GitHub](https://github.com/dan-almenar/vue-ts-portfolio).

### Project Architecture:
The project consists of a web server, a microservice database and a client. Both the server and the microservice are developed in [Golang](https://golang.org/) and the client is developed in [React](https://reactjs.org/) and Typescript. The server, besides serving the client app from the route '/' (see the file README.md of the folder server), also functions as [API Gateway](https://microservices.io/patterns/apigateway.html) between the client and the microservice database.

### Client
The FrontEnd side of the portfolio is developed using [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/).

As a template for the UI, I used [this mockup portfolio](https://dan-almenar.netlify.app/) which I developed as part of the [Codo a Codo](https://www.buenosaires.gob.ar/educacion/codo-codo) Go + React programming Bootcamp held by the Buenos Aires City Government. Said mockup -and thus, the React client- are heavily based in [Bulma](https://bulma.io/) and uses some [Google Material Icons](https://fonts.google.com/icons); yet, both Bulma and the material icons library are directly imported to the CSS and HTML source files rather than being included as a dependencies.

Some changes were made to the mockup to make it more suitable for the portfolio, such as:
- Including bilingual support for English and Spanish.
- Minor changes on the content, for the mockup's is not proffessional.
- The mockup held all the data on the Javascript file, whilst the React client fetches the data from the database via the server's API.

The App itself was created with [Vite](https://vitejs.dev/).

### Server
The Backend side of the portfolio is developed using [Go](https://go.dev/) and consists on an HTTP server that serves the client app from the route '/' and manages the API endpoints.

The data served by each endpoint is fetched from the database microservice, thus the server follows the [API gateway pattern](https://microservices.io/patterns/apigateway.html).

### microservices
The microservices used in the portfolio are:
- database: This microservice is responsible for the data storage and retrieval by the server. It is a [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) microservice, which means that it is able to receive and send data in the form of [JSON](https://www.json.org/).
- auth: This microservice is responsible for the authentication and authorization of the admin user.

Most requests doesn't require authentication, yet Whenever a request does, the auth microservice is called to check if the user is authenticated. If the user is authenticated, the request is redirected to the database microservice. If the user is not authenticated, the request is rejected. This is only the case for the admin user to access specific data like metrics, messages, etc.

Both the *database* and the *auth* microservices work with [Firebase](https://firebase.google.com/) under the hood, thus all data and authentication is handled by the Firebase service.

### Docker
Both the server and the microservices have been containerized with [Docker](https://www.docker.com/).

### Deployment
The application was deployed as a project of [Google Cloud](https://cloud.google.com/) and the portfolio is available in [this page](https://danielalmenar.com).

### Other
The embed of the application React in the server was made through the [Golang's embed library](https://golang.org/pkg/embed/).

To automate this process, I developed a [NodeJS](https://nodejs.org/en/) script that moves the subfolder 'dist' from the client folder to the server folder. The script (*distfolder.js*) is in the folder 'server'. This script is called every time a change is made in the FrontEnd, previous to the containerization of the server.

The script (*distfolder.js*) is located in the 'server' folder.
