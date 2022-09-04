"use strict";
var _config = require("../../../config");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _ = _interopRequireDefault(require("./"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable max-statements,no-eval,node/no-restricted-import,no-console */

function walk(dir, callback) {
  _fs.default.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const filepath = _path.default.join(dir, file);
      _fs.default.stat(filepath, (err2, stats) => {
        if (err2) throw err2;
        if (stats.isDirectory()) {
          walk(filepath, callback);
        } else if (stats.isFile()) {
          callback(filepath, stats);
        }
      });
    });
  });
}

function extractBracketLength(contents, pos) {
  if (contents[pos] !== '{') {
    throw new Error('bad call to extractJson!');
  }
  let numBracket = 1;
  let endPos = pos + 1;
  for (; numBracket > 0; endPos += 1) {
    if (contents[endPos] === '{') {
      numBracket += 1;
    } else if (contents[endPos] === '}') {
      numBracket -= 1;
    }
  }
  return endPos - pos;
}

function handleFile(file, _stats) {
  if (/.*migrations.*/.test(file) || !/.*js/.test(file)) {
    return;
  }
  let contents = _fs.default.readFileSync(file, 'utf8');
  let pos = 0;
  let changed = false;
  while (pos >= 0) {
    pos = contents.indexOf('metadata: {', pos);
    if (pos < 0) {
      break;
    }
    pos += 10;
    const len = extractBracketLength(contents, pos);
    if (len > 2) {
      try {
        const data = eval(`(${contents.substr(pos, len)})`);
        const newStr = JSON.stringify(_.default.expandMetadata(data));
        console.info(`Match in ${file} at ${pos}: ${newStr}`);
        contents = contents.substr(0, pos) + newStr + contents.substr(pos + len);
        changed = true;
      } catch (err) {
        console.error(
        `Could not parse match in ${file} at ${pos} - ${err}: ${contents.substr(pos, len)}`);

      }
    }
  }
  if (changed) {
    if (contents.indexOf('@format') < 0) {
      contents = `/** @format */\n\n${contents}`;
    }
    _fs.default.writeFileSync(`${file}`, contents);
  }
}

walk(_path.default.join(_config.config.rootPath, '/app'), handleFile);