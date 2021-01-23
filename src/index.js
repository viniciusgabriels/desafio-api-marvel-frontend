import App from "./app";

const app = new App();
app.getCharacters();
app.setFilter();

/* import axios from 'axios';

//const url = 'https://app-marvel-viniciusgabriels.herokuapp.com/';
const url = 'http://localhost:3030/characters';

axios.get(url)
    .then(response => console.log(response.data))
    .catch(error => console.log(error)); */