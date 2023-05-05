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

    updatePosition(direction) {
        // We can't go in the opposite direction, so we early return
        if (direction === D_DOWN && this.direction === D_UP) return R_ERR_OPPOSITE_DIRECTION;
        if (direction === D_UP && this.direction === D_DOWN) return R_ERR_OPPOSITE_DIRECTION;
        if (direction === D_LEFT && this.direction === D_RIGHT) return R_ERR_OPPOSITE_DIRECTION;
        if (direction === D_RIGHT && this.direction === D_LEFT) return R_ERR_OPPOSITE_DIRECTION;

        // Check if direction is null or undefined, and then set it to the current direction
        if (direction === null || direction === undefined) {
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
    }

}


let snake = new Snake();
snake.draw();

document.addEventListener('keydown', (event) => {

    snake.clear();
    let ret;
    switch (event.key) {
        case 'ArrowUp': ret = snake.updatePosition(D_UP); break;
        case 'ArrowRight': ret = snake.updatePosition(D_RIGHT); break;
        case 'ArrowDown': ret = snake.updatePosition(D_DOWN); break;
        case 'ArrowLeft': ret = snake.updatePosition(D_LEFT); break;
        default: break;
    }

    if (ret === R_ERR_OPPOSITE_DIRECTION) { console.log("Opposite direction detected!"); }
    snake.draw();


});