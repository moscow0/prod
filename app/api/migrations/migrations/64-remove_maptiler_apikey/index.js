"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // eslint-disable-next-line import/no-default-export
var _default =
{
  delta: 64,

  name: 'remove maptiler apikey',

  description: 'remove maptiler apikey',

  reindex: false,

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    await db.collection('settings').updateMany({}, { $unset: { mapTilerKey: 1 } });
  } };exports.default = _default;