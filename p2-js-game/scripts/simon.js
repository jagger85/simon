/**
 * Simon is the brain of the game and where the logic happens,
 * it implements a finite state machine approach
 * {@link https://en.wikipedia.org/wiki/Finite-state_machine}
 * Basically it can change from one state to a finite number of states
 * defined by the functions avaible on each state.
 * It has also some subscribers to whom simon is sending any important event
 * that happens
 */

import { fn as notes } from "../models/notes.js";
import {
  dataCenter as data,
  fn as datacenter,
} from "../services/dataCenter.js";
import { events as e } from "./events.js";
import { fn as display } from "../models/display.js";
import { fn as keys } from "../models/keys.js";
import { fn as controlButtons } from "../models/ControlButtons.js";
import { fn as sound } from "../services/soundService.js";

const observer = createObservable();
observer.subscribe(display);
observer.subscribe(notes);
observer.subscribe(controlButtons);
observer.subscribe(datacenter);
observer.subscribe(keys);
observer.subscribe(sound);

/**
 * Here in simon object states are represented by the objects inside transitions in which
 * you can find the avaible methods to execute.
 * There is five avaible states which are OFF, STANDBY, DISPLAYING, READING & RESETING
 * @see simon.transitions.OFF Simon don´t react to user input unless the user press the "on" button.
 * @see simon.transitions.STANDBY Is waiting for a user input.
 * @see simon.transitions.DISPLAYING Is responsible for displaying the pattern the user has to mimic.
 * @see simon.transitions.READING Is responsible for waiting the user input and check if it is correct.
 * @see simon.transitions.RESETING Is responsible of showing a color pattern and setting to default all values included user record.
 */

let simon = {
  state: "OFF",
  transitions: {
    OFF: {
      switch: function () {
        simon.changeState("STANDBY");
        observer.broadcast(e.ON);
      },
    },
    STANDBY: {
      switch: function () {
        simon.changeState("OFF");
        observer.broadcast(e.OFF);
      },
      startGame: function () {
        simon.changeState("DISPLAYING");
        simon.dispatch("displayPattern");
      },
      reset: function () {
        simon.changeState("RESETING");
        simon.dispatch("resetValues");
      },
    },
    DISPLAYING: {
      switch: function () {
        simon.changeState("OFF");
        observer.broadcast(e.OFF);
      },
      displayPattern: function () {
        observer.broadcast(e.SEQUENCE_STARTING);
        let n = 0;
        setTimeout(() => {
          step();
          function step() {
            if (localStorage.getItem("state") == "OFF") return;
            pressKey(data.getSequence[n]);
            setTimeout(() => {
              releaseKey(data.getSequence[n]);
              n++;

              setTimeout(() => {
                data.getSequence[n] != undefined
                  ? step()
                  : simon.changeState("READING");
              }, 100);
            }, data.getSpeed * 1000);
          }
        }, 3000);
      },
    },
    READING: {
      switch: function () {
        simon.changeState("OFF");
        observer.broadcast(e.OFF);
      },
      readUserInput: function (input) {
        if (input == data.getSequence[data.getUserSteps]) {
          data.addUserStep();
          if (data.getSequence[data.getUserSteps] == undefined) {
            observer.broadcast(e.LEVEL_UP);
            simon.changeState("DISPLAYING");
            simon.dispatch("displayPattern");
          }
        } else {
          observer.broadcast(e.WRONG_INPUT);
          setTimeout(() => {
            observer.broadcast(e.GAME_OVER);
          }, 2000);
          setTimeout(() => {
            simon.changeState("STANDBY");
          }, 4000);
        }
      },
    },
    RESETING: {
      resetValues: function () {
        observer.broadcast(e.RESET);
        let pattern = [0, 2, 3, 1, 0, 2, 3, 1, 0];
        pattern.sort();
        let n = 0;
        step();
        function step() {
          pressKey(pattern[n]);
          setTimeout(() => {
            releaseKey(pattern[n]);
            n++;
            if (pattern[n] != undefined) step();
          }, 200);
        }
        setTimeout(() => {
          simon.changeState("OFF");
          simon.dispatch("switch");
        }, 5000);
      },
    },
  },
  /**
   * Dispatch is the method responsible for triggering actions, it will only trigger the action if it is in the right state
   */
  dispatch(actionName, ...args) {
    const actions = this.transitions[this.state];
    const action = this.transitions[this.state][actionName];

    if (action) {
      action.apply(simon, ...args);
    } else {
      console.log(
        actionName + " action not valid for current state =" + this.state
      );
    }
  },
  /**
   * Change state is the method responsible for changing the machine state
   */
  changeState(newState) {
    localStorage.setItem("state", newState);
    this.state = newState;
  },
};

function pressKey(key) {
  switch (key) {
    case (key = 0):
      observer.broadcast(e.YELLOW_PRESSED);
      break;

    case (key = 1):
      observer.broadcast(e.RED_PRESSED);
      break;

    case (key = 2):
      observer.broadcast(e.BLUE_PRESSED);
      break;

    case (key = 3):
      observer.broadcast(e.GREEN_PRESSED);
      break;
  }
}

function releaseKey(key) {
  switch (key) {
    case (key = 0):
      observer.broadcast(e.YELLOW_RELEASED);
      break;

    case (key = 1):
      observer.broadcast(e.RED_RELEASED);
      break;

    case (key = 2):
      observer.broadcast(e.BLUE_RELEASED);
      break;

    case (key = 3):
      observer.broadcast(e.GREEN_RELEASED);
      break;
  }
}

export const fn = (data) => {
  switch (data) {
    case e.YELLOW_PRESSED:
      simon.dispatch("readUserInput", [0]);
      break;
    case e.RED_PRESSED:
      simon.dispatch("readUserInput", [1]);
      break;
    case e.BLUE_PRESSED:
      simon.dispatch("readUserInput", [2]);
      break;
    case e.GREEN_PRESSED:
      simon.dispatch("readUserInput", [3]);
      break;
    case e.POWER_PRESSED:
      simon.dispatch("switch");
      break;
    case e.PLAY_PRESSED:
      simon.dispatch("startGame");
      break;
    case e.USER_RESET:
      simon.dispatch("reset");
    default:
      break;
  }
};

function createObservable() {
  return {
    subscribers: [],

    subscribe(fn) {
      this.subscribers.push(fn);
    },

    unsuscribe(fn) {
      this.suscribers = this.suscribers.filter((item) => item !== fn);
    },

    broadcast(data) {
      for (let i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i](data);
      }
    },
  };
}
