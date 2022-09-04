"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.detectLanguage = void 0;var _franc = _interopRequireDefault(require("franc"));
var _languagesList = require("./languagesList");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const detectLanguage = (text, purpose = 'elastic') =>
(0, _languagesList.language)((0, _franc.default)(text), purpose);exports.detectLanguage = detectLanguage;