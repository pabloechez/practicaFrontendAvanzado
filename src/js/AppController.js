import Siema from "siema";

export class AppController{

    constructor(selector){
        this.element=document.querySelector(selector);
    }


    showCarrousel(){
        this.element = new Siema({
            perPage: {300: 3,800: 5,1024:6,},
            selector: this.element,
            easing: 'ease-out',
            startIndex: 0,
            loop: false

        });
    }

    carrouselMoveRight(){
        this.element.next()
    }

    carrouselMoveLeft(){
        this.element.prev();
    }

    carrouselRecharge(){
        this.element.resizeHandler();
    }

    scrollTop(){
        scrollTo(document.documentElement,0,1250);

        scrollTo=(element, to, duration) =>{
            let start = element.scrollTop,
                change = to - start,
                currentTime = 0,
                increment = 20;


            let animateScroll = ()=>{
                currentTime += increment;
                let val = easeInOutQuad(currentTime, start, change, duration);
                element.scrollTop = val;
                if(currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            };
            animateScroll();
        };

        let easeInOutQuad =(t, b, c, d) =>{
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };
    }
}