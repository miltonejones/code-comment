export function JsonColor(json, classes, spacing = 2) {
  if (!json) return "";
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, spacing);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    function (match) {
      var cls = "numberCode";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "keyCode";
        } else {
          cls = "stringCode";
        }
      } else if (/true|false/.test(match)) {
        cls = "booleanCode";
      } else if (/null/.test(match)) {
        cls = "nullCode";
      }
      return '<span class="' + classes[cls] + '">' + match + "</span>";
    }
  );
}
