"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.normalizeThesaurusLabel = normalizeThesaurusLabel;var _thesauri = _interopRequireDefault(require("../../thesauri"));



var _tsUtils = require("../../../shared/tsUtils");
var _thesauri2 = require("../../thesauri/thesauri");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function normalizeThesaurusLabel(label) {
  const trimmed = label.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : null;
}

const findThesaurusValue = (currentThesauri, normalizedPropValue) => {
  const thesaurusValues = (0, _thesauri2.flatThesaurusValues)(currentThesauri);
  return thesaurusValues.find((tv) => normalizeThesaurusLabel(tv.label) === normalizedPropValue);
};

const select = async (
entityToImport,
property) =>
{
  const currentThesauri = (await _thesauri.default.getById(property.content)) || {};
  const propValue = entityToImport[(0, _tsUtils.ensure)(property.name)];
  const normalizedPropValue = normalizeThesaurusLabel(propValue);

  if (!normalizedPropValue) {
    return null;
  }

  const thesaurusValue = findThesaurusValue(currentThesauri, normalizedPropValue);
  if (thesaurusValue !== null && thesaurusValue !== void 0 && thesaurusValue.id) {
    return [{ value: thesaurusValue.id, label: thesaurusValue.label }];
  }

  return null;
};var _default =

select;exports.default = _default;