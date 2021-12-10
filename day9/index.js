const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

function part1() {
    const lines = getInput("input.txt");
    const lowPoints = [];
    const numbers = lines.map((line) => line.split("").map((v) => parseInt(v)));
    for (let row = 0; row < numbers.length; row++) {
        for (let column = 0; column < numbers[row].length; column++) {
            const current = numbers[row][column];
            const up = row === 0 ? Infinity : numbers[row - 1][column];
            const down =
                row === numbers.length - 1
                    ? Infinity
                    : numbers[row + 1][column];
            const left = column === 0 ? Infinity : numbers[row][column - 1];
            const right =
                column === numbers[row].length - 1
                    ? Infinity
                    : numbers[row][column + 1];
            if (
                current < up &&
                current < down &&
                current < left &&
                current < right
            ) {
                lowPoints.push(current);
            }
        }
    }
    console.log(
        "Part 1: ",
        lowPoints.reduce((acc, v) => acc + v + 1, 0)
    );
}

function part2() {
    const lines = getInput("sample.txt");
    console.log("Part 2: ", null);
}

part1();
part2();
