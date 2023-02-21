import {simon} from './simon.js'
import {start,on,reset} from './models/models.js'

on.addEventListener('click',()=>{
    simon.dispatch('switch')
})

start.addEventListener('click',()=>{
    simon.dispatch('startGame')
})
document.querySelector('#simon').addEventListener('mousedown',(e)=>{
    if(e.target.classList.contains('box') && simon.state != 'OFF'){
         e.target.classList.add('pressed')
         e.target.classList.add('active')
     }
     if(e.target.classList.contains('box')){
        e.target.classList.add('pressed')
     }

 })
 document.querySelector('#simon').addEventListener('pointerdown',(e)=>{
    if(e.target.classList.contains('box') && simon.state != 'OFF'){
         e.target.classList.add('pressed')
         e.target.classList.add('active')
     }
     if(e.target.classList.contains('box')){
        e.target.classList.add('pressed')
     }

 })
 document.querySelector('#simon').addEventListener('mouseup',(e)=>{
    if(e.target.classList.contains('box')){
         e.target.classList.remove('pressed')
         e.target.classList.remove('active')
     }
 })
 document.querySelector('#simon').addEventListener('pointerup',(e)=>{
    if(e.target.classList.contains('box')){
         e.target.classList.remove('pressed')
         e.target.classList.remove('active')
     }
 })

 document.querySelector('#simon').addEventListener('click',(e)=>{
    if(e.target.classList.contains('box')){
         simon.dispatch('readUserInput',[e])
     }
 })