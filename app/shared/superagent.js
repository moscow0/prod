"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.httpRequest = httpRequest;
var _config = require("../react/config");
var _superagent = _interopRequireDefault(require("superagent"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable @typescript-eslint/no-floating-promises */





async function httpRequest(
endpoint,
fields,
headers,
file)
{
  return new Promise((resolve, reject) => {
    const req = _superagent.default.post(`${_config.APIURL}${endpoint}`);

    Object.keys(headers).forEach((headerKey) => {
      req.set(headerKey, headers[headerKey]);
    });

    Object.keys(fields).forEach((fieldKey) => {
      req.field(fieldKey, fields[fieldKey]);
    });

    if (file) {
      req.attach('file', file, file.name);
    }

    req.
    on('response', (response) => {
      const data = JSON.parse(response.text);
      if (response.status === 200) {
        resolve(data);
      } else {
        reject(data);
      }
    }).
    end();
  });
}