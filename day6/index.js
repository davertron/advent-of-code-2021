const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

function simulateFish(fish, days) {
    let fishCounts = new Array(9).fill(0);
    for (let f of fish) {
        fishCounts[f]++;
    }
    for (let i = 0; i < days; i++) {
        let nextFishCounts = new Array(9).fill(0);
        // All zeroes spawn an 8
        nextFishCounts[8] = fishCounts[0];
        // All 8's become 7's
        nextFishCounts[7] = fishCounts[8];
        // All 7's and 0's become 6's
        nextFishCounts[6] = fishCounts[7] + fishCounts[0];
        // Everything else just shifts down one...
        nextFishCounts[5] = fishCounts[6];
        nextFishCounts[4] = fishCounts[5];
        nextFishCounts[3] = fishCounts[4];
        nextFishCounts[2] = fishCounts[3];
        nextFishCounts[1] = fishCounts[2];
        nextFishCounts[0] = fishCounts[1];

        fishCounts = nextFishCounts;
    }

    return fishCounts;
}

function part1() {
    const lines = getInput("input.txt");
    let fish = lines[0].split(",").map((v) => parseInt(v));
    const counts = simulateFish(fish, 80);
    const total = counts.reduce((acc, count) => acc + count);
    console.log("Part 1: ", total);
}

function part2() {
    const lines = getInput("input.txt");
    let fish = lines[0].split(",").map((v) => parseInt(v));
    const counts = simulateFish(fish, 256);
    const total = counts.reduce((acc, count) => acc + count);
    console.log("Part 2: ", total);
}

part1();
part2();
