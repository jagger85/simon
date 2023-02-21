import {sound} from './sound.js'
import {box1,box2,box3,box4,start,display} from './models/models.js'
let state =''
let sequence = [];
let velocity = 1.2;
const boxes = [box1,box2,box3,box4]
let userSteps = 0;
let steps = 4;

start.addEventListener('click',()=>{
    display.value = 'STARTING...'

    setTimeout(()=>{
        startGame()
        display.value = ''
    },2000)
})

document.querySelector('#simon').addEventListener('mousedown',(e)=>{
    if(e.target.classList.contains('box')){
         e.target.classList.add('pressed')
         e.target.classList.add('active')
     }
 })
 document.querySelector('#simon').addEventListener('mouseup',(e)=>{
    if(e.target.classList.contains('box')){
         e.target.classList.remove('pressed')
         e.target.classList.remove('active')
     }
 })
 
document.querySelector('#simon').addEventListener('click',(e)=>{
    if(e.target.classList.contains('box')){
         readUserInput(sequence,e)
     }
 })

/*
/   Game logic
*/

function startGame(){
    state = 'showing sequence'
    startSequence(createSequence(),velocity)
}

function createSequence(){
    sequence = []
    for(let i=0; i<steps;i++){
        sequence.push(Math.floor(Math.random()*4))
    }
    console.log(sequence)
    return sequence;
}

function startSequence(sequence,velocity){
    let n = 0;
    display.value = 'GET READY!'
    setTimeout(()=>{
        step(sequence,velocity)
        display.value = ''
        function step(sequence,velocity){
            if(sequence[n]==undefined){
                state = 'reading'
            }
            else{
                boxes[sequence[n]].classList.add('active');
            setTimeout(()=>{
                boxes[sequence[n]].classList.remove('active')
                n++
                setTimeout(()=>{
                    step(sequence,velocity)
                },100)
                
            },velocity*1000)
            }}
    },3000)
}

function readUserInput(sequence,input){
    if(state == 'reading'){
    if(input.target.classList.contains(sequence[userSteps])){
        userSteps++
        if(sequence[userSteps]==undefined){
            console.log('level finished')
            levelUp();
        }
    }else{
        display.value = 'WRONG INPUT'
        setTimeout(()=>{
            display.value = 'GAME OVER' 
        },2000)
        setTimeout(()=>{
            finishGame()
        },4000)
    }}
}

function levelUp(){
    userSteps = 0;
    steps +=1;
    velocity -= 0.1;
    display.value = 'LEVEL UP'
    setTimeout(()=>{
        display.value = ''
        startSequence(createSequence(),velocity)
    },3000)

}

function finishGame(){
    display.value = 'LEVEL: ' +(steps-3)
    setTimeout(()=>{
        userSteps =0;
        steps = 4;
        velocity = 1.2;
        display.value = ''
    },2000)
}

