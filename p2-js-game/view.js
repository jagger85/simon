import {box1,box2,box3,box4,start,reset} from './models/models.js'
import {display} from './models/display.js'

export function init(){
    document.getElementById('main').appendChild(box1)
    document.getElementById('main').appendChild(box2)
    document.getElementById('main').appendChild(box3)
    document.getElementById('main').appendChild(box4)
    document.getElementById('main').appendChild(start)
    document.getElementById('main').appendChild(reset)
    document.getElementById('main').appendChild(display)

    loadFonts();    
}


async function loadFonts(){
    const digital = new FontFace('digital','url(../assets/Digital-7.ttf)')
    await digital.load();
    document.fonts.add(digital);
}