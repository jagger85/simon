/**
 * Events is an object with a collection of keys wich represent
 * any event of interest for another component that occurs in the game.
 * @constant
 * @type {JSON}
 */
export const events = Object.freeze({
    ON: 'SimonOn',
    OFF: 'machineOFF',
    LEVEL_UP: 'levelUp',
    GAME_OVER: 'gameOver',
    NOTE_CLICKED: 'noteClicked',
    LOAD_PAGE: 'loadPage',
    WRONG_INPUT: 'wrongInput',
    RESET: 'reset',
    USER_RESET: 'userReset',
    SEQUENCE_STARTING: 'sequenceStarting',
    SOUND_PRESSED: 'soundPressed',
    PLAY_PRESSED: 'playPressed',
    PLAY_RELEASED: 'playReleased',
    POWER_PRESSED: 'powerPressed',
    YELLOW_PRESSED: 'yellowPressed',
    RED_PRESSED: 'redPressed',
    BLUE_PRESSED: 'bluePressed',
    GREEN_PRESSED: 'greenPressed',
    YELLOW_RELEASED: 'yellowReleased',
    RED_RELEASED: 'redReleased',
    BLUE_RELEASED: 'blueReleased',
    GREEN_RELEASED: 'greenReleased',
    MENU_START_PRESSED: 'menuStartPressed',
    MENU_OPTIONS_PRESSED: 'menuOptionsPressed',
    BACK_TO_MENU: 'backToMenu',
})
