/**
 * This script is responsible for showing the notes located under the game,
 * it reflects some messages on how to operate simon and the user record.
 */

import { events as e } from "../scripts/events.js";

const notes = {
  1: "How to play:<br>Train your memory and <br>remember the pattern <br>Don't forget to switch it on <br>Enjoy!",
  2: "For reset:<br>Press play button for <br> three seconds<br>Your current record is ",
  3: 'Made with &nbsp;<i class="bi bi-heart"></i> &nbsp;by Jagger85',
};

function printNote() {
  if (localStorage.getItem("note") == undefined)
    localStorage.setItem("note", 1);
  document.getElementById("simon-sticky-content").innerHTML = getNote(
    localStorage.getItem("note")
  );
}

function nextNote() {
  if (localStorage.getItem("note") > 2) {
    localStorage.setItem("note", 1);
    document.getElementById("simon-sticky-content").innerHTML = getNote(
      localStorage.getItem("note")
    );
  } else {
    localStorage.setItem("note", parseInt(localStorage.getItem("note")) + 1);
    document.getElementById("simon-sticky-content").innerHTML = getNote(
      localStorage.getItem("note")
    );
  }
}

function getNote(note) {
  switch (note) {
    case (note = "1"):
      return notes[1];
    case (note = "2"):
      return (
        notes[2] +
        (localStorage.getItem("record") ?? 0) +
        "<br>" +
        getSentece(localStorage.getItem("record"))
      );
    case (note = "3"):
      return notes[3];
    default:
      return undefined;
  }
}

/**
 * This function returns a sentence according to the user level to encourage the user to scoring higher.
 */
function getSentece(level) {
  switch (true) {
    case level > 0 && level < 5:
      return "You can do it better";
    case level > 4 && level < 9:
      return "Wow impressive try to push harder";
    case level >= 9:
      return "OK YOU WIN!!!!";
    default:
      return "Give a try and challenge yourself";
  }
}

export const fn = (data) => {
  switch (data) {
    case (data = e.NOTE_CLICKED):
      nextNote();
      break;
    case (data = e.ON):
      printNote();
      break;
    case (data = e.LOAD_PAGE):
      printNote();
      break;
    case (data = e.GAME_OVER):
      printNote();
      break;
    default:
      break;
  }
};
