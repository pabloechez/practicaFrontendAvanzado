import Siema from "siema";

export class AppController{

    constructor(selector,carousel){
        this.element=document.querySelector(selector);
        this.carousel=carousel;
    }


    showCarrousel(){
        this.carousel = new Siema({
            perPage: {300: 3,800: 5,1024:6,},
            selector: this.carousel,
            easing: 'ease-out',
            startIndex: 0,
            loop: false

        });
    }

    carrouselMoveRight(){
        this.carousel.next()
    }

    carrouselMoveLeft(){
        this.carousel.prev();
    }

    carrouselRecharge(){
        this.carousel.resizeHandler();
    }

    scrollTop(){
        let element=document.documentElement;
        let to= 0;
        let duration= 1250;

        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;


        let animateScroll = ()=>{
            currentTime += increment;
            let val = this.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    easeInOutQuad(t, b, c, d){
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    toggleSearch(){
        this.element.querySelector('.search').classList.toggle("search--open");
    }
}