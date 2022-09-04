"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ocrStatusTips = void 0;var _I18N = require("../../I18N");

const ocrStatusTips = {
  noOcr: () => (0, _I18N.t)('System', 'OCR button tip', null, false),
  unsupportedLang: (language) => {
    let tip = "The document's language is not supported.";
    if (language === 'other') tip = 'Please select a language for this document';
    return (0, _I18N.t)('System', tip, null, false);
  },
  cantProcess: (time) => `${(0, _I18N.t)('System', 'OCR error tip', null, false)}: ${time}`,
  lastUpdated: (time) => `${(0, _I18N.t)('System', 'Last updated', null, false)}: ${time}` };exports.ocrStatusTips = ocrStatusTips;