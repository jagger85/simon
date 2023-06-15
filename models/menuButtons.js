import { events as e } from '../scripts/events.js'
/**
 * Responsible of the behavior for menu buttons
 * @module menuButtons.js
 */
export const fn = (data) => {
    switch (data) {
        case (data = e.MENU_START_PRESSED):
            document.getElementById('main').classList.remove('moveRight')
            document.getElementById('main').classList.add('moveLeft')
            break
        case (data = e.BACK_TO_MENU):
            document.getElementById('main').classList.remove('moveLeft')
            document.getElementById('main').classList.add('moveRight')
            break
    }
}
