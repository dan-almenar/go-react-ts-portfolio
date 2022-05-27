# Client
The client side of the portfolio is developed using [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/).

As a template for the UI, I used [this mockup portfolio](https://dan-almenar.netlify.app/) which I developed as part of the [Codo a Codo](https://www.buenosaires.gob.ar/educacion/codo-codo) Go + React programming Bootcamp held by the Buenos Aires City Government. Said mockup -and thus, the React client- are heavily based in [Bulma](https://bulma.io/) and uses some [Google Material Icons](https://fonts.google.com/icons); yet, both Bulma and the material icons library are directly imported to the CSS and HTML source files rather than being included as a dependencies.

Some changes were made to the mockup to make it more suitable for the portfolio, such as:
- Including bilingual support for English and Spanish.
- Minor changes on the content, for the mockup's is not proffessional.
- The mockup held all the data on the Javascript file, whilst the React client fetches the data from the database via the server's API.

The App itself was created with [Vite](https://vitejs.dev/).

### **Dan Almenar** 