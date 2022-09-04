"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _api = _interopRequireDefault(require("../utils/api"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /** @format */var _default =











{
  async setSecret(requestParams) {
    const response = await _api.default.post('auth2fa-secret', requestParams);
    return response.json;
  },

  async enable(requestParams) {
    const response = await _api.default.post('auth2fa-enable', requestParams);
    return response.json;
  },

  async reset2fa(requestParams) {
    const response = await _api.default.post('auth2fa-reset', requestParams);
    return response.json;
  } };exports.default = _default;