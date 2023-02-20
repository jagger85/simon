import {sound} from './sound.js'
import {init} from './view.js'
import {box1,box2,box3,box4,start,reset} from './models/models.js'
let state =''
let sequence = [];
let userSequence = [];
let velocity = 1.2;
const boxes = [box1,box2,box3,box4]
let userSteps = 0;
let steps = 4;

/*
/   Initialize the interface
*/
init()

/*
/   Event listeners
*/
start.addEventListener('click',()=>{
    startGame()
})

reset.addEventListener('click',()=>{
    console.log(userSequence)
})

document.querySelector('#main').addEventListener('click',(e)=>{
    if(e.target.className == 'box'){
         readUserInput(sequence,+e.target.id)
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
        sequence.push(Math.floor(Math.random()*3))
    }
    console.log(sequence)
    return sequence;
}

function startSequence(sequence,velocity){
    let n = 0;
    step(sequence,velocity)

    function step(sequence,velocity){

    if(sequence[n]==undefined){
        state = 'reading'
    }
    else{
        boxes[sequence[n]].activate()
    setTimeout(()=>{
        boxes[sequence[n]].deactivate()
        n++
        setTimeout(()=>{
            step(sequence,velocity)
        },100)
        
    },velocity*1000)
    }}
   
}

function readUserInput(sequence,input){
    if(state == 'reading'){
    if(input == sequence[userSteps]){
        userSteps++
        console.log('good input')
        if(sequence[userSteps]==undefined){
            console.log('level finished')
            levelUp();
        }
    }else{
        console.log('wrong input')
        finishGame()
    }
    }
}

function levelUp(){
    userSteps = 0;
    steps +=1;
    velocity -= 0.1;
    console.log('leveling up')
    setTimeout(()=>{
        startSequence(createSequence(),velocity)
    },3000)

}

function finishGame(){

    console.log('Game Finished Level: ' + (steps-3))
    userSteps =0;
    steps = 4;
    velocity = 1.2;
    
}

