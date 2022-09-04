"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _languages = _interopRequireDefault(require("../../app/shared/languages"));
var _base_properties = _interopRequireDefault(require("./base_properties"));
var _settings = _interopRequireDefault(require("./settings"));
var _dynamic_templates = _interopRequireDefault(require("./dynamic_templates"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const config = {
  settings: _settings.default,
  mappings: {
    dynamic_templates: _dynamic_templates.default,
    properties: _base_properties.default } };



_languages.default.getAll().forEach((language) => {
  config.settings.analysis.filter[`${language}_stop`] = {
    type: 'stop',
    stopwords: `_${language}_` };


  const filters = [];
  if (language === 'arabic') {
    filters.push('arabic_normalization');
  }
  if (language === 'persian') {
    filters.push('arabic_normalization');
    filters.push('persian_normalization');
  }
  if (language !== 'persian' && language !== 'thai' && language !== 'cjk') {
    config.settings.analysis.filter[`${language}_stemmer`] = {
      type: 'stemmer',
      language };

    filters.push(`${language}_stemmer`);
  }

  config.settings.analysis.analyzer[`stop_${language}`] = {
    type: 'custom',
    tokenizer: 'standard',
    filter: ['lowercase', 'asciifolding', `${language}_stop`].concat(filters),
    char_filter: ['remove_annotation'] };


  config.settings.analysis.analyzer[`fulltext_${language}`] = {
    type: 'custom',
    tokenizer: 'standard',
    filter: ['lowercase', 'asciifolding'].concat(filters),
    char_filter: ['remove_annotation'] };


  const mapping = {};
  mapping[`fullText_${language}`] = {
    match: `fullText_${language}`,
    match_mapping_type: 'string',
    mapping: {
      type: 'text',
      index: true,
      analyzer: `fulltext_${language}`,
      search_analyzer: `stop_${language}`,
      search_quote_analyzer: `fulltext_${language}`,
      term_vector: 'with_positions_offsets' } };



  config.mappings.dynamic_templates.unshift(mapping);
});var _default =

config;exports.default = _default;