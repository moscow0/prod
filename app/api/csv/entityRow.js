"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.toSafeName = exports.extractEntity = void 0;var _templates = require("../templates");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









const toSafeName = (row, newNameGeneration = false) =>
Object.keys(row).reduce(
(translatedObject, key) => _objectSpread(_objectSpread({},
translatedObject), {}, {
  [_templates.templateUtils.safeName(key, newNameGeneration)]: row[key] }),

{});exports.toSafeName = toSafeName;


const notTranslated = (languages) => (key) =>
!key.match(new RegExp(`__(${languages.join('|')})$`));

const languagesTranslated = (row, availableLanguages, currentLanguage) =>
availableLanguages.
filter((languageCode) =>
Object.keys(row).
filter((key) => key.match(new RegExp(`__${languageCode}$`))).
map((key) => row[key]).
join('').
trim()).

concat([currentLanguage]);

const extractEntity = (
row,
availableLanguages,
currentLanguage,
newNameGeneration = false) =>
{
  const safeNamed = toSafeName(row, newNameGeneration);

  const baseEntity = Object.keys(safeNamed).
  filter(notTranslated(availableLanguages)).
  reduce((entity, key) => {
    entity[key] = safeNamed[key]; //eslint-disable-line no-param-reassign
    return entity;
  }, {});

  const rawEntities = languagesTranslated(safeNamed, availableLanguages, currentLanguage).map(
  (languageCode) =>
  Object.keys(safeNamed).
  filter((key) => key.match(new RegExp(`__${languageCode}$`))).
  reduce(
  (entity, key) => {
    entity[key.split(`__${languageCode}`)[0]] = safeNamed[key]; //eslint-disable-line no-param-reassign
    return entity;
  }, _objectSpread(_objectSpread({},
  baseEntity), {}, { language: languageCode })));



  return {
    rawEntity: rawEntities.find((e) => e.language === currentLanguage),
    rawTranslations: rawEntities.filter((e) => e.language !== currentLanguage) };

};exports.extractEntity = extractEntity;