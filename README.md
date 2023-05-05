# Safari Sequence
### Game Logic
-   The game comprises a grid where the user controls a snake and moves around the map
-   There will be items scattered across the map which the snake can eat
-   The snake must eat the items in the correct sequence
-   The snake dies when it hits a wall or eats itself.
-   [Here](https://www.youtube.com/watch?v=4vYGWsmCNlI)  is a demo to give an idea on how the game works.

## Modes

### NormalMode

-  [x] Display a grid of dimensions at least 20 x 20
-  [x] The size of the snake is three tiles long
-  [x] The Snake travels across the map to eat color blocks. The color blocks must be eaten in the correct sequence as displayed.
-  [x] Implement a suitable scoring system
-  [x] Implement a time system: the game continues as long as there is time on the clock. When completing a sequence of blocks, the player gains time.
-  [x] Make the game mobile responsive
-  [x] Implement onscreen direction control to steer the snake
-  [x] Implement a leaderboard system using local storage

### HackerMode

-  [ ] Implement a lives system: when a snake dies, it loses a life. When all the lives are depleted, the game ends
-  [ ] On completing a sequence of blocks, the snake grows in size
-  [ ] If the snake eats itself, the game ends
-  [ ] As time progresses, make the snake move faster
-  [ ] Implement power-ups that spawn randomly and gain buffs on eating them, such as shrinking the snake and slowing it down
-  [ ] Implement a pause button.
-  [x] Implement sound on snake-eating word
-  [ ] Implement variable grid size as per player request
-  [ ] Replace color blocks with letters and words to be eaten in the correct sequence

### HackerMode++

-  [ ] Implement CSS animations to make the snake move smoother
-  [ ] Implement a save-game feature: You can save the current game and later load state and continue from there
-  [ ] Implement a 2-player game mode
-  [ ] Add obstacles that move across the map. On hitting it, the snake dies.
-  [ ] Add a portal where the snake can travel in and out of

_No frameworks are allowed. HTML canvas is prohibited for this task. Use only vanilla js, CSS, and HTML_

_NOTE: Normal Mode is necessary to complete the task. HackerMode and HackerMode++ are highly encouraged_

## Deadline

20 May 2023 | 11.59 pm