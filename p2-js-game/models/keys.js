/**
 * This script is responsible of recieving the events and changing the style of simon keys
 * so it simulates a pressed key
 */

import {box1 as yellow, box2 as red, box3 as blue, box4 as green} from '../models/models.js';
import {events as e} from '../scripts/events.js';
export const fn = (data) =>{

    switch (data){

        case (data = e.GREEN_PRESSED): 
            pressKey(green);
            break;

        case (data = e.BLUE_PRESSED): 
            pressKey(blue);
            break;

        case (data = e.YELLOW_PRESSED): 
            pressKey(yellow);
            break;

        case (data = e.RED_PRESSED): 
            pressKey(red);
            break;

        case (data = e.GREEN_RELEASED): 
            releaseKey(green);
            break;

        case (data = e.BLUE_RELEASED): 
            releaseKey(blue);
            break;

        case (data = e.YELLOW_RELEASED): 
            releaseKey(yellow);
            break;

        case (data = e.RED_RELEASED): 
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