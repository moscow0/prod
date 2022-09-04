"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = require("express");
var _settings = _interopRequireDefault(require("../settings/settings"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =










async (req, _res, next) => {
  try {
    let lang = req.get('content-language');
    if (!lang && req.cookies) {
      lang = req.cookies.locale;
    }
    if (!lang && req.get('accept-language')) {
      [lang] = req.get('accept-language').split('-');
    }

    const { languages = [] } = await _settings.default.get();

    //@ts-ignore
    req.language = languages.find((l) => l.key === lang) ? lang : languages.find((l) => l.default).key;

    next();
  } catch (e) {
    next(e);
  }
};exports.default = _default;