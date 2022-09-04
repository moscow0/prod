"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.metadataSelectors = void 0;var _reselect = require("reselect");
var _entityDefaultDocument = require("../../shared/entityDefaultDocument");

var _immutable = _interopRequireDefault(require("immutable"));
var _formater = _interopRequireDefault(require("./helpers/formater"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const indexValues = (t) =>
t.set(
'values',
t.get('values').reduce((indexed, value) => {
  if (value.get('values')) {
    return indexed.merge(indexValues(value).get('values'));
  }
  return indexed.set(value.get('id'), value);
}, new _immutable.default.Map({})));


const indexedThesaurus = (0, _reselect.createSelector)(
(s) => s.thesauris,
(thesaurus) => thesaurus.map((t) => indexValues(t)));


const formatMetadata = (0, _reselect.createSelector)(
(s) => s.templates,
indexedThesaurus,
(s) => s.settings,
(_s, doc, sortProperty, references, options) => ({ doc, sortProperty, references, options }),
(templates, thesauris, settings, { doc, sortProperty, references, options }) => {
  const defaultDoc = (0, _entityDefaultDocument.entityDefaultDocument)(
  doc.documents,
  doc.language,
  settings.
  get('languages').
  find((l) => l.get('default')).
  get('key'));


  if (sortProperty) {
    return _formater.default.prepareMetadataForCard(
    Object.assign(doc, { defaultDoc }),
    templates,
    thesauris,
    sortProperty).
    metadata;
  }

  return _formater.default.prepareMetadata(
  Object.assign(doc, { defaultDoc }),
  templates,
  thesauris,
  references,
  options).
  metadata;
});


const metadataSelectors = {
  formatMetadata,
  indexedThesaurus };exports.metadataSelectors = metadataSelectors;