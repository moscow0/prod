"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  delta: 86,

  name: 'remove_evidence_vault_config',

  description: 'removes evidencesVault config from settings',

  reindex: false,

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    await db.collection('settings').updateOne({}, { $unset: { evidencesVault: 1 } });
  } };exports.default = _default;