"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  delta: 43,

  name: 'change-system-translation-label',

  description: 'Changes all translation contexts with system label to user Interface',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    await db.
    collection('translations').
    updateMany({ 'contexts.id': 'System' }, { $set: { 'contexts.$.label': 'User Interface' } });
  } };exports.default = _default;