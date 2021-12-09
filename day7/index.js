const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

function calculateMinFuel(positions, minPos, maxPos, part2 = false) {
    let minFuel = Infinity;

    for (let i = minPos; i <= maxPos; i++) {
        let cost = 0;
        for (let p of positions) {
            const distance = Math.abs(p - i);
            if (part2) {
                cost += (distance * distance + distance) / 2;
            } else {
                cost += distance;
            }
        }
        minFuel = Math.min(minFuel, cost);
    }

    return minFuel;
}

function calculateMinMaxPositions(positions) {
    let minPos = Infinity;
    let maxPos = -Infinity;
    for (let pos of positions) {
        minPos = Math.min(minPos, pos);
        maxPos = Math.max(maxPos, pos);
    }

    return [minPos, maxPos];
}

function part1() {
    const lines = getInput("input.txt");
    const positions = lines[0].split(",").map((v) => parseInt(v));

    const [minPos, maxPos] = calculateMinMaxPositions(positions);
    const minFuel = calculateMinFuel(positions, minPos, maxPos);

    console.log("Part 1: ", minFuel);
}

function part2() {
    const lines = getInput("input.txt");
    const positions = lines[0].split(",").map((v) => parseInt(v));

    const [minPos, maxPos] = calculateMinMaxPositions(positions);
    const minFuel = calculateMinFuel(positions, minPos, maxPos, true);
    console.log("Part 2: ", minFuel);
}

part1();
part2();
