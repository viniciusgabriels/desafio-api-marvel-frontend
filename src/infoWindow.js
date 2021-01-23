import axios from 'axios';

export default class InfoWindow {
    constructor() {
        //this.baseUrl = "http://localhost:1234";
        //this.baseUrl = "https://api-marvel-growdev.herokuapp.com";
        this.baseUrl = "https://api-marvel-viniciusgabriels.herokuapp.com";
        this.data = '';
        this.id = '';
    }

    getComic(id) {  
        let url = `${this.baseUrl}/comics/${id}`;
        
        axios.get(url)
            .then(response => {
                this.loadComics(response.data.data);
            })
            .catch(error => console.log(error));
    }

    openInfo(char, img) {
        document.querySelector('.hqs').innerHTML = '';

        document.getElementsByClassName('info-char')[0].classList.remove('d-none');

        document.querySelector('.photo').src = img;
        document.querySelector('.description h1').innerHTML = char.name;
        document.querySelector('.description p').innerHTML = char.description || 'No description available';

        char.comics.items.forEach((comic) => {
            const parts = comic.resourceURI.split('comics/');
            const comicId = parts[1];

            this.getComic(comicId);
        });  
        
        
        let closeWindow = document.getElementsByClassName('x-button')[0];
            closeWindow.addEventListener('click', (event) => {
                event.preventDefault();

                document.getElementsByClassName('info-char')[0].classList.add('d-none');
            });
    }

    loadComics(comic) {
        let title = comic.title.substr(0, 10);

        if (comic.title.length > 10) {
            title += '...';
        }

        const li = `<li class="list-inline-item">
                        <img class="hq" width="100" src="${comic.images[0].path}.${comic.images[0].extension}">
                        <span class="text-center">${title}</span>
                    </li>`;

        document.querySelector('.hqs').innerHTML += li;
    }
}