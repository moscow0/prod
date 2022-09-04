"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  delta: 74,

  name: 'add_mimetype_to_elastic',

  description: 'Adds the attachment mimetype to the elastic search mapping.',

  reindex: true,

  async up() {
    process.stdout.write(`${this.name}...\r\n`);
  } };exports.default = _default;