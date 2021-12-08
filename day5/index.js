const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

function parseLines(input) {
    let lineRegex = /(\d+),(\d+) -> (\d+),(\d+)/;
    return input.map((line) => {
        const matches = lineRegex.exec(line);
        if (!matches) {
            throw new Error("Unable to parse line: ", line);
        }
        return {
            x1: parseInt(matches[1]),
            y1: parseInt(matches[2]),
            x2: parseInt(matches[3]),
            y2: parseInt(matches[4]),
        };
    });
}

function isHorizontal(line) {
    return line.y1 === line.y2;
}

function isVertical(line) {
    return line.x1 === line.x2;
}

function printGrid(maxX, maxY, coords) {
    for (let row = 0; row <= maxY; row++) {
        let output = "";
        for (let column = 0; column <= maxX; column++) {
            if (coords[`${column},${row}`]) {
                output += coords[`${column},${row}`];
            } else {
                output += ".";
            }
        }
        console.log(output);
    }
}

function getCoords(lines, includeDiagonals = false, shouldPrintGrid = false) {
    const coords = {};
    let maxX = -1;
    let maxY = -1;
    lines.forEach((line) => {
        maxX = Math.max(maxX, line.x1, line.x2);
        maxY = Math.max(maxY, line.y1, line.y2);
        if (isHorizontal(line)) {
            let startX = line.x1 < line.x2 ? line.x1 : line.x2;
            let endX = line.x1 < line.x2 ? line.x2 : line.x1;
            for (let x = startX; x <= endX; x++) {
                if (!coords[`${x},${line.y1}`]) {
                    coords[`${x},${line.y1}`] = 0;
                }
                coords[`${x},${line.y1}`]++;
            }
        } else if (isVertical(line)) {
            let startY = line.y1 < line.y2 ? line.y1 : line.y2;
            let endY = line.y1 < line.y2 ? line.y2 : line.y1;
            for (let y = startY; y <= endY; y++) {
                if (!coords[`${line.x1},${y}`]) {
                    coords[`${line.x1},${y}`] = 0;
                }
                coords[`${line.x1},${y}`]++;
            }
        } else if (includeDiagonals) {
            // TODO: We're assuming proper input which could bite us, check here if you're having issues...
            let currentX = line.x1;
            let currentY = line.y1;
            while (currentX !== line.x2 || currentY !== line.y2) {
                if (!coords[`${currentX},${currentY}`]) {
                    coords[`${currentX},${currentY}`] = 0;
                }
                coords[`${currentX},${currentY}`]++;
                line.x1 < line.x2 ? currentX++ : currentX--;
                line.y1 < line.y2 ? currentY++ : currentY--;
            }
            if (!coords[`${currentX},${currentY}`]) {
                coords[`${currentX},${currentY}`] = 0;
            }
            coords[`${currentX},${currentY}`]++;
        }
    });

    if (shouldPrintGrid) printGrid(maxX, maxY, coords);

    return coords;
}

function part1() {
    const lines = parseLines(getInput("input.txt"));
    const coords = getCoords(lines);
    const result = Object.entries(coords).filter(
        ([key, value]) => value >= 2
    ).length;
    console.log("Part 1: ", result);
}

function part2() {
    const lines = parseLines(getInput("input.txt"));
    const coords = getCoords(lines, true);
    const result = Object.entries(coords).filter(
        ([key, value]) => value >= 2
    ).length;
    console.log("Part 2: ", result);
}

part1();
part2();
