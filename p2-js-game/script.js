import {sound} from './sound.js'
import {init} from './view.js'
import {box1,box2,box3,box4,start,reset} from './models.js'

const sequence = [];
const userSequence = [];
const velocity = 0.5;
const boxes = [box1,box2,box3,box4]


/*
/   Initialize the interface
*/
init()

/*
/   Event listeners
*/
start.addEventListener('click',()=>{
    startSequence(createSequence(),2)
})

reset.addEventListener('click',()=>{
    console.log(userSequence)
})

let input = document.querySelector('#main').addEventListener('click',(e)=>{
    if(e.target.className == 'box'){
        console.log('box clicked')
        userSequence.push(+e.target.id)
        return +e.target.id
    }
})

/*
/   Game logic
*/

function startGame(){
    box2.activate(2)
}

function createSequence(steps){
    return [1,3,3,2]
}

function startSequence(sequence,velocity){
    let n = 0;
    step(sequence,velocity)

    function step(sequence,velocity){

    if(sequence[n]==undefined)finishGame();
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

function readUserInput(sequence,i){

    let userInput = new Promise((resolve,reject)=>{
        if(input == 1){
            resolve('ok')
        }else{
            reject('bad')
        }
    })

    userInput.then((message) =>{
        console.log(message)
    }).catch((message)=>{
        console.log(message)
    })

}

function finishGame(){
    console.log('Game Finished')
}

