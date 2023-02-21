import {box1,box2,box3,box4,display} from './models/models.js'
const boxes = [box1,box2,box3,box4]
let velocity = 1.2;
let steps = 4;
let userSteps = 0;
let sequence = [];

export let simon ={
    state: 'OFF',
    transitions:{
        OFF:{
            switch: function(){
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
            }
        },
        DISPLAYING:{
            switch: function(){
                switchOff()
            },
            displayPattern: function(){
                sequence = createSequence()
                let n = 0;
                display.value = 'GET READY!'
                
                setTimeout(()=>{
                    step(sequence,velocity)
                    display.value = ''
                    function step(sequence,velocity){
                        if(simon.state != 'OFF'){
                        if(sequence[n]==undefined){
                            simon.changeState('READING');
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
            }},3000);
            }
        },
        READING:{
            switch: function(){
                switchOff()
            },
            readUserInput: function(input){
                if(input.target.classList.contains(sequence[userSteps])){
                    userSteps++
                    if(sequence[userSteps]==undefined){
                        levelUp();
                    }
                }else{
                    display.value = 'WRONG INPUT'
                    setTimeout(()=>{
                        display.value = 'GAME OVER' 
                    },2000)
                    setTimeout(()=>{
                        simon.changeState('RESETING')
                        simon.dispatch('resetValues')
                    },4000)
                }
            }

        },
        RESETING:{
            resetValues: function(){
                resetValues();
                simon.changeState('STANDBY')
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
        console.log(newState)
        this.state = newState;
    }
}


function createSequence(){
    let sequence = []
    for(let i=0; i<steps;i++){
        sequence.push(Math.floor(Math.random()*4))
    }
    console.log(sequence)
    return sequence;
}

function levelUp(){
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

function resetValues(){
    velocity = 1.2;
    steps = 4;
    userSteps =0;
    display.value =''
}
function switchOff(){
    resetValues();
    simon.changeState('OFF');
    display.value = 'BYE';
    setTimeout(()=>{
        display.value = ''
        
    },2000)  
}