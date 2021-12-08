const fs = require("fs");
const path = require("path");

function getInput(filename) {
    return fs
        .readFileSync(path.join(__dirname, filename), "utf-8")
        .trim()
        .split("\n");
}

function simulateFish(fish, days) {
    for (let i = 0; i < days; i++) {
        let fishToAdd = 0;
        fish = fish.map((f) => {
            if (f === 0) {
                fishToAdd++;
                return 6;
            } else {
                return f - 1;
            }
        });
        for (let j = 0; j < fishToAdd; j++) {
            fish.push(8);
        }
    }

    return fish;
}

function part1() {
    const lines = getInput("input.txt");
    let fish = lines[0].split(",").map((v) => parseInt(v));
    const days = 80;
    fish = simulateFish(fish, days);
    console.log("Part 1: ", fish.length);
}

function part2() {
    const lines = getInput("sample.txt");
    let fish = lines[0].split(",").map((v) => parseInt(v));
    const days = 256;
    //fish = simulateFish(fish, days);
    console.log("Part 2: ", fish.length);
}

part1();
part2();
