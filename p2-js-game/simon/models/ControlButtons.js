import { events as e } from '../scripts/events.js';
import { onButton,soundButton,startButton } from './models.js';

export const fn = (data) =>{
    switch(data){
        case (data = e.ON):
            onButton.children[0].classList.add('red-glow');
            break;

        case (data = e.OFF):
            onButton.children[0].classList.remove('red-glow');
            soundButton.children[0].classList.remove('sound-active');
            break;

        case (data = e.PLAY_PRESSED):
            startButton.children[0].classList.remove('orange-glow');
            break;

        case (data = e.PLAY_RELEASED):
            if(localStorage.getItem('state')!='OFF')
            startButton.children[0].classList.add('orange-glow');
            break;

        case (data = e.SOUND_PRESSED):
            localStorage.getItem('sound') == 'on' ?
            soundButton.children[0].classList.add('sound-active'):
            soundButton.children[0].classList.remove('sound-active');
            break;

        default:
            break;
    }
}

