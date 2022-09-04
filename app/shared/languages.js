"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _languagesList = require("./languagesList");var _default =

{
  get: _languagesList.language,
  data: Object.keys(_languagesList.elasticLanguages).map((k) => _languagesList.elasticLanguages[k]),
  getAll: (purpose = 'elastic') => {
    const unique = (v, i, a) => a.indexOf(v) === i;
    const notNull = (v) => Boolean(v);
    return Object.keys(_languagesList.elasticLanguages).
    map((k) => _languagesList.elasticLanguages[k][purpose]).
    filter(unique).
    filter(notNull);
  } };exports.default = _default;