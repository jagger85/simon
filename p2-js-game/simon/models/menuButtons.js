import { gameContainer,menuContainer } from './models.js';
import { events as e } from '../scripts/events.js'


export const fn = (data) =>{
    switch(data){
        case (data = e.MENUSTARTPRESSED):
            document.getElementById('main').classList.remove('moveRight')
            document.getElementById('main').classList.add('moveLeft');


            break;    
        case (data = e.MENUOPTIONSPRESSED):
            break;   
        case (data = e.BACKTOMENU):
            document.getElementById('main').classList.remove('moveLeft')
            document.getElementById('main').classList.add('moveRight')

            break;
    }
}

