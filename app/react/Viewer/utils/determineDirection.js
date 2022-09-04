"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _languagesList = require("../../../shared/languagesList");var _default =




({ language }) => {
  const languageKey = (0, _languagesList.language)(language, 'ISO639_1');
  const laguageData = _languagesList.availableLanguages.find((l) => l.key === languageKey) || {};
  return `force-${laguageData.rtl ? 'rtl' : 'ltr'}`;
};exports.default = _default;