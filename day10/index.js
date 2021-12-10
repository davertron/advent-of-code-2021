const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

const POINTS = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

function isClosingCharacter(c) {
    return [")", "]", "}", ">"].includes(c);
}

function isMatching(open, close) {
    if (open === "(") return close === ")";
    if (open === "[") return close === "]";
    if (open === "{") return close === "}";
    if (open === "<") return close === ">";
    throw new Error(`Sorry I don't know wtf ${open} is...`);
}

function part1() {
    const lines = getInput("input.txt");
    const stack = [];
    let points = 0;
    for (let line of lines) {
        let characters = line.split("");
        for (let c of characters) {
            if (isClosingCharacter(c)) {
                const lastOpening = stack.pop();
                if (!isMatching(lastOpening, c)) {
                    points += POINTS[c];
                    break;
                }
            } else {
                stack.push(c);
            }
        }
    }
    console.log("Part 1: ", points);
}

function part2() {
    const lines = getInput("sample.txt");
    console.log("Part 2: ", null);
}

part1();
part2();
