"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.normalizeMultiselectLabels = normalizeMultiselectLabels;exports.splitMultiselectLabels = splitMultiselectLabels;var _thesauri = _interopRequireDefault(require("../../thesauri"));



var _tsUtils = require("../../../shared/tsUtils");

var _thesauri2 = require("../../thesauri/thesauri");
var _select = require("./select");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function labelNotNull(label) {
  return label !== null;
}

function splitMultiselectLabels(labelString) {
  const labels = labelString.
  split('|').
  map((l) => l.trim()).
  filter((l) => l.length > 0);
  const result = {};
  labels.forEach((label) => {
    const normalizedLabel = (0, _select.normalizeThesaurusLabel)(label);
    if (labelNotNull(normalizedLabel) && !result.hasOwnProperty(normalizedLabel)) {
      result[normalizedLabel] = label;
    }
  });
  return result;
}

function normalizeMultiselectLabels(labelArray) {
  const normalizedLabels = labelArray.map((l) => (0, _select.normalizeThesaurusLabel)(l)).filter(labelNotNull);
  return Array.from(new Set(normalizedLabels));
}

const multiselect = async (
entityToImport,
property) =>
{
  const currentThesauri = (await _thesauri.default.getById(property.content)) || {};

  const values = splitMultiselectLabels(entityToImport[(0, _tsUtils.ensure)(property.name)]);
  const thesaurusValues = (0, _thesauri2.flatThesaurusValues)(currentThesauri);

  return Object.keys(values).
  map((key) => thesaurusValues.find((tv) => (0, _select.normalizeThesaurusLabel)(tv.label) === key)).
  map((tv) => tv).
  map((tv) => ({ value: (0, _tsUtils.ensure)(tv === null || tv === void 0 ? void 0 : tv.id), label: (0, _tsUtils.ensure)(tv === null || tv === void 0 ? void 0 : tv.label) }));
};var _default =

multiselect;exports.default = _default;