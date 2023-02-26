import { display } from "./models.js";
import { events as e } from "../scripts/events.js";

export const fn = (data) =>{
    switch(data){
        
        case (data = e.ON):
            showValue('WELCOME');
            break;

        case (data = e.OFF):
            showValue('BYE');
            break;

        case (data = e.LEVEL_UP):
            showValue('LEVEL UP');
            break;

        case (data = e.GAME_OVER):
            showValue('GAME OVER');
            break;

        case (data = e.WRONG_INPUT):
            showValue('WRONG INPUT');
            break;

        case (data = e.RESET):
            showValue('RESETING...')
            break;

        case (data = e.SEQUENCE_STARTING):
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