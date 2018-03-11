import css from './less/main.less';
import moment from 'moment';
import { AppController} from "./js/AppController";
import { HeaderController } from "./js/HeaderController";
import { PostsService} from "./js/PostsService";
import  { PostsListController} from "./js/PostListController";
import { FormController } from './js/FormController';
import { CommentsService} from "./js/CommentsService";
import { CommentsListController} from "./js/CommentsListController";
import { PubSub } from 'pubsub-js';
import { FooterController} from "./js/FooterController";

document.addEventListener("DOMContentLoaded", ()=> {
    setTimeout(() => {document.querySelector('body').style.opacity="1";},250);

    //Arrancamos en carousel
    let appController = new AppController(".siema");
    let headerController = new HeaderController(".prev",".next", appController);
    appController.carrouselRecharge();
    let footerController = new FooterController('.main-footer',appController);

    //Página index
    let index= document.querySelector('.post-content__large');
    if(index){
        let postService = new PostsService('http://localhost:3001/posts/');
        let postController =new PostsListController(".post-content__large",".post-interent__content",".post-content__small",postService,'es');
        postController.loadPosts();
    }

    //Página detalle
    let comments= document.querySelector('.comments');
    if(comments){
        let postService = new PostsService('http://localhost:3001/posts/1');


        let commentService = new CommentsService('http://localhost:3001/comments/');
        let commentController =new CommentsListController(".comments",commentService,PubSub);
        let formController = new FormController('.comments-form', commentService, PubSub);
        commentController.loadCommentsOnScroll();
    }
});

