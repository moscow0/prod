"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.extractSequence = extractSequence;
var _templates = _interopRequireDefault(require("../templates"));
var _propertyTypes = require("../../shared/propertyTypes");

var _tsUtils = require("../../shared/tsUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

async function extractSequence(e) {
  const template = await _templates.default.getById((0, _tsUtils.ensure)(e.template));
  const parts = e.title ? [e.title] : [];
  if (template && template.properties) {
    parts.push(
    ...template.properties.reduce((prev, prop) => {
      if (
      !prop ||
      !prop.name ||
      !e.metadata ||
      prop.type !== _propertyTypes.propertyTypes.markdown && prop.type !== _propertyTypes.propertyTypes.text)
      {
        return prev;
      }
      const values = e.metadata[prop.name];
      if (
      !values ||
      values.length !== 1 ||
      !values[0].value ||
      typeof values[0].value !== 'string')
      {
        return prev;
      }
      return prev.concat([values[0].value]);
    }, []));

  }
  return parts.join(' ');
}