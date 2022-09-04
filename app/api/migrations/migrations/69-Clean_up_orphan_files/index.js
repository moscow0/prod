"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _promises = require("fs/promises");
var _path = _interopRequireDefault(require("path"));
var _config = require("../../../config");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // eslint-disable-next-line node/no-restricted-import

/* eslint-disable no-await-in-loop */var _default =
{
  delta: 69,

  name: 'Clean up orphan files',

  description:
  'Removes documents, attachments and thumbnails that do not belong to an existing entity',

  reindex: false,

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const paths = {
      document: _config.config.defaultTenant.uploadedDocuments,
      attachment: _config.config.defaultTenant.attachments,
      thumbnail: _config.config.defaultTenant.uploadedDocuments };


    const cursor = await db.collection('files').find({});
    while (await cursor.hasNext()) {
      const file = await cursor.next();

      if (['document', 'thumbnail', 'attachment'].includes(file.type)) {
        const [entity] = await db.collection('entities').find({ sharedId: file.entity }).toArray();
        if (!entity) {
          await db.collection('files').deleteOne({ _id: file._id });
          try {
            await (0, _promises.unlink)(_path.default.join(paths[file.type], file.filename));
          } catch (e) {
            if (e.code !== 'ENOENT') {
              throw e;
            }
          }
        }
      }
    }
  } };exports.default = _default;