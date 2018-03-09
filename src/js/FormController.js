export class FormController {

    constructor(selector, commentsService, pubSub) {
        this.element = document.querySelector(selector);
        this.commentsService = commentsService;
        this.pubSub = pubSub;
        this.loading = false;
        this.filling = true;
        this.addEventListeners();
    }

    setLoading(loading) {
        this.loading = loading;
        this.element.querySelectorAll('input, button').forEach(item => { item.disabled = loading });
    }

    setFilling(filling) {
        this.filling = filling;
        this.element.querySelector('button').disabled = filling;
    }

    addEventListeners() {
        this.setFilling(true);
        this.addInputListeners();
        this.addTextareaListeners();
        this.addFormSubmitListener();
    }

    addFormSubmitListener() {
        this.element.addEventListener('submit', event => {
            event.preventDefault();
            if (this.loading) {
                return;  // si se está cargando, no hacemos nada más
            }
            this.setLoading(true);
            let comment= this.buildCommentData();
            this.commentsService.save(comment).then(createdComment => {
                console.log("COMENTARIO CREADO", createdComment);
                this.element.reset();
                this.pubSub.publish('comment:created', createdComment);
            }).catch(error => {
                console.error("SE HA PRODUCIDO UN ERROR");
                alert(`Se ha producido un error ${error}`);
            }).finally(() => {
                this.setLoading(false);
                this.setFilling(true);
            })
        });
    }

    buildCommentData() {
        return {
            name: this.element.querySelector('#name').value,
            lastname: this.element.querySelector('#lastname').value,
            email: this.element.querySelector('#email').value,
            comment: this.element.querySelector('#comment').value
        }
    }

    addInputListeners() {
        this.element.querySelectorAll('input,textarea').forEach(input=> {

            input.addEventListener('keyup', event => {
                if (input.checkValidity() == false) {
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
                this.checkFormValidity();
            });
        });
    }

    addTextareaListeners() {
        let maxLength = 120;
        let textarea = this.element.querySelector('textarea');
        let button = this.element.querySelector('button');

        textarea.addEventListener('keyup',event=>{
            if(textarea.value<=0){
                button.disabled = true;
            }else if(textarea.value.match(/\S+/g).length>maxLength){
                textarea.classList.add('error');
                button.disabled = true;
            }else{
                textarea.classList.remove('error');
                this.checkFormValidity();
            }
        });
    }

    checkFormValidity() {
        let button = this.element.querySelector('button');
        if(this.element.checkValidity()) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }

}