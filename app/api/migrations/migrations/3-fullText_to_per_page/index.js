"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _config = require("../../../config");
var _PDF = require("../../../files/PDF");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =

{
  delta: 3,

  name: 'fullText_to_per_page',

  description:
  'change fullText, now text pages will be saved indexed in an object and pseudo formated with pdftotext',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    let index = 1;
    const totalDocuments = await db.collection('entities').countDocuments({ type: 'document' });
    if (totalDocuments === 0) {
      return;
    }
    const cursor = db.collection('entities').find({ type: 'document' }, { _id: 1, file: 1 });
    while (await cursor.hasNext()) {
      const entity = await cursor.next();
      if (!entity.file || entity.file && !entity.file.filename) {
        process.stdout.write(`processed (no filename) -> ${index}\r`);
      } else if (
      !_fs.default.existsSync(_path.default.join(_config.config.defaultTenant.uploadedDocuments, entity.file.filename)))
      {
        process.stdout.write(`processed (no file) -> ${index}\r`);
      } else {
        try {
          const conversion = await new _PDF.PDF({
            filename: _path.default.join(_config.config.defaultTenant.uploadedDocuments, entity.file.filename) }).
          extractText();
          await db.collection('entities').findOneAndUpdate(entity, { $set: _objectSpread({}, conversion) });
          process.stdout.write(`processed -> ${index}\r`);
        } catch (err) {
          await db.
          collection('entities').
          findOneAndUpdate(entity, { $set: { fullText: { 1: '' } } });
          process.stdout.write(`processed (${err}) -> ${index}\r`);
        }
      }
      index += 1;
      if (index - 1 === totalDocuments) {
        return;
      }
    }
  } };exports.default = _default;