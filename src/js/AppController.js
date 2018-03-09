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

    scrollTo(){
        var scrollItems = document.getElementsByClassName("scrollto");

        for (var i = 0; i < scrollItems.length; i++) {
            scrollItems[i].addEventListener("click", function(event) {
                var goTo = this.href.split("#");

                if (goTo.length === 2) {
                    event.preventDefault();
                    var sectionToGo = goTo[goTo.length - 1];
                    var elementToGo = document.getElementById(sectionToGo);
                    var elemntPosition = elementToGo.getBoundingClientRect().top;
                    var jump=document.documentElement.scrollTop+elemntPosition;
                    scrollTo(document.documentElement,jump,1250);
                }
            });
        }

        function scrollTo(element, to, duration) {
            var start = element.scrollTop,
                change = to - start,
                currentTime = 0,
                increment = 20;


            var animateScroll = function(){
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime, start, change, duration);
                element.scrollTop = val;
                if(currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            };
            animateScroll();
        }

        Math.easeInOutQuad = function (t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };
    }
}