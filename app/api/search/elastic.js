"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.elasticClient = exports.elastic = void 0;var _elasticsearch = _interopRequireDefault(require("@elastic/elasticsearch"));





var _tenants = require("../tenants");
var _config = require("../config");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



const elasticClient = new _elasticsearch.default.Client({
  nodes: _config.config.elasticsearch_nodes });exports.elasticClient = elasticClient;


const elastic = {
  async search(params, options) {
    return elasticClient.search(_objectSpread(_objectSpread({},
    params), {}, { index: _tenants.tenants.current().indexName }),
    options);

  },

  async delete(params, options) {
    return elasticClient.delete(_objectSpread(_objectSpread({}, params), {}, { index: _tenants.tenants.current().indexName }), options);
  },

  async bulk(params, options) {
    return elasticClient.bulk(_objectSpread(_objectSpread({}, params), {}, { index: _tenants.tenants.current().indexName }), options);
  },

  async deleteByQuery(
  params,
  options)
  {
    return elasticClient.deleteByQuery(_objectSpread(_objectSpread({}, params), {}, { index: _tenants.tenants.current().indexName }), options);
  },

  indices: {
    async putMapping(params, options) {
      return elasticClient.indices.putMapping(_objectSpread(_objectSpread({},
      params), {}, { index: _tenants.tenants.current().indexName }),
      options);

    },

    async getMapping(params, options) {
      return elasticClient.indices.getMapping(_objectSpread(_objectSpread({},
      params), {}, { index: _tenants.tenants.current().indexName }),
      options);

    },

    async delete(params, options) {
      return elasticClient.indices.delete(_objectSpread(_objectSpread({},
      params), {}, { index: _tenants.tenants.current().indexName }),
      options);

    },

    async create(params, options) {
      return elasticClient.indices.create(_objectSpread(_objectSpread({},
      params), {}, { index: _tenants.tenants.current().indexName }),
      options);

    },

    async refresh(params, options) {
      return elasticClient.indices.refresh(_objectSpread(_objectSpread({},
      params), {}, { index: _tenants.tenants.current().indexName }),
      options);

    },

    async validateQuery(
    params,
    options)
    {
      return elasticClient.indices.validateQuery(_objectSpread(_objectSpread({},
      params), {}, { index: _tenants.tenants.current().indexName }),
      options);

    } } };exports.elastic = elastic;