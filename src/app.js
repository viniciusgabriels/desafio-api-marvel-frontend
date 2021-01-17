import axios from 'axios';

export default class App {
    constructor() {
        this.offset = 0;
        this.apiKey = 'c21148b20116248c0a757e825782d215';
        this.hash = '2765274c7dfa30a581d0d26414b987d5';
        this.ts = '1610817437';        
    }

    // const url = `https://gateway.marvel.com/v1/public/characters?&ts=${this.ts}&apikey=${this.apiKey}&hash=${this.hash}&limit=100&offset=${this.offset}`;
    
    
    getCharacters() {            
        axios.get("http://localhost:3030/characters")
        .then(response => {
            this.populate(response.data.data.results);
            this.setPagination(response.data.data.total);
        })
        .catch(error => console.log(error));
    }
    
    populate(data) {
    
        document.querySelector('.chars').innerHTML = ''; 
    
        data.forEach(item => {
            const char = `<div d-flex><img width="100" height="100" alt="${item.name}" title="${item.name}" 
                        src="${this.noImage(item)}.${item.thumbnail.extension}" 
                        class="char-image border border-danger border-radius"></div>`;
            document.querySelector('.chars').innerHTML += char;    
        });        
    }

    noImage(imageItem) {
        if(`${imageItem.thumbnail.path}` === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ) {
            return "img/Marvel-Logo-Red";
        } else {
            return `${imageItem.thumbnail.path}`;
        }
    }


    
    /* setPagination(totalItems) {
        const pages = Math.ceil(totalItems / 100);
    
        document.querySelector('.pagination').innerHTML = '';
    
        for (let i = 1; i <= pages; i++) {
            const li = `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            document.querySelector('.pagination').innerHTML += li;
        
            for (let link of document.getElementsByClassName('page-link')) {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
    
                    const page = event.target.dataset.page;
                    this.offset = (page -1) * 100;
                    this.getCharacters();
                });
            }
        }
    } */

    /* openInfo() {
        for (let i = 1; i <= pages; i++) {
            const li = `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            document.querySelector('.pagination').innerHTML += li;
        
            for (let link of document.getElementsByClassName('page-link')) {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
    
                    const page = event.target.dataset.page;
                    this.offset = (page -1) * 100;
                    this.getCharacters();
                });
            }
        }
    } */
}