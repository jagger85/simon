/**
 * Data center is responsible for dealing with the data and the local storage,
 * it provides the methods for initializing, reseting, and changing any data
 * in the game.
 */

import { events as e } from '../scripts/events.js'
/**
 * Provides methods for writing & reading data from the game
 * @constant
 * @type {Object}
 */
export const dataCenter = {
    speed: 1.2,
    steps: 4,
    userSteps: 0,
    sequence: undefined,
    actualLevel: 0,

    get getSpeed() {
        return this.speed
    },
    get getSteps() {
        return this.steps
    },
    get getUserSteps() {
        return this.userSteps
    },
    get getSequence() {
        return this.sequence
    },
    get getActualLevel() {
        return this.actualLevel
    },
    init: function () {
        this.speed = 1.2
        this.steps = 4
        this.userSteps = 0
        this.sequence = undefined
        this.actualLevel = 0
        localStorage.setItem('sound', 'OFF')
        this.update()
    },
    reset: function () {
        this.init()
        localStorage.setItem('record', 0)
        this.update()
    },
    levelUp: function () {
        this.addStep()
        this.resetUserSteps()
        this.addSpeed()
        this.actualLevel += 1
        this.update()
    },
    addUserStep: function () {
        this.userSteps++
        this.update()
    },
    addSpeed: function () {
        this.speed -= 0.1
        this.update()
    },
    addStep: function () {
        this.steps += 1
        this.update()
    },
    resetUserSteps: function () {
        this.userSteps = 0
        this.update()
    },
    createNewSequence: function () {
        this.sequence = [...Array(this.steps)].map(() =>
            Math.floor(Math.random() * 4)
        )
        this.update()
    },
    update: function () {
        localStorage.setItem('speed', this.speed)
        localStorage.setItem('steps', this.steps)
        localStorage.setItem('userSteps', this.userSteps)
        localStorage.setItem('sequence', this.sequence)
        localStorage.setItem('actualLevel', this.actualLevel)
    },
}

/**
 * Responsible for dealing with the data related to the game.
 * @module services/dataCenter.js
 * @param {string} event - A game event
 */
export const fn = (data) => {
    switch (data) {
        case (data = e.ON):
            dataCenter.init()
            break
        case (data = e.SEQUENCE_STARTING):
            dataCenter.createNewSequence()
            break
        case (data = e.LEVEL_UP):
            dataCenter.levelUp()
            break
        case (data = e.RESET):
            dataCenter.reset()
            break
        case (data = e.LOAD_PAGE):
            dataCenter.init()
            localStorage.setItem('state', 'OFF')
            break
        case (data = e.WRONG_INPUT):
            if (dataCenter.getActualLevel > localStorage.getItem('record')) {
                localStorage.setItem('record', dataCenter.getActualLevel)
            }
            dataCenter.init()
            break
        case (data = e.SOUND_PRESSED):
            if (localStorage.getItem('state') != 'OFF') {
                localStorage.getItem('sound') == 'OFF'
                    ? localStorage.setItem('sound', 'ON')
                    : localStorage.setItem('sound', 'OFF')
            }
    }
}
