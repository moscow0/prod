"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  delta: 23,

  name: 'fix_udaptelogs',

  description: 'delete update logs without mongoId',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    await db.collection('updatelogs').removeMany({ mongoId: { $exists: false } });
  } };exports.default = _default;