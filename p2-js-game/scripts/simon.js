import {box1,box2,box3,box4,display} from '../models/models.js'
import { printNote } from '../models/notes.js';
import {play,setSound} from './sound.js'
const boxes = [box1,box2,box3,box4]
let velocity = 1.2;
let steps = 4;
let userSteps = 0;
let sequence = undefined;

export let simon ={
    state: 'OFF',
    transitions:{
        OFF:{
            switch: function(){
                document.getElementById('power-icon').classList.add('red-glow');
                display.value = 'WELCOME';
                setTimeout(()=>{
                    display.value = ''
                    simon.changeState('STANDBY');
                },2000)
            }
        },
        STANDBY:{
            switch: function(){
                switchOff()
            },
            startGame: function(){
                simon.changeState('DISPLAYING');
                simon.dispatch('displayPattern');
            },
            reset: function(){
                simon.changeState('RESETING')
                simon.dispatch('resetValues')
            }
        },
        DISPLAYING:{
            switch: function(){
                switchOff()
            },
            displayPattern: function(){
                sequence = createSequence();
                console.log(sequence)
                let n = 0;
                display.value = 'GET READY!'
                setTimeout(()=>{
                    step()
                    display.value = ''

                    function step(){
                            boxes[sequence[n]].classList.add('active');
                            play('box'+sequence[n],velocity)
                        setTimeout(()=>{
                            boxes[sequence[n]].classList.remove('active')
                            n++

                        setTimeout(()=>{
                            sequence[n]!=undefined ? step() : simon.changeState('READING')      
                            },100)
                        },velocity*1000)
                        }
                },3000)}
            },
        READING:{
            switch: function(){
                switchOff()
            },
            readUserInput: function(input){
                if(input.target.classList.contains(sequence[userSteps])){
                    userSteps++
                    sequence[userSteps] ?? levelUp();
                }
                    else{
                        display.value = 'WRONG INPUT'
                        setTimeout(()=>{
                            display.value = 'GAME OVER' 
                        },2000)
                        setTimeout(()=>{
                            initValues();
                            simon.changeState('STANDBY');
                        },4000)
                    }
            }

        },
        RESETING:{
            resetValues: function(){
                display.value = 'RESET'
                let pattern= [0,2,3,1,0,2,3,1,0];
                let n = 0;
                step();
                function step(){
                        boxes[pattern[n]].classList.add('active');
                    setTimeout(()=>{
                        boxes[pattern[n]].classList.remove('active')
                        n++
                        pattern[n]!=undefined ? step() : localStorage.removeItem('level')
                    },velocity*50)
                }
                resetValues();
                
            }
        }
    },
    dispatch(actionName,...args){
        const actions = this.transitions[this.state];
        const action = this.transitions[this.state][actionName]

        if(action){
            action.apply(simon,...args);
        } else {
            console.log(actionName + ' action not valid for current state ='+this.state)
        }
    },
    changeState(newState){
        localStorage.setItem('state',newState)
        this.state = newState;
    }
}

function createSequence(){
    return [...Array(steps)].map(()=>Math.floor(Math.random()*4));
}

function levelUp(){
    if(!localStorage.getItem('level') || localStorage.getItem('level')<(steps-3)){
        setRecord(steps-3)
    }
    userSteps = 0;
    steps +=1;
    velocity -= 0.1;

    display.value = 'LEVEL UP'
    setTimeout(()=>{
        display.value = ''
        simon.changeState('DISPLAYING')
        simon.dispatch('displayPattern')
    },3000)
}

function initValues(){
    printNote()
    velocity = 1.2;
    steps = 1;
    userSteps =0;
    display.value =''
}
function switchOff(){
    document.getElementById('power-icon').classList.remove('red-glow');
    setSound(false);
    simon.changeState('OFF');
    display.value = 'BYE';
    setTimeout(()=>{
        display.value = ''
        
    },2000)  
}

function setRecord(level){
    localStorage.setItem('level',level)

}