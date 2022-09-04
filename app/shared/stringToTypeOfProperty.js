"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.stringToTypeOfProperty = void 0;var _date = _interopRequireDefault(require("../api/utils/date"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const stringToTypeOfProperty = (
text,
propertyType,
language) =>
{
  if (!text) return text;

  const trimmedText = text.trim();
  switch (propertyType) {
    case 'numeric':
      return parseFloat(trimmedText) || null;
    case 'date':
      return _date.default.dateToSeconds(trimmedText, language);
    default:
      return trimmedText;}

};exports.stringToTypeOfProperty = stringToTypeOfProperty;