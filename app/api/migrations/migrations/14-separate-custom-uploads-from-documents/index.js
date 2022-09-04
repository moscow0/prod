"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _util = _interopRequireDefault(require("util"));
var _config = require("../../../config");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable no-await-in-loop */ //eslint-disable-next-line node/no-restricted-import

const rename = _util.default.promisify(_fs.default.rename);var _default =

{
  delta: 14,

  name: 'separate-custom-uploads-from-documents',

  description: 'Moves custom uploads to their own separate folder from uploaded documents',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const uploads = await db.collection('uploads').find();
    let index = 1;
    while (await uploads.hasNext()) {
      const { filename } = await uploads.next();

      const oldPath = _path.default.join(_config.config.defaultTenant.uploadedDocuments, filename);
      const newPath = _path.default.join(_config.config.defaultTenant.customUploads, filename);
      try {
        await rename(oldPath, newPath);
      } catch (e) {
        if (e.code !== 'ENOENT') {
          throw e;
        }
      }

      process.stdout.write(`processed -> ${index}\r`);
      index += 1;
    }

    process.stdout.write('\r\n');
  } };exports.default = _default;