"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  delta: 41,

  name: 'default-metadata-object',

  description: 'Add a devault empty objecty to entities without metadata',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    await db.
    collection('entities').
    updateMany({ metadata: { $exists: false } }, { $set: { metadata: {} } });
  } };exports.default = _default;