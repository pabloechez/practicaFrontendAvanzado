

export class HeaderController{

    constructor(selectorLeft,selectorRight,appController) {

        appController.showCarrousel();
        this.elementLeft = document.querySelector(selectorLeft);
        this.elementRight = document.querySelector(selectorRight);
        this.elementLeft.addEventListener('click', () => appController.carrouselMoveLeft());
        this.elementRight.addEventListener('click', () => appController.carrouselMoveRight());
        setTimeout(function(){ appController.carrouselRecharge();}, 100);

        document.addEventListener("scroll",()=>{
            let header= document.querySelector(".main-header");

            if (window.innerWidth< 1280){
                window.pageYOffset>55 ? header.classList.add('onscroll'):header.classList.remove('onscroll')
            }else{
                header.classList.remove('onscroll');
            }

        })

    }
}