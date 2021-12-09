const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

function calculateMinFuel(positions, minPos, maxPos) {
    let minFuel = Infinity;

    for (let i = minPos; i <= maxPos; i++) {
        let cost = 0;
        for (let p of positions) {
            cost += Math.abs(p - i);
        }
        minFuel = Math.min(minFuel, cost);
    }

    return minFuel;
}

function part1() {
    const lines = getInput("input.txt");
    const positions = lines[0].split(",").map((v) => parseInt(v));
    let minPos = Infinity;
    let maxPos = -Infinity;
    for (let pos of positions) {
        minPos = Math.min(minPos, pos);
        maxPos = Math.max(maxPos, pos);
    }

    const minFuel = calculateMinFuel(positions, minPos, maxPos);

    console.log("Part 1: ", minFuel);
}

function part2() {
    const lines = getInput("sample.txt");
    console.log("Part 2: ", null);
}

part1();
part2();
