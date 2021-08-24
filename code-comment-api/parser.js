const app = require("./config");
const root = app.config.ROOT;
const fs = require("fs");
exports.root = root;
exports.getMethods = (text) => {
  const regex =
    /function\s*([A-z0-9]+)?\s*\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)\s*\{/g;
  const regex2 =
    /const\s*([A-z0-9]+)?\s*=\s*\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g;
  const regex3 =
    /const\s*([A-z0-9]+)?\s*=\s*async\s*\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g;
  const array = [...text.matchAll(regex)];
  const more = [...text.matchAll(regex2)];
  const sync = [...text.matchAll(regex3)];
  return [...array, ...more, ...sync];
};

const recurse = (path, indent, fn) => {
  const items = fs.readdirSync(root + path);
  items.map((item) => {
    const src = `${path}/${item}`;
    const dir = fs.lstatSync(root + src).isDirectory();
    const test =
      item.indexOf("test.js") < 0 &&
      item.indexOf("index.js") < 0 &&
      item.indexOf("stories") < 0 &&
      item.endsWith(".js");
    try {
      dir && recurse(src, indent, fn);
      test && indent.push(fn(src));
    } catch (e) {
      console.log({ e });
    }
  });
};

exports.recurse = recurse;
