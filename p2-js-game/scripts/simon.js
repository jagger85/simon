import {box1,box2,box3,box4} from '../models/models.js'
import { fn as notes } from '../models/notes.js';
import {dataCenter as data, fn as datacenter} from '../models/dataCenter.js'
import {events as e} from '../models/events.js'
import {fn as display} from '../models/newDisplay.js'
import {fn as controlButtons} from '../models/controlButtons.js'
const boxes = [box1,box2,box3,box4]


const observer = createObservable();
observer.subscribe(display);
observer.subscribe(notes);
observer.subscribe(controlButtons);
observer.subscribe(datacenter);


export let simon ={
    state: 'OFF',
    transitions:{
        OFF:{
            switch: function(){
                simon.changeState('STANDBY');
                observer.broadcast(e.ON)
            }
        },
        STANDBY:{
            switch: function(){
                simon.changeState('OFF');
                observer.broadcast(e.OFF)
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
                simon.changeState('OFF')
                observer.broadcast(e.OFF)
            },
            displayPattern: function(){
                observer.broadcast(e.SEQUENCESTARTING)
                let n=0;
                setTimeout(()=>{
                    step()
                    function step(){
                            boxes[data.getSequence[n]].classList.add('active');
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
                simon.changeState('OFF');
                observer.broadcast(e.OFF);
            },
            readUserInput: function(input){
               
                if(input.target.classList.contains(data.getSequence[data.getUserSteps])){
                    data.addUserStep()
                    if (data.getSequence[data.getUserSteps] == undefined){
                        observer.broadcast(e.LEVELUP);
                        simon.changeState('DISPLAYING');
                        simon.dispatch('displayPattern');
                    }
                }
                    else{
                        observer.broadcast(e.WRONGINPUT);
                        setTimeout(()=>{
                            observer.broadcast(e.GAMEOVER)
                        },2000)
                        setTimeout(()=>{
                            simon.changeState('STANDBY');
                        },4000)
                    }
            }

        },
        RESETING:{
            resetValues: function(){
                observer.broadcast(e.RESET)
                let pattern= [0,2,3,1,0,2,3,1,0];
                let n = 0;
                step();
                function step(){
                        boxes[pattern[n]].classList.add('active');
                    setTimeout(()=>{
                        boxes[pattern[n]].classList.remove('active')
                        n++
                       if(pattern[n]!=undefined)step() 
                    },velocity*50)
                }
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

function createObservable() {
    return{
       subscribers : [],

    subscribe(fn){
        this.subscribers.push(fn);
    },

    unsuscribe(fn){
        this.suscribers = this.suscribers.filter((item) => item !== fn);
    },

    broadcast(data) {
        for (let i = 0; i< this.subscribers.length; i++){
            this.subscribers[i](data);
        }
    }
    }
}


