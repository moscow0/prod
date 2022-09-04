"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _toc_properties = _interopRequireDefault(require("./toc_properties"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const properties = {
  properties: {
    _id: {
      type: 'keyword',
      fields: {
        raw: { type: 'keyword' },
        sort: { type: 'keyword' } } },


    creationDate: {
      type: 'date',
      format: 'epoch_millis',
      fields: {
        raw: { type: 'date', index: false },
        sort: { type: 'date' } } },


    entity: {
      type: 'keyword',
      fields: {
        raw: { type: 'keyword' },
        sort: { type: 'keyword' } } },


    filename: {
      type: 'object',
      enabled: false },

    language: {
      type: 'keyword' },

    mimetype: {
      type: 'object',
      enabled: false },

    originalname: {
      type: 'object',
      enabled: false },

    size: {
      type: 'integer',
      index: false },

    status: {
      type: 'keyword',
      fields: {
        raw: { type: 'keyword' },
        sort: { type: 'keyword' } } },


    timestamp: {
      type: 'date',
      format: 'epoch_millis',
      fields: {
        raw: { type: 'date', index: false },
        sort: { type: 'date' } } },


    totalPages: {
      type: 'short',
      index: false },

    type: {
      type: 'keyword',
      fields: {
        raw: { type: 'keyword' },
        sort: { type: 'keyword' } } },


    toc: _toc_properties.default } };var _default =



properties;exports.default = _default;