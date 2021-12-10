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

const PART_2_POINTS = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
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
    let points = 0;
    for (let line of lines) {
        let characters = line.split("");
        const stack = [];
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
    const lines = getInput("input.txt");
    let incompleteScores = [];
    for (let line of lines) {
        let characters = line.split("");
        let isCorrupt = false;
        const stack = [];
        for (let c of characters) {
            if (isClosingCharacter(c)) {
                const lastOpening = stack.pop();
                if (!isMatching(lastOpening, c)) {
                    isCorrupt = true;
                    break;
                }
            } else {
                stack.push(c);
            }
        }
        if (!isCorrupt && stack.length > 0) {
            // Incomplete line
            let points = 0;
            while (stack.length > 0) {
                const next = stack.pop();
                points = points * 5 + PART_2_POINTS[next];
            }
            incompleteScores.push(points);
        }
    }
    const middleScore = incompleteScores.sort((a, b) => a - b)[
        Math.floor(incompleteScores.length / 2)
    ];
    console.log("Part 2: ", middleScore);
}

part1();
part2();
