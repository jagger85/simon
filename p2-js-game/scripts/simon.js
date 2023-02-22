import {box1,box2,box3,box4,display} from '../models/models.js'
import { printNote } from '../models/notes.js';
import {play,setSound} from './sound.js'
import {dataHandler as data} from '../models/constants.js'
const boxes = [box1,box2,box3,box4]

export let simon ={
    state: 'OFF',
    transitions:{
        OFF:{
            switch: function(){
                document.getElementById('power-icon').classList.add('red-glow');
                display.value = 'WELCOME';
                data.init()
                printNote()
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
                data.createNewSequence()
                display.value = 'GET READY!'
                let n=0;
                setTimeout(()=>{
                    step()
                    display.value = ''
                    function step(){
                            boxes[data.getSequence[n]].classList.add('active');
                            play('box'+data.getSequence[n],data.getSpeed)
                        setTimeout(()=>{
                            boxes[data.getSequence[n]].classList.remove('active')
                            n++

                        setTimeout(()=>{
                            data.getSequence[n]!=undefined ? step() : simon.changeState('READING')      
                            },100)
                        },data.getSpeed*1000)
                        }
                },3000)}
            },
        READING:{
            switch: function(){
                switchOff()
            },
            readUserInput: function(input){
               
                if(input.target.classList.contains(data.getSequence[data.getUserSteps])){
                    data.addUserStep()
                    data.getSequence[data.getUserSteps] ?? levelUp();
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
                        pattern[n]!=undefined ? step() : data.setRecord(0)
                    },velocity*50)
                }
                data.reset();
                
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

function levelUp(){
    display.value = 'LEVEL UP'
    data.levelUp()
    setTimeout(()=>{
        display.value = ''
        simon.changeState('DISPLAYING')
        simon.dispatch('displayPattern')
    },3000)
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
