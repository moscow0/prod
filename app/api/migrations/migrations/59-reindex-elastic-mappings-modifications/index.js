"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  delta: 59,

  name: 'reindex-elastic-mappings-modifications',

  description: 'Modifications made due to new search v2 endpoint',

  reindex: false,

  async up() {
    this.reindex = true;
  } };exports.default = _default;