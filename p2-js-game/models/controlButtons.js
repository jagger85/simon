import {events as e} from './events.js';
import {on,start,sound} from './models.js';

export const fn = (data) =>{
    switch(data){
        case (data = e.ON):
            on.children[0].classList.add('red-glow');
            break;        
        case (data = e.OFF):
            on.children[0].classList.remove('red-glow');
            sound.children[0].classList.remove('green-glow');
            break;        
        case (data = e.SOUNDPRESSED):
            sound.children[0].classList.add('green-glow');
            break;        
    }
}

