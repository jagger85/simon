import {events as e} from '../scripts/events.js';
const context = new AudioContext();
let enable = false;

export function play(box,duration){
    const o = context.createOscillator();
    o.type = 'triangle';
    var  g = context.createGain();
    o.connect(g);
    g.connect(context.destination);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + (duration ?? 1))

    switch (box){
        case 'box1':
            o.frequency.value =261.6;
            break;

        case 'box2':
            o.frequency.value = 311.1;
            break;

        case 'box3':
            o.frequency.value = 370;
            break;

        case 'box4':
            o.frequency.value = 440;
            break;
    }
    if(enable)o.start();
}

function switchSound(){
    if(localStorage.getItem('state')!= 'OFF'){
    enable = !enable
    enable ? document.getElementById('sound-icon').classList.add('sound-active')
    : document.getElementById('sound-icon').classList.remove('sound-active')
    }
}

export function setSound(boolean){
    enable = boolean;
    enable ? document.getElementById('sound-icon').classList.add('sound-active')
    : document.getElementById('sound-icon').classList.remove('sound-active')
}

export const fn = (data) =>{

    switch (data){
        case (data = e.SOUND_PRESSED):
        switchSound();
        break;

        case (data = e.OFF):
        enable = false;
        break;

        case (data = e.RED_PRESSED):
            play('box1',1);
        break;

        case (data = e.YELLOW_PRESSED):
            play('box2',1);
        break;

        case (data = e.GREEN_PRESSED):
            play('box3',1);
        break;

        case (data = e.BLUE_PRESSED):
            play('box4',1);
        break;
    }
}