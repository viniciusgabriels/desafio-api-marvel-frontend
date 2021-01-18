export default class InfoWindow {
    constructor() {
        this.data = '';
        this.id = '';
    }

    openInfo(data, id) {        
        document.getElementsByClassName('info-char')[0].classList.remove('d-none');
        
        let closeWindow = document.getElementsByClassName('x-button')[0];
            closeWindow.addEventListener('click', (event) => {
                event.preventDefault();

                document.getElementsByClassName('info-char')[0].classList.add('d-none');
            });
    }
}