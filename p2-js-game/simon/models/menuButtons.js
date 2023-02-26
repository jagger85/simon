import { gameContainer,menuContainer } from './models.js';
import { events as e } from '../scripts/events.js'


export const fn = (data) =>{
    switch(data){
        case (data = e.MENU_START_PRESSED):
            document.getElementById('main').classList.remove('moveRight')
            document.getElementById('main').classList.add('moveLeft');


            break;    
        case (data = e.MENU_OPTIONS_PRESSED):
            break;   
        case (data = e.BACK_TO_MENU):
            document.getElementById('main').classList.remove('moveLeft')
            document.getElementById('main').classList.add('moveRight')

            break;
    }
}

