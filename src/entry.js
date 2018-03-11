import css from './less/main.less';
import moment from 'moment';
import { TimeController} from "./js/TimeController";
import { AppController} from "./js/AppController";
import { HeaderController } from "./js/HeaderController";
import { PostsService} from "./js/PostsService";
import { PostsListController} from "./js/PostListController";
import { FormController } from './js/FormController';
import { CommentsService} from "./js/CommentsService";
import { CommentsListController} from "./js/CommentsListController";
import { PubSub } from 'pubsub-js';
import { FooterController} from "./js/FooterController";
import { PostController} from "./js/PostController";


document.addEventListener("DOMContentLoaded", ()=> {
    setTimeout(() => {document.querySelector('body').style.opacity="1";},250);
    let timeController = new TimeController('es');

    let appController = new AppController(".main-header",".siema");
    let headerController = new HeaderController(".prev",".next", appController);
    appController.carrouselRecharge();
    let footerController = new FooterController('.main-footer',appController);

    //Página index
    let index= document.querySelector('.post-content__large');
    if(index){
        let postService = new PostsService('http://localhost:3001/posts/');
        let postController =new PostsListController(".post-content__large",".post-interent__content",".post-content__small",postService,timeController);
        postController.loadPosts();
    }

    //Página detalle
    let comments= document.querySelector('.comments');
    if(comments){
        let postService = new PostsService('http://localhost:3001/posts/5/');
        let postController =new PostController(".post-detail",postService,timeController);
        postController.loadPost();

        let commentService = new CommentsService('http://localhost:3001/comments/');
        let commentController =new CommentsListController(".comments",commentService,PubSub);
        let formController = new FormController('.comments-form', commentService, PubSub);
        commentController.loadCommentsOnScroll();
    }
});

