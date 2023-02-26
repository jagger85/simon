import { events as e } from '../scripts/events.js';
import { on,sound } from './models.js';

export const fn = (data) =>{
    switch(data){
        case (data = e.ON):
            on.children[0].classList.add('red-glow');
            break;        
        case (data = e.OFF):
            on.children[0].classList.remove('red-glow');
            sound.children[0].classList.remove('sound-active');
            break;        

        default:
            break;
    }
}

