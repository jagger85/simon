import { fn as sound} from '../models/soundService.js'
import { fn as notes } from '../models/notes.js';
import { events as e } from '../models/events.js';
import { fn as dataCenter} from '../models/dataCenter.js';
import { fn as keys } from '../models/keys.js';
import { fn as simon } from './simon.js';
let lastClicked = 0;
let clickedAt = 0;

const observer = createObservable();
observer.subscribe(keys);
observer.subscribe(simon);
observer.subscribe(dataCenter);
observer.subscribe(notes);
observer.subscribe(sound);
observer.broadcast(e.LOADPAGE);

on.addEventListener('click',()=>{
    observer.broadcast(e.POWERPRESSED);
})

start.addEventListener('mouseup',()=>{
    lastClicked = new Date();
    observer.broadcast(e.PLAYPRESSED);
})

start.addEventListener('mousedown',()=>{
    clickedAt = new Date();
    setTimeout(()=>{
        if(clickedAt>lastClicked && localStorage.getItem('state') != 'OFF'){
            observer.broadcast(e.USERRESET);
        }
    },3000)
})
 document.querySelector('#sound').addEventListener('click',()=>{
     observer.broadcast(e.SOUNDPRESSED);
})

document.querySelector('#box1').addEventListener('mousedown',(event)=>{
    observer.broadcast(e.YELLOWPRESSED);
})
document.querySelector('#box2').addEventListener('mousedown',(event)=>{
    observer.broadcast(e.REDPRESSED);
})
document.querySelector('#box3').addEventListener('mousedown',(event)=>{
    observer.broadcast(e.BLUEPRESSED);
})
document.querySelector('#box4').addEventListener('mousedown',(event)=>{
    observer.broadcast(e.GREENPRESSED);
})

document.querySelector('#box1').addEventListener('mouseup',(event)=>{
    observer.broadcast(e.YELLOWRELEASED);
})

document.querySelector('#box2').addEventListener('mouseup',(event)=>{
    observer.broadcast(e.REDRELEASED);
})

document.querySelector('#box3').addEventListener('mouseup',(event)=>{
    observer.broadcast(e.BLUERELEASED);
})

document.querySelector('#box4').addEventListener('mouseup',(event)=>{
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