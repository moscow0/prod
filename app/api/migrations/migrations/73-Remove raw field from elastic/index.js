"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  delta: 73,

  name: 'Remove raw field from elastic',

  description: 'Removes the raw subfield from the ElasticSearch index',

  reindex: true,

  async up() {
    process.stdout.write(`${this.name}...\r\n`);
  } };exports.default = _default;