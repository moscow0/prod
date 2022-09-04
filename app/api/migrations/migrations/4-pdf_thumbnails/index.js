"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _childProcessPromise = require("child-process-promise");
var _config = require("../../../config");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable no-await-in-loop */var _default =

{
  delta: 4,

  name: 'pdf_thumbnails',

  description: 'Creating PDF thubmnails for all documents',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    let index = 1;
    const cursor = db.collection('entities').find({ type: 'document' });
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      if (doc.file && doc.file.filename) {
        const documentId = doc._id.toString();
        const filePath = _path.default.join(_config.config.defaultTenant.uploadedDocuments, doc.file.filename);
        const thumbnailPath = _path.default.join(_config.config.defaultTenant.uploadedDocuments, documentId);
        try {
          await (0, _childProcessPromise.spawn)(
          'pdftoppm',
          ['-f', '1', '-singlefile', '-scale-to', '320', '-jpeg', filePath, thumbnailPath],
          { capture: ['stdout', 'stderr'] });

        } catch (err) {
          process.stdout.write(`Thumbnail creation error for: ${documentId}\r`);
        }
        process.stdout.write(`processed -> ${index}\r`);
        index += 1;
      }
    }
    process.stdout.write('\r\n');
  } };exports.default = _default;