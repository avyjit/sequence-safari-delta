const gridsize = 20;

let grid = document.getElementById("gridbox");

for (let i=0; i < gridsize; ++i) {
    let row = document.createElement('div');
    row.className = 'gridrow';
    row.id = `row${i}`;

    for (let j=0; j < gridsize; ++j) {
        let cell = document.createElement('div');
        cell.className = 'gridcell';
        cell.id = `cell_${i}_${j}`;

        row.appendChild(cell);
    }

    grid.appendChild(row);
}


function defaultSnakePosition() {
    const midx = Math.floor(gridsize / 2);
    const midy = midx;

    const snake = [[midx-1, midy], [midx, midy], [midx+1, midy]];
    return snake;
}

function drawSnake() {
    for (let i=0; i < snake.length; ++i) {
        const cell = document.getElementById(`cell_${snake[i][0]}_${snake[i][1]}`);
        cell.className = 'gridcell snake';
    }
}

const D_UP = 0;
const D_RIGHT = 1;
const D_DOWN = 2;
const D_LEFT = 3;

const R_OK = 0;
const R_ERR = -1;
const R_ERR_OPPOSITE_DIRECTION = 1;

let direction = D_DOWN;
let snake = defaultSnakePosition();

function updateSnakePosition(direction, old_direction) {
    const head = snake[0];
    let newHead = [head[0], head[1]];

    // Check if the snake is going in the opposite direction
    if (
        (direction === D_UP && old_direction === D_DOWN) 
        || (direction === D_DOWN && old_direction === D_UP)
        || (direction === D_LEFT && old_direction === D_RIGHT)
        || (direction === D_RIGHT && old_direction === D_LEFT)
    ) {
        return R_ERR_OPPOSITE_DIRECTION;
    }

    switch (direction) {
        case D_UP: newHead[0] -= 1; break;
        case D_RIGHT: newHead[1] += 1; break;
        case D_DOWN: newHead[0] += 1; break;
        case D_LEFT: newHead[1] -= 1; break;
        default: return R_ERR;
    }

    snake.unshift(newHead);
    snake.pop();
}

function clearCurrentSnake() {
    for (let i=0; i < snake.length; ++i) {
        const cell = document.getElementById(`cell_${snake[i][0]}_${snake[i][1]}`);
        cell.className = 'gridcell';
    }
}

drawSnake();

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    let newDirection = direction;
    let wasDirectionChanged = true;

    switch (keyName) {
        case 'ArrowUp': newDirection = D_UP; break;
        case 'ArrowRight': newDirection = D_RIGHT; break;
        case 'ArrowDown': newDirection = D_DOWN; break;
        case 'ArrowLeft': newDirection = D_LEFT; break;
        default: wasDirectionChanged = false;
    }

    clearCurrentSnake();
    updateSnakePosition(newDirection, direction);
    drawSnake();

    direction = newDirection;
});