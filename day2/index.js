const path = require("path");
const { getInput } = require("../lib");

const lines = getInput(path.join(__dirname, "input.txt"));

function part1() {
  let result = 0;
  let horizontal = 0;
  let depth = 0;

  lines.forEach((line) => {
    const matcher = /(forward|down|up) (\d+)/;
    const matches = matcher.exec(line);
    if (matches) {
      let [_, direction, amount] = matches;
      amount = parseInt(amount, 10);

      if (direction === "forward") {
        horizontal += amount;
      } else if (direction === "up") {
        depth -= amount;
      } else if (direction === "down") {
        depth += amount;
      } else {
        throw new Error("Bad direction:", direction);
      }
    }
  });

  result = horizontal * depth;

  console.log("Part 1:", result);
  return result;
}

part1();
