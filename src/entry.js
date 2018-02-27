import css from './less/main.less';

import moment from 'moment';
import Siema from 'siema';

const mySiema = new Siema({
    perPage: {
        768: 2,
        1024: 6,
    },
    selector: '.siema',
    easing: 'ease-out',
    startIndex: 0,
    loop: false

});
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

prev.addEventListener('click', () => mySiema.prev());
next.addEventListener('click', () => mySiema.next());

document.addEventListener("DOMContentLoaded", function(event) {
    setTimeout(function(){ mySiema.resizeHandler(); }, 100);
});

