"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _api = _interopRequireDefault(require("../utils/api"));
var _RequestParams = require("../utils/RequestParams");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  countByTemplate(requestParams) {
    const url = 'search/count_by_template';
    return _api.default.get(url, requestParams).then((response) => response.json);
  },

  searchSnippets(requestParams) {
    return _api.default.get('v2/entities', requestParams).then((response) => response.json);
  },

  search(requestParams = new _RequestParams.RequestParams()) {
    const params = requestParams.add({
      include:
      requestParams.data && requestParams.data.include ?
      requestParams.data.include.concat(['permissions']) :
      ['permissions'] });

    return _api.default.get('search', params).then((response) => response.json);
  },

  list(requestParams) {
    const url = 'search/list';
    return _api.default.get(url, requestParams).then((response) => response.json.rows);
  },

  getSuggestions(requestParams) {
    const url = 'search/lookup';
    return _api.default.get(url, requestParams).then((response) => response.json);
  },

  getAggregationSuggestions(requestParams) {
    const url = 'search/lookupaggregation';
    return _api.default.get(url, requestParams).then((response) => response.json);
  } };exports.default = _default;