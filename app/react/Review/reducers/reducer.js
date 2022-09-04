"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _redux = require("redux");
var _BasicReducer = _interopRequireDefault(require("../../BasicReducer"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /** @format */var _default =

(0, _redux.combineReducers)({
  state: (0, _BasicReducer.default)('oneUpReview.state', {}) });exports.default = _default;