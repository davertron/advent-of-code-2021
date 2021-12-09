const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

function parseInput(lines) {
    return lines.map((line) => {
        const [signalString, outputString] = line.split(" | ");
        return {
            signals: signalString.split(/\s+/),
            outputs: outputString.split(/\s+/),
        };
    });
}

function part1() {
    const lines = getInput("input.txt");
    const input = parseInput(lines);
    const result = input.reduce((acc, { outputs }) => {
        for (let o of outputs) {
            console.log(o);
            if ([2, 4, 3, 7].includes(o.length)) acc++;
        }
        return acc;
    }, 0);
    console.log("Part 1: ", result);
}

function part2() {
    const lines = getInput("sample.txt");
    console.log("Part 2: ", null);
}

part1();
part2();
