"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _api = _interopRequireDefault(require("../utils/api"));
var _RequestParams = require("../utils/RequestParams");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  coerceValue(requestParams) {
    const url = 'entities/coerce_value';
    return _api.default.post(url, requestParams).then((response) => response.json);
  },

  get(requestParams = new _RequestParams.RequestParams(), language = '') {
    const params = requestParams.add({
      include:
      requestParams.data && requestParams.data.include ?
      requestParams.data.include.concat(['permissions']) :
      ['permissions'] });

    if (language) _api.default.locale(language);
    return _api.default.get('entities', params).then((response) => response.json.rows);
  },

  countByTemplate(requestParams) {
    const url = 'entities/count_by_template';
    return _api.default.get(url, requestParams).then((response) => response.json);
  },

  async getRawPage(requestParams) {
    const response = await _api.default.get(
    'documents/page',
    requestParams.add({ page: requestParams.data.page || 1 }));

    return response.json.data;
  },

  uploads() {
    const url = 'entities/uploads';
    return _api.default.get(url).then((response) => response.json.rows);
  },

  search(requestParams) {
    const url = 'entities/search';
    return _api.default.get(url, requestParams).then((response) => response.json);
  },

  save(requestParams) {
    return _api.default.post('entities', requestParams).then((response) => response.json);
  },

  denormalize(requestParams) {
    return _api.default.post('entity_denormalize', requestParams).then((response) => response.json);
  },

  multipleUpdate(requestParams) {
    return _api.default.post('entities/multipleupdate', requestParams).then((response) => response.json);
  },

  delete(requestParams) {
    return _api.default.delete('entities', requestParams).then((response) => response.json);
  },

  deleteMultiple(requestParams) {
    return _api.default.post('entities/bulkdelete', requestParams).then((response) => response.json);
  } };exports.default = _default;