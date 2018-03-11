
export class PostsListController {


    constructor(mainSelector,interestSelector,selector,postService,timeController) {
        this.mainElement = document.querySelector(mainSelector);
        this.element = document.querySelector(selector);
        this.interestSelector = document.querySelector(interestSelector);
        this.postsService = postService;
        this.postThumb;
        this.postImg;
        this.postTitle;
        this.postSmallText;
        this.postName;
        this.postLastName;
        this.postAuthorImg;
        this.postTag;
        this.date;
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


    html(clase){
        let html= ` <article class="post ${clase}">
                <div class="post__img">
                    <a href="/post-detail.html">  
                        ${this.postThumb}
                    </a>
                </div>
                <div class="post__icons">
                    <span class="icon-calendar">${this.date}</span>
                    <a  href="post-detail.html#comments" class="icon-comments">23</a>
                    <a  href="" class="icon-heart"></a>
                </div>
                <div class="post__text">
                    <a href="post-detail.html"> <h3>${this.postTitle}</h3></a>
                    <p>${this.postSmallText}</p>
                </div>
                <div class="post__author">
                    <div class="img">
                        <img src="./src/assets/img/${this.postAuthorImg}" alt="Name">
                    </div>
                    <div class="name">
                        <p>${this.postName}</p>
                        <p>${this.postLastName}</p>
                    </div>
                </div>
            </article>`;
        return html;
    }

    htmlLandscape(clase){
        let html= ` <article class="post ${clase}">
                <div class="post__img">
                    <a href="/post-detail.html">    
                        ${this.postThumb}
                    </a>
                </div>
                <div>
                    <div class="post__icons">
                        <span class="icon-calendar">${this.date}</span>
                        <a  href="post-detail.html#comments" class="icon-comments">23</a>
                        <a  href="" class="icon-heart"></a>
                    </div>
                    <div class="post__text">
                        <a href="post-detail.html"> <h3>${this.postTitle}</h3></a>
                        <p>${this.postSmallText}</p>
                    </div>
                    <div class="post__author">
                        <div class="img">
                            <img src="./src/assets/img/${this.postAuthorImg}" alt="Name">
                        </div>
                        <div class="name">
                            <p>${this.postName}</p>
                            <p>${this.postLastName}</p>
                        </div>
                    </div>
                </div>
            </article>`;
        return html;
    }

    renderPosts(posts) {
        let html = '';
        let mainPost='';
        let interestPost='';
        for (let post of posts) {
            if(this.isUriImage(post.thumbnail)){
                this.postThumb=`<img src="./src/assets/img/${post.thumbnail}" srcset="./src/assets/img/${post.thumbnail} 400w,./src/assets/img/2-${post.thumbnail} 800w,./src/assets/img/3-${post.thumbnail} 19200w" alt="Post img">`;
            }else{
                this.postThumb=`<video width="100%" height="240" autoplay loop="loop"><source src="./src/assets/img/${post.thumbnail}" type="video/mp4">Video</video>`;
            }

            this.postImg=post.img;
            this.postTitle=post.title;
            this.postSmallText=post.small_text;
            this.postName=post.author_name;
            this.postLastName=post.author_lastname;
            this.postAuthorImg=post.author_img;
            if(post.author_img==""){
                this.postAuthorImg='author.jpg';
            }
            this.date=this.timeController.getDate(post.date);
            if (post.id==1){
                mainPost+= this.html('post--large');
            }if(post.id>=2 && post.id<=7){
                html += this.html('post--small');
            }if(post.tag=='car'){
                interestPost+= this.htmlLandscape('post--landscape');
            }
        }
        this.mainElement.innerHTML = mainPost;
        this.element.innerHTML = html;
        this.interestSelector.innerHTML  = interestPost;
    }

    loadPosts() {
        this.showLoadingMessage();
        this.postsService.list().then(posts => {
            if (posts.length == 0) {
                this.showNoPostsMessage();
            } else {
                this.renderPosts(posts);
            }
        }).catch((error) => {
            console.error("ERROR RETRIEVING POSTS", error);
            this.showErrorMessage();
        });
    }


    isUriImage(uri) {
        uri = uri.split('?')[0];
        let parts = uri.split('.');
        let extension = parts[parts.length-1];
        let imageTypes = ['mp4'];
        if(imageTypes.indexOf(extension) !== -1) {
            return false;
        }
        return true
    }
}
