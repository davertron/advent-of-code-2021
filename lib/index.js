const fs = require("fs");

module.exports = {
  getInput: (file) => fs.readFileSync(file, "utf-8").split("\n"),
};
