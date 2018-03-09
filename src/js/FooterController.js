export class FooterController {

    constructor(selector,appController){
        this.element=document.querySelector(selector);

        this.element.querySelector('.main-footer__action').addEventListener("click", event => {
            event.preventDefault();
            appController.scrollTop();
        });
    }
}