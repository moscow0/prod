"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var Cookie = _interopRequireWildcard(require("tiny-cookie"));
var _utils = require("../utils");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const languageInLanguages = (languages, locale) => Boolean(languages.find((l) => l.key === locale));
const getURLLocale = (locale, languages = []) =>
languageInLanguages(languages, locale) ? locale : null;
const getCookieLocale = (cookie, languages) =>
cookie.locale && languageInLanguages(languages, cookie.locale) ? cookie.locale : null;
const getDefaultLocale = (languages) => (languages.find((language) => language.default) || {}).key;

const I18NUtils = {
  getLocale(urlLanguage, languages, cookie = {}) {
    return (
      getURLLocale(urlLanguage, languages) ||
      getCookieLocale(cookie, languages) ||
      getDefaultLocale(languages));

  },

  saveLocale: (locale) => {
    if (_utils.isClient) {
      Cookie.set('locale', locale, { expires: 365 * 10 });
    }
  } };var _default =


I18NUtils;exports.default = _default;