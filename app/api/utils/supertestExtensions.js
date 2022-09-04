"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.extendSupertest = extendSupertest;

var _test = _interopRequireDefault(require("supertest/lib/test"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // @ts-ignore

function extractStatusDebugInfo(res) {
  try {
    return JSON.stringify(JSON.parse(res.text), null, 2);
  } catch (e) {
    return res.text;
  }
}

function extendSupertest() {
  const { _assertStatus } = _test.default.prototype;

  _test.default.prototype._assertStatus = function extendedAssertStatus(status, res) {
    const err = _assertStatus(status, res);
    if (err) {
      err.message += `\n ${extractStatusDebugInfo(res)}`;
      delete err.stack;
    }
    return err;
  };
}