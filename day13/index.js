const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

function parseInput(lines) {
    const dots = [];
    const folds = [];

    for (let l of lines) {
        if (/,/.test(l)) {
            dots.push(l.split(",").map((numStr) => parseInt(numStr)));
        } else if (/fold/.test(l)) {
            const matches = /(y|x)=(\d+)/.exec(l);
            folds.push([matches[1], parseInt(matches[2])]);
        }
    }

    return {
        dots,
        folds,
    };
}

function printGrid(dots) {
    let maxX = 0;
    let maxY = 0;
    for (let [x, y] of dots) {
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }

    for (let row = 0; row <= maxY; row++) {
        let rowOut = "";
        for (let column = 0; column <= maxX; column++) {
            // TODO: This is slow
            let coord = dots.find(([x, y]) => x === column && y === row);
            if (coord) {
                rowOut += "#";
            } else {
                rowOut += ".";
            }
        }
        console.log(rowOut);
    }
}

function fold(dots, fold) {
    const [type, index] = fold;
    const newDots = [];
    if (type === "y") {
        for (let dot of dots) {
            let [x, y] = dot;
            if (y < index) {
                newDots.push(dot);
            } else if (y > index) {
                let newY = index - (y - index);
                newDots.push([x, newY]);
            }
        }
    } else if (type === "x") {
        for (let dot of dots) {
            let [x, y] = dot;
            if (x < index) {
                newDots.push(dot);
            } else if (x > index) {
                let newX = index - (x - index);
                newDots.push([newX, y]);
            }
        }
    } else {
        throw new Error("No direction ", direction);
    }

    return newDots;
}

function part1() {
    const lines = getInput("input.txt");
    const { dots, folds } = parseInput(lines);
    //printGrid(dots);
    const newDots = fold(dots, folds[0]);
    //console.log("Number of new dots:", newDots.length);
    //printGrid(newDots);
    const numberOfDots = new Set(newDots.map(([x, y]) => `${x},${y}`)).size;
    console.log("Part 1: ", numberOfDots);
}

function part2() {
    const lines = getInput("sample.txt");
    console.log("Part 2: ", null);
}

part1();
part2();
