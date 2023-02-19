import {sound} from './sound.js'
import {init} from './view.js'
import {box1,box2,box3,box4} from './models.js'

const sequence = [];
const velocity = 0.5;
const boxes = [box1,box2,box3,box4]

init()
startSequence(createSequence(),2)


function startGame(){
    box2.activate(2)
}

function createSequence(steps){
    return [1,3,3,2]
}

function startSequence(sequence,velocity){

    // sequence.forEach((e,i)=>{
    //     setTimeout(()=>{
    //         boxes[i].activate(velocity)
    //     },velocity*1000)
    // })


}

function readUserInput(sequence){

}

function finishGame(){

}

