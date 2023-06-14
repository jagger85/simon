/**
 * Sound service is responsible for triggering the sounds related with the game.
 * It observes the events which are relevant to sounds.
 */

import { events as e } from "../scripts/events.js";

const context = new AudioContext();

/**
 * Responsible for setting everithing that is needed to play a sound.
 * @param {string} string - A string that represents which sound should sound.
 * @param {number} duration - A number that represents how many seconds to sound .
 */
function play(string, duration) {
  const o = context.createOscillator();
  o.type = "triangle";
  var g = context.createGain();
  o.connect(g);
  g.connect(context.destination);
  g.gain.exponentialRampToValueAtTime(
    0.00001,
    context.currentTime + (duration ?? 1)
  );

  switch (string) {
    case "box1":
      o.frequency.value = 261.6;
      break;

    case "box2":
      o.frequency.value = 311.1;
      break;

    case "box3":
      o.frequency.value = 370;
      break;

    case "box4":
      o.frequency.value = 440;
      break;
  }
  if (localStorage.getItem("sound") == "ON") {
    o.start();
  }
}
/**
 * Responsible for trigger sounds.
 * @module services/soundService.js
 * @param {string} event - A game event 
 */
export const fn = (data) => {
  switch (data) {
    case (data = e.RED_PRESSED):
      play("box1", 1);
      break;

    case (data = e.YELLOW_PRESSED):
      play("box2", 1);
      break;

    case (data = e.GREEN_PRESSED):
      play("box3", 1);
      break;

    case (data = e.BLUE_PRESSED):
      play("box4", 1);
      break;
  }
};
