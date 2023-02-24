import {box1 as yellow, box2 as red, box3 as blue, box4 as green} from '../models/models.js';
import {events as e} from '../scripts/events.js';
export const fn = (data) =>{

    switch (data){

        case (data = e.GREENPRESSED): 
            pressKey(green);
            break;

        case (data = e.BLUEPRESSED): 
            pressKey(blue);
            break;

        case (data = e.YELLOWPRESSED): 
            pressKey(yellow);
            break;

        case (data = e.REDPRESSED): 
            pressKey(red);
            break;

        case (data = e.GREENRELEASED): 
            releaseKey(green);
            break;

        case (data = e.BLUERELEASED): 
            releaseKey(blue);
            break;

        case (data = e.YELLOWRELEASED): 
            releaseKey(yellow);
            break;

        case (data = e.REDRELEASED): 
            releaseKey(red);
            break;
    }
}

function pressKey(key){
    (localStorage.getItem('state') == 'OFF') ? key.classList.add('pressed')
    :key.classList.add('pressed','active')
}

function releaseKey(key){
   key.classList.remove('active','pressed');
}