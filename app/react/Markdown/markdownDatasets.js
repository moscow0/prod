"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Parser = _interopRequireDefault(require("htmlparser2/lib/Parser"));
var _qs = _interopRequireDefault(require("qs"));
var _risonNode = _interopRequireDefault(require("rison-node"));
var _big = _interopRequireDefault(require("big.js"));

var _SearchAPI = _interopRequireDefault(require("../Search/SearchAPI"));
var _api = _interopRequireDefault(require("../utils/api"));
var _EntitiesAPI = _interopRequireDefault(require("../Entities/EntitiesAPI"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const conformUrl = ({ url = '', geolocation = false }) => {
  const { q } = _qs.default.parse(url.substring(url.indexOf('?')), { ignoreQueryPrefix: true });

  if (!q) {
    const defaultValue = geolocation ?
    { allAggregations: true, limit: 0, geolocation: true } :
    { allAggregations: true, limit: 0 };

    return defaultValue;
  }

  const params = _risonNode.default.decode(q);
  params.limit = 0;

  if (geolocation) {
    params.geolocation = true;
  }

  return params;
};

const conformValues = (attribs) => attribs.entity ? attribs : conformUrl(attribs);

const parseDatasets = (markdown) => {
  const result = {};
  const parser = new _Parser.default(
  {
    onopentag(name, attribs) {
      if (name === 'dataset') {
        result[attribs.name || 'default'] = conformValues(attribs);
      }
      if (name === 'query') {
        result[attribs.name || 'default'] = { url: attribs.url, query: true };
      }
    } },

  { decodeEntities: true });


  parser.parseComplete(markdown);
  return result;
};

const requestDatasets = (datasets, requestParams) =>
Promise.all(
Object.keys(datasets).map((name) => {
  if (datasets[name].query) {
    return _api.default.
    get(datasets[name].url, requestParams).
    then((data) => ({ data: data.json, name, params: datasets[name] }));
  }
  const apiAction = datasets[name].entity ? _EntitiesAPI.default.get : _SearchAPI.default.search;
  const params = datasets[name].entity ? { sharedId: datasets[name].entity } : datasets[name];
  const postAction = datasets[name].entity ? (d) => d[0] : (d) => d;
  return apiAction(requestParams.set(params)).
  then(postAction).
  then((data) => ({ data, name, params: datasets[name] }));
}));


const conformDatasets = (sets) =>
sets.reduce((memo, set) => {
  const data = set.params.extractFirstRow ? set.data.rows[0] : set.data;
  return _objectSpread(_objectSpread({}, memo), {}, { [set.name]: data });
}, {});

const getAggregations = (state, { property, dataset = 'default' }) => {
  const data = state.page.datasets.get(dataset);
  return !data ? undefined : data.getIn(['aggregations', 'all', property, 'buckets']);
};

const addValues = (aggregations, values) => {
  let result = new _big.default(0);
  values.forEach((key) => {
    const value = aggregations.find((bucket) => bucket.get('key') === key);
    const filteredValue = value ? value.getIn(['filtered', 'doc_count']) : 0;
    result = result.plus(filteredValue || 0);
  });
  return Number(result);
};var _default =

{
  async fetch(markdown, requestParams, { additionalDatasets = {} } = {}) {
    const datasets = parseDatasets(markdown);
    const extendedDatsets = _objectSpread(_objectSpread({}, datasets), additionalDatasets);
    return requestDatasets(extendedDatsets, requestParams).then(conformDatasets);
  },

  getRows(state, { dataset = 'default' }) {
    const data = state.page.datasets.get(dataset);
    if (!data) {
      return undefined;
    }
    return data.get('rows');
  },

  getAggregations,

  getAggregation(state, { uniqueValues, property, value, dataset = 'default' }) {
    const aggregations = getAggregations(state, { property, dataset });
    if (!aggregations) {
      return undefined;
    }

    if (uniqueValues) {
      return aggregations.filter((a) => a.getIn(['filtered', 'doc_count']) !== 0).size;
    }

    const values = value ? value.split(',') : [''];
    return addValues(aggregations, values);
  },

  getMetadataValue(state, { property, dataset = 'default' }) {
    const data = state.page.datasets.get(dataset);
    const propertyExists = data && data.hasIn(['metadata', property]);
    const mos = propertyExists ? data.getIn(['metadata', property]).toJS() : [];
    return mos && mos.length && mos[0].value ? Number(mos[0].value) : undefined;
  } };exports.default = _default;