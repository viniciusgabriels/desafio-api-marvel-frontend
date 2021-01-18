import axios from 'axios';
import InfoWindow from "./infoWindow";

const infoWindow = new InfoWindow();

export default class App { 
    
    getCharacters() {            
        axios.get("http://localhost:3030/characters")
        .then(response => {
            this.populate(response.data.data.results);
            this.setLinkInfoChar(response.data.data.results);
            this.setPagination(response.data.data.total);
        })
        .catch(error => console.log(error));
    }
    
    populate(data) {    
        document.querySelector('.chars').innerHTML = ''; 
    
        data.forEach(item => {
            const char = `<div d-flex><img width="100" height="100" alt="${item.name}" title="${item.name}" 
                        src="${this.noImage(item)}.${item.thumbnail.extension}" id="${item.id}" 
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

    setLinkInfoChar(data) {
        data.forEach(item => {
            let link = document.getElementById(`${item.id}`);
            link.addEventListener('click', (event) => {
                event.preventDefault();

                infoWindow.openInfo(data, item.id);
            });            
        });         
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
}