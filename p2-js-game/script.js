//Init
const box1 = document.createElement('div')
const box2 = document.createElement('div')
const box3 = document.createElement('div')
const box4 = document.createElement('div')
const shape = 'border:1px solid black; width:100px;height:100px;'

const start = document.createElement('button')
start.innerText = 'START'
const reset = document.createElement('button')
reset.innerText = 'RESET'

box1.style.cssText = shape
box2.style.cssText = shape
box3.style.cssText = shape
box4.style.cssText = shape

document.getElementById('main').appendChild(box1)
document.getElementById('main').appendChild(box2)
document.getElementById('main').appendChild(box3)
document.getElementById('main').appendChild(box4)
document.getElementById('main').appendChild(start)
document.getElementById('main').appendChild(reset)

const sequence = [];
const velocity = 0.5;

start.onclick(startGame)

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

