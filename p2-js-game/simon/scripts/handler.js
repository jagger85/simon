/** 
 * The handler is responsible for detecting user inputs and warn its subscribers,
 * also triggers the LOADPAGE event for initializing if needed
 * @param {date} lastClicked & @param {date} clickedAt used to detect a long press @see {@link lastClicked}
*/ 

import { fn as sound} from '../services/soundService.js'
import { fn as notes } from '../models/notes.js';
import { events as e } from './events.js';
import { fn as dataCenter} from '../services/dataCenter.js';
import { fn as keys } from '../models/keys.js';
import { fn as simon } from './simon.js';
import { fn as menuButtons} from '../models/menuButtons.js'

let lastClicked = 0;
let clickedAt = 0;

const observer = createObservable();

observer.subscribe(keys);
observer.subscribe(simon);
observer.subscribe(dataCenter);
observer.subscribe(notes);
observer.subscribe(sound);
observer.subscribe(menuButtons)

observer.broadcast(e.LOADPAGE);

/**
 * Menu handler
 */
document.querySelector('#menu-start').addEventListener('click',()=>{
    observer.broadcast(e.MENUSTARTPRESSED);
})
document.querySelector('#menu-options').addEventListener('click',()=>{
    observer.broadcast(e.MENUOPTIONSPRESSED);
})
document.querySelector('#back-to-menu').addEventListener('click',()=>{
    observer.broadcast(e.BACKTOMENU);
})

/**
 * Simon handler
 */
document.querySelector('#control-on').addEventListener('click',()=>{
    observer.broadcast(e.POWERPRESSED);
})

document.querySelector('#control-start').addEventListener('mouseup',()=>{
    lastClicked = new Date();
    observer.broadcast(e.PLAYPRESSED);
})

document.querySelector('#control-start').addEventListener('mousedown',()=>{
    clickedAt = new Date();
    setTimeout(()=>{
        if(clickedAt>lastClicked && localStorage.getItem('state') != 'OFF'){
            observer.broadcast(e.USERRESET);
        }
    },3000)
})
 document.querySelector('#control-sound').addEventListener('click',()=>{
     observer.broadcast(e.SOUNDPRESSED);
})

document.querySelector('#box1').addEventListener('mousedown',()=>{
    observer.broadcast(e.YELLOWPRESSED);
})
document.querySelector('#box2').addEventListener('mousedown',()=>{
    observer.broadcast(e.REDPRESSED);
})
document.querySelector('#box3').addEventListener('mousedown',()=>{
    observer.broadcast(e.BLUEPRESSED);
})
document.querySelector('#box4').addEventListener('mousedown',()=>{
    observer.broadcast(e.GREENPRESSED);
})

document.querySelector('#box1').addEventListener('mouseup',()=>{
    observer.broadcast(e.YELLOWRELEASED);
})

document.querySelector('#box2').addEventListener('mouseup',()=>{
    observer.broadcast(e.REDRELEASED);
})

document.querySelector('#box3').addEventListener('mouseup',()=>{
    observer.broadcast(e.BLUERELEASED);
})

document.querySelector('#box4').addEventListener('mouseup',()=>{
    observer.broadcast(e.GREENRELEASED);
})

document.getElementById('note-container').addEventListener('click',()=>{
        observer.broadcast(e.NOTECLICKED);
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