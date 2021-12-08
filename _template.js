const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

function part1() {
    const lines = getInput("sample.txt");
    console.log("Part 1: ", null);
}

function part2() {
    const lines = getInput("sample.txt");
    console.log("Part 2: ", null);
}

part1();
part2();
