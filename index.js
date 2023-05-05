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

    const snake = [[midx+1, midy], [midx, midy], [midx-1, midy]];
    return snake;
}



const D_UP = 0;
const D_RIGHT = 1;
const D_DOWN = 2;
const D_LEFT = 3;

const R_OK = 0;
const R_ERR = -1;
const R_ERR_OPPOSITE_DIRECTION = 1;
const R_SNAKE_UPDATE_SUCCESSFUL = 2;


let globalState = {
    direction: D_DOWN,
    snake: defaultSnakePosition(),
};

function drawSnake() {
    const snake = globalState.snake;
    for (let i=0; i < globalState.snake.length; ++i) {
        const cell = document.getElementById(`cell_${snake[i][0]}_${snake[i][1]}`);
        cell.className = 'gridcell snake';
    }
}

function updateSnakePosition(new_direction, old_direction) {
    const head = globalState.snake[0];
    let newHead = [head[0], head[1]];

    // Check if the snake is going in the opposite direction
    if (
        (new_direction === D_UP && old_direction === D_DOWN) 
        || (new_direction === D_DOWN && old_direction === D_UP)
        || (new_direction === D_LEFT && old_direction === D_RIGHT)
        || (new_direction === D_RIGHT && old_direction === D_LEFT)
    ) {
        return R_ERR_OPPOSITE_DIRECTION;
    }

    switch (new_direction) {
        case D_UP: newHead[0] -= 1; break;
        case D_RIGHT: newHead[1] += 1; break;
        case D_DOWN: newHead[0] += 1; break;
        case D_LEFT: newHead[1] -= 1; break;
        default: return R_ERR;
    }

    globalState.snake.unshift(newHead);
    globalState.snake.pop();

    return R_SNAKE_UPDATE_SUCCESSFUL;
}

function clearCurrentSnake() {
    const snake = globalState.snake;
    for (let i=0; i < globalState.snake.length; ++i) {
        const cell = document.getElementById(`cell_${snake[i][0]}_${snake[i][1]}`);
        cell.className = 'gridcell';
    }
}

drawSnake();

function handleDirectionChange(newDirection) {
    clearCurrentSnake();
    const ret = updateSnakePosition(newDirection, globalState.direction);
    drawSnake();

    if (ret !== R_ERR_OPPOSITE_DIRECTION) {
        globalState.direction = newDirection;
    }
}


document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    switch (keyName) {

        case 'ArrowUp': handleDirectionChange(D_UP); break;
        case 'ArrowRight': handleDirectionChange(D_RIGHT); break;
        case 'ArrowDown': handleDirectionChange(D_DOWN); break;
        case 'ArrowLeft': handleDirectionChange(D_LEFT); break;
        default: break;
    }


});