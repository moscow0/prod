"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;const properties = {
  properties: {
    _id: {
      type: 'keyword',
      fields: {
        raw: { type: 'keyword' },
        sort: { type: 'keyword' } } },


    indentation: {
      type: 'short',
      index: false },

    range: {
      properties: {
        end: {
          type: 'integer',
          index: false },

        start: {
          type: 'integer',
          index: false } } } } };var _default =






properties;exports.default = _default;