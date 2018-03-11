
export class PostController {


    constructor(selector,postService,timeController) {
        this.element = document.querySelector(selector);
        this.postsService = postService;
        this.timeController=timeController;
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

    renderPost(post) {
        let html = '';
        html += `<img src="/src/assets/img/${post.img}" srcset="./src/assets/img/${post.img} 400w,./src/assets/img/2-${post.img} 800w,./src/assets/img/3-${post.img} 1200w" alt="Img" class="post-detail__main-img">
                <div class="post__icons">
                    <span class="icon-calendar">${this.timeController.getDate(post.date)}</span>
                    <a  href="#comments" class="icon-comments">23</a>
                    <a  href="" class="icon-heart"></a>
                </div>

                <div class="post-detail__text">
                    <h1>${post.title}</h1>
                   ${post.text}
                </div>
                <div class="author">
                <div class="img">
                    <img src="./src/assets/img/${post.author_img}" alt="">
                </div>
                <div class="name">
                    <p>${post.author_name}</p>
                    <p>${post.author_lastname}</p>
                </div>
                
            </div>`;
        this.element.innerHTML = html;
    }

    loadPost() {
        this.showLoadingMessage();
        this.postsService.list().then(post => {
            if (post.length == 0) {
                this.showNoPostsMessage();
            } else {
                this.renderPost(post);
            }
        }).catch((error) => {
            console.error("ERROR RETRIEVING POSTS", error);
            this.showErrorMessage();
        });
    }
}
