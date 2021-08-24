// server.js

const comment = require("./comment");
const doc = require("./document");
const app = require("./config");
const fs = require("fs");
var express = require("express"); // call express
var cors = require("cors"); // call express
const router = express.Router();
var app = express(); // define our app using express
const port = 7007;
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

app.use(cors());
app.use("/", router);

router.get("/", (req, res) => {
  return res.send(comment.getComments());
});

router.post("/", (req, res) => {
  updateDb(req.body.codeCommentCollection).then((response) => {
    doc.putComments();
    res.json({ response });
  });
  return;
});

router.put("/", (req, res) => {
  fs.readFile(app.config.ROOT + req.body.file, (err, data) => {
    if (err) return res.json({ err });
    res.json({ response: data.toString() });
  });
  return;
});

// START THE SERVER
// =============================================================================
app.listen(port, () => {
  console.log("comment server running on port %s", port);
});

function updateDb(json) {
  return new Promise((callback) => {
    fs.writeFile("./data/actual.json", json, (err) => {
      if (err) callback("an error occurred");
      callback("successfully saved " + json.length + " bytes");
    });
  });
}
