const fs = require("fs");
exports.load = () => {
  const json = fs.readFileSync("data/actual.json").toString();
  return JSON.parse(json);
};
