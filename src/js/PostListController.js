var moment = require('moment');

export class PostsListController {


    constructor(mainSelector,selector,postService,language) {
        this.mainElement = document.querySelector(mainSelector);
        this.element = document.querySelector(selector);
        this.postsService = postService;
        this.postImg='';
        this.postTitle= '';
        this.postSmallText='';
        this.postName='';
        this.postLastName='';
        this.postAuthorImg='';
        this.date='';
        this.language=language;

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

    getDate(date){
        moment.locale(this.language);
        var diff = moment.duration(moment().diff(moment(date)));
        var days = parseInt(diff.asDays());
        var hours = parseInt(diff.asHours());
        var minutes = parseInt(diff.asMinutes());
        var seconds =  parseInt(diff.asSeconds());

        if(minutes<=1){
            return 'hace: '+seconds+' seg';
        }
        if(hours<1){
            return 'hace: '+minutes+' min';


        }

        if(days<1){
            return 'hace: '+hours+' h';
        }

        if(days<=7){
            return moment(date).format('dddd');
        }


        return moment(date).format('MM-DD-YYYY HH:mm:ss');
    }

    html(clase){

        let html= ` <article class="post ${clase}">
                <div class="post__img">
                    <img src="./src/assets/img/${this.postImg}" alt="Post img">
                </div>
                <div class="post__icons">
                    <span class="icon-calendar">${this.date}</span>
                    <a  href="" class="icon-comments">23</a>
                    <a  href="" class="icon-heart"></a>
                </div>
                <div class="post__text">
                    <h3>${this.postTitle}</h3>
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

    renderPosts(posts) {
        let html = '';
        let mainPost='';
        for (let post of posts) {
            this.postImg=post.img;
            this.postTitle=post.title;
            this.postSmallText=post.small_text;
            this.postName=post.name;
            this.postLastName=post.lastname;
            this.postAuthorImg=post.author_img;
            this.date=this.getDate(post.date);

            if (post.id==1){
                mainPost+= this.html('post--large');
            }else{
                html += this.html('post--small');
            }
        }
        this.mainElement.innerHTML = mainPost;
        this.element.innerHTML = html;
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

}
