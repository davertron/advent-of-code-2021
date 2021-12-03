const fs = require("fs");
const path = require("path");

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .filter((n) => n);

function part1() {
  const bitSums = new Array(lines[0].length).fill(0);
  // We just sum the bits at every position for each line. At the end, if the
  // sum is less than the length of the overall array, we know there were more
  // zeroes at that position than ones.
  lines.forEach((line) => {
    new Array(bitSums.length).fill(null).forEach((_, i) => {
      bitSums[i] += parseInt(line[i], 10);
    });
  });

  let gamma = bitSums.reduce((acc, num) => {
    acc += num < lines.length / 2 ? "0" : "1";
    return acc;
  }, "");

  let epsilon = gamma.split("").reduce((acc, n) => {
    acc += n === "0" ? "1" : "0";
    return acc;
  }, "");

  gamma = parseInt(gamma, 2);
  epsilon = parseInt(epsilon, 2);

  console.log("Part 1: ", gamma * epsilon);

  return gamma * epsilon;
}

part1();
