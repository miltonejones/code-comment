const fs = require("fs");
const db = require("./data/db");
const parser = require("./parser");
const root = "/Users/miltonjones/Code/tango-test/";
const source = "tango-associate-ui/src";

const fix = (path) => {
  let markup = fs.readFileSync(root + path).toString();
  const json = db.load();
  const func = parser.getMethods(markup);
  const node = json.filter((f) => f.path === path)[0];
  const line = markup.split("\n");
  const done = line[0].indexOf("/*") > -1 || line[1].indexOf("/*") > -1;

  !node?.desc && console.log(' .....................>>> SKIPPING "%s"', path);

  if (!!node?.desc && func.length) {
    !done && (markup = `/* ${path}\n *  ${node.desc}\n */\n\n\n${markup}`);
    console.log(' ::: FIXING "%s"\n --- %s', path, node.desc);
    func.map((m) => {
      const name = m[1];
      const meth = node.methods?.filter((f) => f.name === name)[0];
      const spot = markup.indexOf(m[0]);
      !!meth?.desc && (markup = place(markup, spot, block(meth), name));
    });
    fs.writeFileSync(root + path, markup);
  }
  return node;
};

const place = (text, where, what, file) => {
  let before = text.substr(0, where);
  let after = text.substr(where);

  // back up to the beginning of the line
  const gutter = before.length - before.lastIndexOf("\n");
  where -= gutter - 1;
  before = text.substr(0, where);
  after = text.substr(where);

  const lines = before.split("\n");
  const ulti = lines[lines.length - 1];
  const penu = lines[lines.length - 2];
  const skip = ["*/", "* ", "//"];

  // don't do anything if we see a comment
  let commented = !!skip.filter(
    (f) => ulti.indexOf(f) > -1 || penu.indexOf(f) > -1
  ).length;

  if (commented) {
    console.log(
      '   ........................>>> SKIPPING "%s" already commented. gutter: %s',
      file,
      gutter
    );
    return text;
  }
  return `${before}\n${what}\n${after}`;
};

const declare = (arg) =>
  !!arg.type
    ? `  * @param {${arg.type}} ${arg.name} ${arg.desc}`
    : `  * @param ${arg.name} ${arg.desc}`;

const block = (meth) => {
  const code = [
    `
  /**
  * [${meth.desc}] `,
  ];
  meth.args
    ?.filter((a) => !!a.desc)
    .map((arg) => {
      code.push(declare(arg));
    });
  code.push(`  */`);
  return code.join("\n");
};

exports.putComments = () => {
  let files = [];
  parser.recurse(source, files, fix);
  console.log({ files: files.length });
  return files;
};
