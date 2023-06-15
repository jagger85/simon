# Simon - Memory Game

Welcome to Simon, a classic memory game implemented in vanilla JavaScript. This game tests your memory and pattern recognition skills as you attempt to mimic an increasingly complex color pattern sequence. Inspired by the popular analog machine from the 90s, Simon will challenge you to push your limits and achieve high scores!

## How to Play

-   To run the game, simply open the index.html file in your web browser.
-   The game consists of four colored buttons: Red, Green, Blue, and Yellow.
-   Watch and memorize the sequence of colors played by Simon.
-   Click or tap the buttons in the same order as the pattern you just observed.
-   As you mimic the correct pattern, the sequence will grow longer and the game will speed up.
-   Be careful! One wrong move and it's game over.
-   Aim for the highest score by challenging your memory and reflexes!

## Implementation Details

Simon is implemented using a finite state machine (FSM) approach, utilizing different states to control the game flow. The following states are implemented in the game:

-   OFF: The initial state of the game when it is turned off. In this state, no interactions are allowed, you can only switch it on.
-   STANDBY: After turning on the game, it enters the standby state where the player can start a new game by pressing a designated button. The game waits for the player's input to begin.
-   DISPLAYING: Once the game starts, it enters the displaying state. In this state, Simon generates and displays a sequence of colors for the player to memorize. The colors are shown in a specific order with visual and audio cues.
-   DISPLAYING: Once the game starts, it enters the displaying state. In this state, Simon generates and displays a sequence of colors for the player to memorize. The colors are shown in a specific order with visual and audio cues.
-   RESETTING: After pressing the play button for three seconds Simon will enter on a reset state to set the player score to 0.

The finite state machine ensures that the game progresses in a controlled manner, transitioning between states based on player input and game outcomes. Each state has its own set of rules and actions, contributing to the overall gameplay experience.

The JavaScript code follows a modular and organized structure, making it easy to understand and maintain. Event listeners, animations, and sound effects are incorporated to provide an engaging and immersive gaming experience. The game dynamically adjusts the difficulty by increasing the sequence length and speed as the player progresses.

## Dependencies

Simon is built using vanilla JavaScript, meaning it does not rely on any external libraries or frameworks. The game runs directly in your web browser without the need for additional installations or dependencies.

## Contact

If you have any questions, feedback, or suggestions, please reach me out jagger85.crypto@gmail.com. Enjoy the game and have fun challenging your memory!
