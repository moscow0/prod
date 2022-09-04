"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.fileExists = exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));

var _config = require("../../../config");const _excluded = ["file", "uploaded", "toc", "fullText", "processed", "totalPages", "pdfInfo"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

const rename = async (current, newPath) =>
new Promise((resolve, reject) => {
  _fs.default.rename(current, newPath, (err) => {
    if (err === null) {
      resolve(true);
    }
    if (err) {
      reject(err);
    }
  });
});

const fileExists = async (filePath) =>
new Promise((resolve, reject) => {
  _fs.default.stat(filePath, (err) => {
    if (err === null) {
      resolve(true);
    }
    if (err && err.code === 'ENOENT') {
      resolve(false);
    }
    if (err) {
      reject(err);
    }
  });
});exports.fileExists = fileExists;

const oldThumbnailExists = async (entity) =>
fileExists(_path.default.join(_config.config.defaultTenant.uploadedDocuments, `${entity._id}.jpg`));var _default =

{
  delta: 21,

  name: 'move_document_to_files',

  description: 'move document from the entity to the files collection',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const cursor = db.collection('entities').find({});

    let index = 1;

    while (await cursor.hasNext()) {
      const entity = await cursor.next();
      if (entity.file) {
        const { file, uploaded, toc, fullText, processed, totalPages, pdfInfo } =
        entity,newEntity = _objectWithoutProperties(entity, _excluded);

        const fileToCreate = _objectSpread({
          type: 'document',
          toc,
          fullText,
          status: processed ? 'ready' : 'failed',
          uploaded,
          totalPages,
          pdfInfo,
          entity: entity.sharedId },
        file);


        const [alreadyExists] = await db.
        collection('files').
        find({ entity: entity.sharedId, filename: entity.file.filename }).
        toArray();

        if (!alreadyExists) {
          const {
            ops: [created] } =
          await db.collection('files').insertOne(fileToCreate);

          db.collection('connections').updateMany(
          { filename: created.filename },
          { $set: { file: created._id.toString() }, $unset: { filename: '' } });


          if (await oldThumbnailExists(entity)) {
            const thumbnailToCreate = {
              filename: `${created._id}.jpg`,
              type: 'thumbnail' };

            await db.collection('files').insertOne(thumbnailToCreate);
            await rename(
            _path.default.join(_config.config.defaultTenant.uploadedDocuments, `${entity._id}.jpg`),
            _path.default.join(_config.config.defaultTenant.uploadedDocuments, thumbnailToCreate.filename));

          }
        }

        await db.collection('entities').replaceOne({ _id: entity._id }, newEntity);

        process.stdout.write(` -> processed: ${index} \r`);
        index += 1;
      }
    }

    process.stdout.write('\r\n');
  } };exports.default = _default;