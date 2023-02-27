/** 
 * The handler is responsible for detecting user inputs and warn its subscribers,
 * also triggers the LOADPAGE event for initializing if needed
 * @param {date} lastClicked & @param {date} clickedAt used to detect a long press @see {@link lastClicked}
*/ 

import { fn as notes } from '../models/notes.js';
import { events as e } from './events.js';
import { fn as dataCenter} from '../services/dataCenter.js';
import { fn as keys } from '../models/keys.js';
import { fn as simon } from './simon.js';
import { fn as menuButtons} from '../models/menuButtons.js'
import { fn as sound } from '../services/soundService.js'
import { fn as controlButtons } from '../models/ControlButtons.js'

let lastClicked = 0;
let clickedAt = 0;

const observer = createObservable();

observer.subscribe(dataCenter);
observer.subscribe(keys);
observer.subscribe(simon);
observer.subscribe(notes);
observer.subscribe(menuButtons);
observer.subscribe(sound);
observer.subscribe(controlButtons);

observer.broadcast(e.LOAD_PAGE);

/**
 * Menu handler
 */
document.querySelector('#go-to-game').addEventListener('click',()=>{
    observer.broadcast(e.MENU_START_PRESSED);
})
document.querySelector('#back-to-menu').addEventListener('click',()=>{
    observer.broadcast(e.BACK_TO_MENU);
})

/**
 * Simon handler
 */
document.querySelector('#control-on').addEventListener('click',()=>{
    observer.broadcast(e.POWER_PRESSED);
})

document.querySelector('#control-start').addEventListener('mouseup',()=>{
    lastClicked = new Date();
    observer.broadcast(e.PLAY_RELEASED)
})

document.querySelector('#control-start').addEventListener('mousedown',()=>{
    clickedAt = new Date();
    observer.broadcast(e.PLAY_PRESSED);

    setTimeout(()=>{
        if(clickedAt>lastClicked && localStorage.getItem('state') != 'OFF'){
            observer.broadcast(e.USER_RESET);
        }
    },3000)
})
 document.querySelector('#sound-button').addEventListener('click',()=>{
     observer.broadcast(e.SOUND_PRESSED);
})


document.querySelector('#box1').addEventListener('mousedown',()=>{
    observer.broadcast(e.YELLOW_PRESSED);
})

document.querySelector('#box2').addEventListener('mousedown',()=>{
    observer.broadcast(e.RED_PRESSED);
})
document.querySelector('#box3').addEventListener('mousedown',()=>{
    observer.broadcast(e.BLUE_PRESSED);
})
document.querySelector('#box4').addEventListener('mousedown',()=>{
    observer.broadcast(e.GREEN_PRESSED);
})

document.querySelector('#box1').addEventListener('mouseup',()=>{
    observer.broadcast(e.YELLOW_RELEASED);
})

document.querySelector('#box2').addEventListener('mouseup',()=>{
    observer.broadcast(e.RED_RELEASED);
})

document.querySelector('#box3').addEventListener('mouseup',()=>{
    observer.broadcast(e.BLUE_RELEASED);
})

document.querySelector('#box4').addEventListener('mouseup',()=>{
    observer.broadcast(e.GREEN_RELEASED);
})

document.getElementById('simon-note-container').addEventListener('click',()=>{
        observer.broadcast(e.NOTE_CLICKED);
})

function createObservable() {
    return{
       subscribers : [],

    subscribe(fn){
        this.subscribers.push(fn);
    },

    unsuscribe(fn){
        this.suscribers = this.suscribers.filter((item) => item !== fn);
    },

    broadcast(data) {
        for (let i = 0; i< this.subscribers.length; i++){
            this.subscribers[i](data);
        }
    }
    }
}