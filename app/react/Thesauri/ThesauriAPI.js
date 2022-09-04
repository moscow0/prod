"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _api = _interopRequireDefault(require("../utils/api"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  get(requestParams) {
    const url = 'thesauris';
    return _api.default.get(url, requestParams).then((response) => response.json.rows);
  },

  getThesauri(requestParams) {
    const url = 'dictionaries';
    return _api.default.get(url, requestParams).then((response) => response.json.rows);
  },

  getModelStatus(requestParams) {
    return _api.default.get('models', requestParams).then((response) => response.json);
  },

  getModelTrainStatus(requestParams) {
    return _api.default.get('models/train', requestParams).then((response) => response.json);
  },

  trainModel(requestParams) {
    return _api.default.post('models/train', requestParams).then((response) => response.json);
  },

  save(requestParams) {
    return _api.default.post('thesauris', requestParams).then((response) => response.json);
  },

  delete(requestParams) {
    return _api.default.delete('thesauris', requestParams).then((response) => response.json);
  } };exports.default = _default;