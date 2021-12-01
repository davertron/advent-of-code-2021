const fs = require("fs");
const path = require("path");

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

function part1() {
  let lastNum = null;
  let increases = 0;
  lines.forEach((line) => {
    const currentNum = parseInt(line, 10);
    if (lastNum) {
      if (currentNum > lastNum) increases++;
    }
    lastNum = currentNum;
  });

  console.log("Part 1: ", increases);
}

function part2() {
  let increases = 0;
  console.log("Part 2: ", increases);
}

part1();
part2();
