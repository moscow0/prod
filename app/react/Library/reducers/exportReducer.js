"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _redux = require("redux");
var _BasicReducer = _interopRequireDefault(require("../../BasicReducer"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

(0, _redux.combineReducers)({
  exportSearchResultsProcessing: (0, _BasicReducer.default)('exportSearchResultsProcessing', false),
  exportSearchResultsContent: (0, _BasicReducer.default)('exportSearchResultsContent', ''),
  exportSearchResultsFileName: (0, _BasicReducer.default)('exportSearchResultsFileName', '') });exports.default = _default;