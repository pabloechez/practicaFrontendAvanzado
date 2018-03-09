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

document.addEventListener("DOMContentLoaded", ()=> {

    let appController = new AppController(".siema");
    let headerController = new HeaderController(".prev",".next", appController);
    appController.carrouselRecharge();

    let index= document.querySelector('.post-content__large');
    if(index){
        let postService = new PostsService('http://localhost:3001/posts/');
        let postController =new PostsListController(".post-content__large",".post-content__small",postService,'es');
        postController.loadPosts();
    }

    let comments= document.querySelector('.comments');
    if(comments){
        let commentService = new CommentsService('http://localhost:3001/comments/');
        let commentController =new CommentsListController(".comments",commentService,PubSub);
        let formController = new FormController('.comments-form', commentService, PubSub);
        commentController.loadCommentsOnScroll();
    }
});

