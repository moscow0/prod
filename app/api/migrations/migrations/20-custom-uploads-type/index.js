"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable no-await-in-loop */var _default =
{
  delta: 20,

  name: 'custom-uploads-type',

  description: 'adds property type: "custom" to all current uploads',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    await db.collection('files').updateMany({}, { $set: { type: 'custom' } });

    process.stdout.write('\r\n');
  } };exports.default = _default;