import {simon} from './simon.js'
import { fn as sound} from '../models/soundService.js'
import { fn as notes } from '../models/notes.js';
import { events as e } from '../models/events.js';
import { fn as dataCenter} from '../models/dataCenter.js'
let lastClicked = 0;
let clickedAt = 0;

const observer = createObservable();
observer.subscribe(dataCenter);
observer.subscribe(notes);
observer.subscribe(sound);
observer.broadcast(e.LOADPAGE)

on.addEventListener('click',()=>{
    simon.dispatch('switch')
})

start.addEventListener('mouseup',()=>{
    lastClicked = new Date();
    simon.dispatch('startGame')
})

start.addEventListener('mousedown',()=>{
    clickedAt = new Date();
    setTimeout(()=>{
        if(clickedAt>lastClicked && simon.state != 'OFF'){
            simon.dispatch('reset');
        }
    },3000)
})

document.querySelector('#simon').addEventListener('mousedown',(e)=>{
    if(e.target.classList.contains('box') && simon.state != 'OFF'){
         e.target.classList.add('active','pressed')
     }
     if(e.target.classList.contains('box')){
        e.target.classList.add('pressed')
     }

})

document.querySelector('#simon').addEventListener('pointerdown',(e)=>{
    if(e.target.classList.contains('box') && simon.state != 'OFF'){
         e.target.classList.add('pressed','active')
     }
     if(e.target.classList.contains('box')){
        e.target.classList.add('pressed')
     }

})

document.querySelector('#simon').addEventListener('mouseup',(e)=>{
    if(e.target.classList.contains('box')){
         e.target.classList.remove('pressed','active')
     }
})

document.querySelector('#simon').addEventListener('pointerup',(e)=>{
    if(e.target.classList.contains('box')){
         e.target.classList.remove('pressed','active')
     }
})

document.querySelector('#simon').addEventListener('click',(e)=>{
    if(e.target.classList.contains('box')){
        simon.dispatch('readUserInput',[e])
     }
})

document.querySelector('#sound').addEventListener('click',()=>{
       if(simon.state != 'OFF') observer.broadcast(e.SOUNDPRESSED)
})

document.getElementById('note-container').addEventListener('click',()=>{
        observer.broadcast(e.NOTECLICKED)
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


