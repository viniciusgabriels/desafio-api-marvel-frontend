import axios from 'axios';
import InfoWindow from "./infoWindow";

const infoWindow = new InfoWindow();

export default class App { 
    constructor() {
        //this.baseUrl = "http://localhost:3030";
        this.baseUrl = "https://api-marvel-viniciusgabriels.herokuapp.com";
        this.paginationReset = false;
    }

    getCharacters(page = 1, title = null) {  
        let url = `${this.baseUrl}/characters?page=${page}`; 
        this.paginationReset = false; 
        
        if (title !== null) {
            url += `&title=${title}`;
            this.paginationReset = true;
        }
        
         axios.get(url)
            .then(response => {
                const { data, current_page, total_pages } = response.data;
                
                this.populate(data);
                this.setLinkInfoChar(data);
                this.setPagination(current_page, total_pages, this.paginationReset);
            })
            .catch(error => console.log(error));
    }    
    
    populate(data) {    
        document.querySelector('.chars').innerHTML = ''; 
    
        data.forEach(item => {
            const char = `<div d-flex><img width="100" height="100" alt="${item.name}" title="${item.name}" 
                        src="${this.noImage(item)}.${item.thumbnail.extension}" id="${item.id}" data-id="${item.id}" 
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

                infoWindow.openInfo(item, `${this.noImage(item)}.${item.thumbnail.extension}`);
            });            
        });         
    }
    
    setPagination(current_page, total_pages, reset) {
        if (reset) {
            document.getElementsByClassName('pagination')[0].innerHTML = '';
        }

        if (!document.querySelectorAll('.pagination li').length) {
        
            for (let i = 1; i <= total_pages; i++) {
                const link = `<li class="page-item border border-danger"><a class="page-link rounded-0" href="#" data-page="${i}">${i}</a></li>`;
                document.getElementsByClassName('pagination')[0].innerHTML += link;
            
            }

            for (let btn of document.getElementsByClassName('page-link')) {
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
    
                    const page = parseInt(event.target.dataset.page);
                    this.getCharacters(page);
                });
            }
        }
        
        for (let pageItem of document.querySelectorAll('.page-item')) {
            pageItem.classList.remove('active');
        }
        document.querySelector(`.page-link[data-page="${current_page}"]`).parentNode.classList.add('active');
    }    

    setFilter() {
        document.getElementsByName('search')[0].addEventListener('keyup', (event) =>{
            
            const title = event.target.value.trim();
            
            if (title.length >= 3) {
                this.getCharacters(1, title);
            }
        });
    }
}