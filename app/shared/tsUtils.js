"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ensure = ensure;exports.isBlobFile = void 0;exports.sleep = sleep;exports.wrapValidator = wrapValidator;var _util = _interopRequireDefault(require("util"));
var _lodash = require("lodash");
var _validation_error = _interopRequireDefault(require("ajv/dist/runtime/validation_error"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const isBlobFile = (file) =>
(0, _lodash.isObject)(file) && (0, _lodash.isString)(file.data);

// Thanks to https://stackoverflow.com/questions/54738221/typescript-array-find-possibly-undefind
exports.isBlobFile = isBlobFile;function ensure(argument, message) {
  if (argument === undefined || argument === null || !argument) {
    throw new TypeError(message || 'Promised type was not provided!');
  }

  return argument;
}

function wrapValidator(validator) {
  return async (value) => {
    try {
      return validator(value);
    } catch (error) {
      if (error) {
        const e = new _validation_error.default(error.errors);
        e.message = _util.default.inspect(error, false, null);
        e.stack = error.stack;
        throw e;
      }
      throw error;
    }
  };
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}