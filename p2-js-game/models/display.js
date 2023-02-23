import { display } from "./models.js";
import { events as e } from "./events.js";
export const fn = (data) =>{
    
    switch(data){
        case (data = e.ON):
            showValue('WELCOME');
            break;
        case (data = e.OFF):
            showValue('BYE');
            break;
        case (data = e.LEVELUP):
            showValue('LEVEL UP');
            break;
        case (data = e.GAMEOVER):
            showValue('GAME OVER');
            break;
        case (data = e.WRONGINPUT):
            showValue('WRONG INPUT');
            break;
        case (data = e.RESET):
            showValue('RESETING...')
            break;
        case (data = e.SEQUENCESTARTING):
            showValue('GET READY!')
            break;

        default:
            break;
    }
}

function showValue(string){
    display.value = string;
    setTimeout(()=>{
        display.value = '';
    },2000)
}