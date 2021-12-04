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

// Part 2

function getLeastCommonBitAtIndex(values, index) {
  let ones = 0;
  values.forEach((v) => {
    if (v[index] === "1") ones++;
  });

  return ones >= values.length / 2 ? "0" : "1";
}

function getMostCommonBitAtIndex(values, index) {
  let ones = 0;
  values.forEach((v) => {
    if (v[index] === "1") ones++;
  });

  return ones >= values.length / 2 ? "1" : "0";
}

function getOxygenGeneratorRating(readings) {
  let results = [...readings];
  let currentBitIndex = 0;
  while (results.length > 1) {
    let mostCommonBit = getMostCommonBitAtIndex(results, currentBitIndex);
    results = results.filter((r) => r[currentBitIndex] === mostCommonBit);
    currentBitIndex++;
  }
  return parseInt(results[0], 2);
}

function getCO2ScrubberRating(readings) {
  let results = [...readings];
  let currentBitIndex = 0;
  while (results.length > 1) {
    let leastCommonBit = getLeastCommonBitAtIndex(results, currentBitIndex);
    results = results.filter((r) => r[currentBitIndex] === leastCommonBit);
    currentBitIndex++;
  }
  return parseInt(results[0], 2);
}

function part2() {
  const oxygenGeneratorRating = getOxygenGeneratorRating(lines);
  const co2ScrubberRating = getCO2ScrubberRating(lines);
  console.log("Part 2: ", oxygenGeneratorRating * co2ScrubberRating);
}

part1();
part2();
