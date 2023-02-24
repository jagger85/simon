/**
 * Simon is the brain of the game and where the logic happens, 
 * it implements a finite state machine approach 
 * {@link https://en.wikipedia.org/wiki/Finite-state_machine}
 * Basically it can change from one state to a finite number of states
 * defined by the functions avaible on each state.
 */

import { fn as notes } from '../models/notes.js';
import {dataCenter as data, fn as datacenter} from '../services/dataCenter.js'
import {events as e} from '../scripts/events.js'
import {fn as display} from '../models/display.js'
import {fn as keys} from '../models/keys.js'
import {fn as controlButtons} from '../models/simonControlButtons.js'
import {fn as sound} from '../services/soundService.js'

const observer = createObservable();
observer.subscribe(display);
observer.subscribe(notes);
observer.subscribe(controlButtons);
observer.subscribe(datacenter);
observer.subscribe(keys);
observer.subscribe(sound);

let simon ={
    state: 'OFF',
    transitions:{
        OFF:{
            switch: function(){
                simon.changeState('STANDBY');
                observer.broadcast(e.ON);
            }
        },
        STANDBY:{
            switch: function(){
                simon.changeState('OFF');
                observer.broadcast(e.OFF);
            },
            startGame: function(){
                simon.changeState('DISPLAYING');
                simon.dispatch('displayPattern');
            },
            reset: function(){
                simon.changeState('RESETING');
                simon.dispatch('resetValues');
            }
        },
        DISPLAYING:{
            switch: function(){
                simon.changeState('OFF');
                observer.broadcast(e.OFF);
            },
            displayPattern: function(){
                observer.broadcast(e.SEQUENCESTARTING);
                let n=0;
                setTimeout(()=>{
                    step();
                    function step(){
                            if(localStorage.getItem('state')=='OFF')return;
                            pressKey(data.getSequence[n]);
                        setTimeout(()=>{
                            releaseKey(data.getSequence[n]);
                            n++

                        setTimeout(()=>{
                            data.getSequence[n]!=undefined ? step() : simon.changeState('READING');     
                            },100);
                        },data.getSpeed*1000);
                        }
                },3000)}
            },
        READING:{
            switch: function(){
                simon.changeState('OFF');
                observer.broadcast(e.OFF);
            },
            readUserInput: function(input){
                if(input == data.getSequence[data.getUserSteps] ){
                    data.addUserStep();
                    if (data.getSequence[data.getUserSteps] == undefined){
                        observer.broadcast(e.LEVELUP);
                        simon.changeState('DISPLAYING');
                        simon.dispatch('displayPattern');
                    }
                }
                    else{
                        observer.broadcast(e.WRONGINPUT);
                        setTimeout(()=>{
                            observer.broadcast(e.GAMEOVER);
                        },2000);
                        setTimeout(()=>{
                            simon.changeState('STANDBY');
                        },4000);
                    }
            }

        },
        RESETING:{
            resetValues: function(){
                observer.broadcast(e.RESET);
                let pattern= [0,2,3,1,0,2,3,1,0];
                let n = 0;
                step();
                function step(){
                        pressKey(pattern[n]);
                    setTimeout(()=>{
                        releaseKey(pattern[n]);
                        n++
                       if(pattern[n]!=undefined)step();
                    },200);
                }
                setTimeout(()=>{
                    simon.changeState('OFF');
                    simon.dispatch('switch');
                },5000);
              
            }
        }
    },
    dispatch(actionName,...args){
        const actions = this.transitions[this.state];
        const action = this.transitions[this.state][actionName];

        if(action){
            action.apply(simon,...args);
        } else {
            console.log(actionName + ' action not valid for current state ='+this.state);
        }
    },
    changeState(newState){
        localStorage.setItem('state',newState);
        this.state = newState;
    }
}

function pressKey(key){
    switch (key){
        case (key=0):
            observer.broadcast(e.YELLOWPRESSED);
            break;

        case (key=1):
            observer.broadcast(e.REDPRESSED);
            break;

        case (key=2):
            observer.broadcast(e.BLUEPRESSED);
            break;

        case (key=3):
            observer.broadcast(e.GREENPRESSED);
            break;
    }
}

function releaseKey(key){
    switch (key){
        case (key=0):
            observer.broadcast(e.YELLOWRELEASED);
            break;

        case (key=1):
            observer.broadcast(e.REDRELEASED);
            break;

        case (key=2):
            observer.broadcast(e.BLUERELEASED);
            break;

        case (key=3):
            observer.broadcast(e.GREENRELEASED);
            break;
    }
}

export const fn = (data) =>{
    switch(data){
        case (e.YELLOWPRESSED):
            simon.dispatch('readUserInput',[0]);
            break;
        case (e.REDPRESSED):
            simon.dispatch('readUserInput',[1]);
            break;
        case (e.BLUEPRESSED):
            simon.dispatch('readUserInput',[2]);
            break;
        case (e.GREENPRESSED):
            simon.dispatch('readUserInput',[3]);
            break;
        case (e.POWERPRESSED):
            simon.dispatch('switch');
            break;
        case (e.PLAYPRESSED):
            simon.dispatch('startGame');
            break;
        case (e.USERRESET):
            simon.dispatch('reset');
        default:
            break;
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