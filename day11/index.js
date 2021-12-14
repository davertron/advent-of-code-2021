const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

function parseGrid(lines) {
    const grid = [];
    for (let line of lines) {
        grid.push(line.split("").map((n) => parseInt(n)));
    }
    return grid;
}

function getNeighbors([x, y], width, height) {
    const neighbors = [];

    // Northwest
    if (x > 0 && y > 0) neighbors.push([x - 1, y - 1]);
    // North
    if (y > 0) neighbors.push([x, y - 1]);
    // Northeast
    if (x < width - 1 && y > 0) neighbors.push([x + 1, y - 1]);
    // West
    if (x > 0) neighbors.push([x - 1, y]);
    // East
    if (x < width - 1) neighbors.push([x + 1, y]);
    // Southwest
    if (x > 0 && y < height - 1) neighbors.push([x - 1, y + 1]);
    // South
    if (y < height - 1) neighbors.push([x, y + 1]);
    // Southeast
    if (x < width - 1 && y < height - 1) neighbors.push([x + 1, y + 1]);

    return neighbors;
}

function step(grid) {
    const shouldFlash = [];
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
            grid[row][column] += 1;
            if (grid[row][column] > 9) {
                shouldFlash.push([column, row]);
            }
        }
    }

    const flashed = new Set();
    while (shouldFlash.length > 0) {
        const next = shouldFlash.shift();
        let [x, y] = next;
        flashed.add(`${x},${y}`);
        grid[y][x] = 0;
        const neighbors = getNeighbors(next, grid[0].length, grid.length);

        for (let neighbor of neighbors) {
            let [neighborX, neighborY] = neighbor;
            let neighborValue = grid[neighborY][neighborX];
            if (neighborValue > 0 && neighborValue < 10)
                grid[neighborY][neighborX]++;
            let updatedNeighborValue = grid[neighborY][neighborX];
            if (
                updatedNeighborValue > 9 &&
                !flashed.has(`${neighborX},${neighborY}`) &&
                !shouldFlash.find(
                    (coord) => coord[0] === neighborX && coord[1] === neighborY
                )
            ) {
                shouldFlash.push(neighbor);
            }
        }
    }
    return flashed.size;
}

function printGrid(grid) {
    for (let row of grid) {
        console.log(row.join(""));
    }
}

function part1() {
    const lines = getInput("input.txt");
    const grid = parseGrid(lines);
    //printGrid(grid);
    let flashCount = 0;
    for (let i = 0; i < 100; i++) {
        flashCount += step(grid);
        //printGrid(grid);
    }
    console.log("Part 1: ", flashCount);
}

function part2() {
    const lines = getInput("sample.txt");
    console.log("Part 2: ", null);
}

part1();
part2();
