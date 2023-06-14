import { display } from "./models.js";
import { events as e } from "../scripts/events.js";
/**
 * Responsible of observing events to change simon display text.
 * @module modules/display.js
 * @param {string} event - A game event. 
 */
export const fn = (data) => {
  switch (data) {
    case (data = e.ON):
      showValue("WELCOME");
      break;

    case (data = e.OFF):
      showValue("BYE");
      break;

    case (data = e.LEVEL_UP):
      showValue("LEVEL UP");
      break;

    case (data = e.GAME_OVER):
      showValue("GAME OVER");
      break;

    case (data = e.WRONG_INPUT):
      showValue("WRONG INPUT");
      break;

    case (data = e.RESET):
      showValue("RESETING...");
      break;

    case (data = e.SEQUENCE_STARTING):
      showValue("GET READY!");
      break;

    default:
      break;
  }
};
/**
 * Inherits a string on the display
 * @param {string} string - The string to be shown by the display
 * It has a hard-coded timer of 2 seconds, after that time it will show a blank display 
 */
function showValue(string) {
  display.value = string;
  setTimeout(() => {
    display.value = "";
  }, 2000);
}
