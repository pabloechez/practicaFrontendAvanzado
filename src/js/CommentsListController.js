
export class CommentsListController {


    constructor(selector,commentService,pubSub) {
        this.element = document.querySelector(selector);
        this.commentsService = commentService;

        pubSub.subscribe('comment:created', (event, song) => {
            this.loadComments();
        });
    }

    showLoadingMessage() {
        this.element.innerHTML = '<div class="loading">Cargando...</div>';
    }

    showErrorMessage() {
        this.element.innerHTML = '<div class="error">Se ha producido un error</div>';
    }

    showNoPostsMessage() {
        this.element.innerHTML = '<div class="info">No hay ningun post</div>';
    }


    renderComments(comments) {
        let html = '';
        for (let comment of comments) {
            html += `<div>
                    <p class="name">${comment.name} ${comment.lastname}</p>
                    <p>${comment.comment}</p>
                </div>`;
        }
        this.element.innerHTML = html;
    }

    loadComments() {
        this.showLoadingMessage();
        this.commentsService.list().then(comments => {
            if (comments.length == 0) {
                this.showNoPostsMessage();
            } else {
                this.renderComments(comments);
            }
        }).catch((error) => {
            console.error("ERROR RETRIEVING COMMENTS", error);
            this.showErrorMessage();
        });
    }

    loadCommentsOnScroll(){
        let size= window.innerHeight;
        let fired = false;

        window.addEventListener('scroll',()=>{
            let rect=this.element.getBoundingClientRect();
            let elemTop=rect.top;
            if((elemTop) <= size && fired===false){
                this.loadComments();
                fired=true;
            }
        },true)
    }
}
