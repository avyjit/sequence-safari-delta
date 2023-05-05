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