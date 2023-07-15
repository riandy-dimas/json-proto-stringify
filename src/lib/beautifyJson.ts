import { getSelectedText, replaceSelectedText, showInformation } from "./common";

export function stringifySelected() {
  const selected = getSelectedText();

  if (!selected || !selected.trim()) {
    showInformation('Please select javascript object/JSON first');
    return;
  }

  try {
    const parsed = transform(selected);
    replaceSelectedText(parsed);
  } catch (err) {
    showInformation('Failed to stringify input text');
  }
}

function stringifyJsonString(value: string) {
  let obj;
  try {
    eval(`obj = ${value}`);
  } catch (ex) {
    eval(`obj = "${value}"`);
  }
  return JSON.stringify(JSON.stringify(obj));
}

function transform (str: string) {
  var parsedJsonString = {};
  try {
    eval(`parsedJsonString = ${JSON.parse(stringifyJsonString(str))}`);
  } catch (e) {
    console.error(e);
  }
  var jsonString = JSON.stringify(parsedJsonString, null, '\t');
  return splitToLines(jsonString);
}

function splitToLines (str: string) {
  str = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  str = str.substring(1, str.length - 1);
  str =
    `"{` +
    str.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var val = match;
        if (/^"/.test(match)) {
          val = `${match.replace(/"/g, '\\"')}`;
        }
        return val;
      }
    ) +
    `}"`;
  return str.replace(/\n/g, function (match) {
    return '"' + match + '"';
  }).trim();
}