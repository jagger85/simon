import {box1,box2,box3,box4,start,reset} from './models.js'
import {sound} from './sound.js'
document.getElementById('main').appendChild(box1)
document.getElementById('main').appendChild(box2)
document.getElementById('main').appendChild(box3)
document.getElementById('main').appendChild(box4)
document.getElementById('main').appendChild(start)
document.getElementById('main').appendChild(reset)

const sequence = [];
const velocity = 0.5;
start.onclick = console.log('1')


function startGame(){

}

function createSequence(steps){
    return sequence = [1,3,4,3,2]
}

function startSequence(sequence,velocity){

}

function readUserInput(sequence){

}

function finishGame(){

}

