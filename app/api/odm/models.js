"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.QueryForEach = QueryForEach;
var _entities = _interopRequireDefault(require("../entities"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

async function QueryForEach(batchSize, fn) {
  let lastId;
  let batch;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    batch = await _entities.default.getWithoutDocuments(_objectSpread({
      language: 'en' }, lastId ? { _id: { $gt: lastId } } : {}),
    {},
    { sort: '_id', limit: batchSize });


    if (!batch || !batch.length) {
      break;
    }
    lastId = batch[batch.length - 1]._id;

    // eslint-disable-next-line no-await-in-loop
    await Promise.all(batch.map(fn));
  }
}