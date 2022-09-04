"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _path = _interopRequireDefault(require("path"));
var _config = require("../../../config");
var _childProcessPromise = require("child-process-promise");

var _promises = _interopRequireDefault(require("fs/promises"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // eslint-disable-next-line node/no-restricted-import

async function exists(pdfPath) {
  try {
    await _promises.default.access(pdfPath);
    return true;
  } catch {
    return false;
  }
}

async function createThumbnail(filePath, thumbnailName) {
  await (0, _childProcessPromise.spawn)(
  'pdftoppm',
  [
  '-f',
  '1',
  '-singlefile',
  '-scale-to',
  '320',
  '-jpeg',
  filePath,
  _path.default.join(_path.default.dirname(filePath), thumbnailName)],

  { capture: ['stdout', 'stderr'] });

}

/* eslint-disable no-await-in-loop, import/no-default-export */var _default =
{
  delta: 70,

  name: 'Re-create thumbnails',

  description: 'Fixes previous migration results by recreating the thumbnails for the documents',

  reindex: false,

  // eslint-disable-next-line max-statements
  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    const cursor = await db.collection('files').find({ type: 'document' });
    while (await cursor.hasNext()) {
      const file = await cursor.next();

      const [thumbnail] = await db.
      collection('files').
      find({ type: 'thumbnail', filename: `${file._id.toString()}.jpg` }).
      toArray();

      if (!thumbnail) {
        const pdfPath = _path.default.join(_config.config.defaultTenant.uploadedDocuments, file.filename);
        if (await exists(pdfPath)) {
          try {
            await createThumbnail(pdfPath, file._id.toString());
            await db.collection('files').insertOne({
              type: 'thumbnail',
              entity: file.entity,
              language: file.language,
              filename: `${file._id.toString()}.jpg` });

          } catch (e) {
            // eslint-disable-next-line
            console.warn(`ERROR creating thumbnail for: ${pdfPath}`);
            // eslint-disable-next-line
            console.warn(e);
          }
        }
      }
    }
  } };exports.default = _default;