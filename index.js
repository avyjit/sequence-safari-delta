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

    // It's important that midx+1 is at the front of the array, 
    // because that's the head of the snake
    // and we are setting the direction to D_DOWN by default
    // so the head has to be at the bottom of the grid
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
const R_ERR_HIT_BOUNDARY = 3;

class Snake {
    constructor() {
        this.coords = defaultSnakePosition();
        this.direction = D_DOWN;
    }

    clear() {
        for (let i=0; i < this.coords.length; ++i) {
            const cell = document.getElementById(`cell_${this.coords[i][0]}_${this.coords[i][1]}`);
            cell.className = 'gridcell';
        }
    }

    draw() {
        for (let i=0; i < this.coords.length; ++i) {
            const cell = document.getElementById(`cell_${this.coords[i][0]}_${this.coords[i][1]}`);
            cell.className = 'gridcell snake';
        }
    }

    isOppositeDirection(direction) {
        return (
            (direction === D_DOWN && this.direction === D_UP)
            || (direction === D_UP && this.direction === D_DOWN)
            || (direction === D_LEFT && this.direction === D_RIGHT)
            || (direction === D_RIGHT && this.direction === D_LEFT)
        );
    }

    updatePosition(direction) {
        // We can't go in the opposite direction, so we check this case
        const isOppositeDirection = this.isOppositeDirection(direction);


        // Check if direction is null or undefined, and then set it to the current direction
        // if opposite direction, we ignore this and set it to the current direction
        if (direction === null || direction === undefined || isOppositeDirection) {
            direction = this.direction;
        }

        const head = this.coords[0];
        let newHead = [head[0], head[1]];

        switch (direction) {
            case D_UP: newHead[0] -= 1; break;
            case D_RIGHT: newHead[1] += 1; break;
            case D_DOWN: newHead[0] += 1; break;
            case D_LEFT: newHead[1] -= 1; break;
            default: return R_ERR;
        }

        // Bounds check the new head on the grid
        if (newHead[0] < 0 || newHead[0] >= gridsize || newHead[1] < 0 || newHead[1] >= gridsize) {
            return R_ERR_HIT_BOUNDARY;
        }

        this.coords.unshift(newHead);
        this.coords.pop();

        this.direction = direction;

        if (isOppositeDirection) {
            return R_ERR_OPPOSITE_DIRECTION;
        }

        return R_SNAKE_UPDATE_SUCCESSFUL;
    }

}

class SpawnManager {
    constructor() {
        this.blocks = [];
    }
}

class GameLoop {
    constructor() {
        this.snake = new Snake();
        this.spawnManager = new SpawnManager();
        this.queue = [];
    }

    handleClick(event) {
        // Check if event is any one of the arrow keys, and only then push it to the queue
        // Disregard all other keys
        let key = event.key;

        // If key is not one of the arrow keys, return
        if (key !== 'ArrowUp' && key !== 'ArrowRight' && key !== 'ArrowDown' && key !== 'ArrowLeft') return;

        // If the direction is opposite, we disregard this and don't push it into our key queue
        const dir = (key === 'ArrowUp') ? D_UP : (key === 'ArrowRight') ? D_RIGHT : (key === 'ArrowDown') ? D_DOWN : D_LEFT;
        if (this.snake.isOppositeDirection(dir)) {
            console.log("[INFO] Disregarding opposite direction keypress from key queue");
            return;
        }

        this.queue.unshift(event);
    }

    tick() {
        this.snake.clear();
        let ret;

        // Check if queue is empty
        if (this.queue.length === 0) {
            ret = this.snake.updatePosition(null);
        } else {
            let event = this.queue.pop();
            switch (event.key) {
                case 'ArrowUp': ret = this.snake.updatePosition(D_UP); break;
                case 'ArrowRight': ret = this.snake.updatePosition(D_RIGHT); break;
                case 'ArrowDown': ret = this.snake.updatePosition(D_DOWN); break;
                case 'ArrowLeft': ret = this.snake.updatePosition(D_LEFT); break;
                default: break;
            }
        }

        if (ret === R_ERR_OPPOSITE_DIRECTION) { console.log("Opposite direction detected!"); }
        this.snake.draw();
    }
}

// let snake = new Snake();
let loop = new GameLoop();

document.addEventListener('keydown', (event) => {
    loop.handleClick(event);
});

let interval = setInterval(() => {
    loop.tick();
}, 375);