import {simon} from './simon.js'
import {start,on,reset} from '../models/models.js'
import {play,switchSound} from './sound.js'
import { nextNote,printNote } from '../models/notes.js';
let lastClicked = 0;
let clickedAt = 0;

printNote()


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
         play(e.target.id)
     }
     if(e.target.classList.contains('box')){
        e.target.classList.add('pressed')
     }

})

document.querySelector('#simon').addEventListener('pointerdown',(e)=>{
    if(e.target.classList.contains('box') && simon.state != 'OFF'){
         e.target.classList.add('pressed','active')
         play(e.target.id)
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
        if(simon.state != 'OFF')switchSound();
})

document.getElementById('note-container').addEventListener('click',()=>{
        nextNote();
})
