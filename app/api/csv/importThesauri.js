"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.thesauriFromStream = thesauriFromStream;var _utils = require("../utils");
var _csvtojson = _interopRequireDefault(require("csvtojson"));
var _languagesList = require("../../shared/languagesList");
var _tsUtils = require("../../shared/tsUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








const buildThesauriValues = (rows, languageLabel) => {
  const result = [];
  rows.forEach((row) => {
    const { value: valueForLanguage, nested } = row[languageLabel];
    const newThesauriValue = { label: valueForLanguage };

    if (!nested) {
      result.push(newThesauriValue);
    } else {var _lastValue$values;
      const lastValue = result[result.length - 1];
      lastValue.values = (_lastValue$values = lastValue.values) !== null && _lastValue$values !== void 0 ? _lastValue$values : [];
      lastValue.values.push(newThesauriValue);
    }
  });
  return result;
};

const buildTranslation = (
rows,
languagesToTranslate,
languageLabel) =>

Object.fromEntries(
Object.keys(languagesToTranslate).map((lang) => [
lang,
Object.fromEntries(
rows.map((row) => [row[languageLabel].value, row[languagesToTranslate[lang]].value]))]));




const parseValue = (value) => {
  const processedValue = [...value];
  let nested = false;

  while (processedValue.length > 0 && !nested) {
    const firstChar = processedValue.shift();

    if (firstChar === '-') {
      nested = true;
    }
    if (firstChar !== ' ') {
      break;
    }
  }

  return {
    nested,
    value: nested ? processedValue.join('').trim() : value.trim() };

};

const parseRows = (rows) =>
rows.map((row) =>
Object.keys(row).reduce(
(newRow, lang) => _objectSpread(_objectSpread({}, newRow), {}, { [lang]: parseValue(row[lang]) }),
{}));



const validate = (rows) => {
  rows.forEach((row, index) => {
    const [firstValue, ...restOfTheValues] = Object.values(row);
    if (index === 0 && firstValue.nested) {
      throw (0, _utils.createError)('Invalid csv: nested value need to be under a non-nested value', 400);
    }

    const allEqual = restOfTheValues.every((value) => value.nested === firstValue.nested);
    if (!allEqual) {
      throw (0, _utils.createError)(
      'Invalid csv: all the values for a row must be either nested or non-nested',
      400);

    }
  });
};

const getLanguagesToTranslate = (iso6391Languages, rows) =>
_languagesList.availableLanguages.
filter((l) => iso6391Languages.includes(l.key) && Object.keys(rows[0]).includes(l.label)).
reduce((map, lang) => _objectSpread(_objectSpread({}, map), {}, { [lang.key]: lang.label }), {});

async function thesauriFromStream(
readStream,
language,
iso6391Languages)
{
  const rows = await (0, _csvtojson.default)({ delimiter: [',', ';'] }).fromStream(readStream);
  const parsedRows = parseRows(rows);
  validate(parsedRows);

  const languageLabel = (0, _tsUtils.ensure)(
  _languagesList.availableLanguages.find((l) => l.key === language)).
  label;

  const languagesToTranslate = getLanguagesToTranslate(iso6391Languages, parsedRows);

  return {
    thesauriValues: buildThesauriValues(parsedRows, languageLabel),
    thesauriTranslations: buildTranslation(parsedRows, languagesToTranslate, languageLabel) };

}