const fs = require("fs");
const db = require("./data/db");
const parser = require("./parser");
const app = require("./config");
const root = app.config.ROOT;
const source = app.config.PATH;

const fix = (path) => {
  const json = db.load();
  const data = json.filter((f) => f.path === path)[0];
  const text = fs.readFileSync(root + path).toString();
  const func = parser.getMethods(text);
  const node = data || { path, methods: [] };

  if (!!func.length) {
    func.map((m) => {
      const done = !!node.methods.filter((f) => f.name === m[1])[0];
      const args = m[2]
        .replace("{", "")
        .replace("}", "")
        .split(",")
        .map((f) => f.trim())
        .filter((f) => !!f.length)
        .map((name) => ({ name, desc: "" }));
      !done &&
        node.methods.push({
          name: m[1],
          desc: ``,
          args,
        });
    });
  }

  return node;
};

exports.getComments = () => {
  let files = [];
  parser.recurse(source, files, fix);
  return files;
};
