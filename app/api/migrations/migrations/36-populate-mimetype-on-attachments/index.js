"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _JSONRequest = _interopRequireDefault(require("../../../../shared/JSONRequest"));
var _filesystem = require("../../../files/filesystem");
var _mimeTypes = _interopRequireDefault(require("mime-types"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  delta: 36,

  name: 'populate-mimetype-to-attachment',

  description: 'Populates mimetype of an attachment from a url',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    const cursor = await db.collection('files').find({});

    // eslint-disable-next-line no-await-in-loop
    while (await cursor.hasNext()) {
      // eslint-disable-next-line no-await-in-loop
      const file = await cursor.next();
      if (file.url && !file.mimetype) {
        // eslint-disable-next-line no-await-in-loop
        const response = await _JSONRequest.default.head(file.url);
        const mimetype = response.headers.get('content-type') || undefined;
        // eslint-disable-next-line no-await-in-loop
        await this.updateFile(db, file, mimetype);
      } else if (file.filename && file.type === 'attachment' && !file.mimetype) {
        const mimetype = _mimeTypes.default.lookup((0, _filesystem.attachmentsPath)(file.filename)) || undefined;
        // eslint-disable-next-line no-await-in-loop
        await this.updateFile(db, file, mimetype);
      }
    }
  },
  async updateFile(db, file, mimetype) {
    if (mimetype) {
      await db.collection('files').updateOne({ _id: file._id }, { $set: { mimetype } });
    }
  } };exports.default = _default;