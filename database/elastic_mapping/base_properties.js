"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _document_properties = _interopRequireDefault(require("./document_properties"));
var _mappings = require("./mappings");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const PermissionProperties = {
  type: 'nested',
  properties: {
    refId: {
      type: 'keyword' },

    level: {
      type: 'keyword' },

    type: {
      type: 'keyword' } } };




const properties = {
  documents: _document_properties.default,
  '@timestamp': { type: 'date', doc_values: true },
  '@version': { type: 'text', index: false },
  fullText: { type: 'join', relations: { entity: 'fullText' } },
  title: {
    type: 'text',
    index: true,
    analyzer: 'other',
    fields: {
      raw: { type: 'text' },
      sort: _mappings.textSortField,
      sayt: { type: 'search_as_you_type' },
      sayt_ngram: {
        type: 'search_as_you_type',
        analyzer: 'title_sayt',
        search_analyzer: 'standard' } },


    term_vector: 'with_positions_offsets' },

  creationDate: {
    type: 'date',
    format: 'epoch_millis',
    fields: {
      raw: { type: 'date', index: false },
      sort: { type: 'date' } } },


  editDate: {
    type: 'date',
    format: 'epoch_millis',
    fields: {
      raw: { type: 'date', index: false },
      sort: { type: 'date' } } },


  attachments: {
    type: 'object',
    enabled: true,
    properties: {
      mimetype: {
        type: 'keyword' } } },



  icon: {
    type: 'object',
    enabled: false },

  toc: {
    type: 'object',
    enabled: false },

  language: {
    type: 'keyword' },

  published: {
    type: 'keyword' },

  sharedId: {
    type: 'keyword',
    fields: {
      raw: { type: 'keyword' },
      sort: { type: 'keyword' } } },


  template: {
    type: 'keyword',
    fields: {
      raw: { type: 'keyword' },
      sort: { type: 'keyword' } } },


  generatedToc: {
    type: 'keyword' },

  type: {
    type: 'keyword' },

  user: {
    type: 'keyword' },

  permissions: PermissionProperties };var _default =


properties;exports.default = _default;