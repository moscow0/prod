"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getPageAssets = void 0;var _risonNode = _interopRequireDefault(require("rison-node"));
var _lodash = require("lodash");
var _SearchAPI = _interopRequireDefault(require("../../Search/SearchAPI"));
var _Markdown = require("../../Markdown");

var _PagesAPI = _interopRequireDefault(require("../PagesAPI"));
var _pageItemLists = _interopRequireDefault(require("./pageItemLists"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}










const buildQuery = (sanitizedParams) => {
  const queryDefault = { filters: {}, types: [] };
  if (sanitizedParams) {
    const query = _risonNode.default.decode(sanitizedParams.replace('?q=', '') || '()');
    if (typeof query !== 'object') {
      return queryDefault;
    }
    return query;
  }
  return queryDefault;
};

const prepareLists = (content, requestParams) => {
  const listsData = _pageItemLists.default.generate(content);

  listsData.searchs = Promise.all(
  listsData.params.map((params, index) => {
    const sanitizedParams = params ? decodeURI(params) : '';

    const query = buildQuery(sanitizedParams);

    query.limit = listsData.options[index].limit ? String(listsData.options[index].limit) : '6';
    return _SearchAPI.default.search(requestParams.set(query));
  }));


  return listsData;
};

const replaceDynamicProperties = (pageContent, datasets) => {
  if (!pageContent || !datasets || !datasets.entityData && !datasets.template) {
    return { content: pageContent, errors: [] };
  }

  const parsableDatasets = {
    entity: datasets.entityData,
    template: datasets.template };


  const errors = [];
  const content = pageContent.replace(/\$\{((entity.|template.)[^}^\s]*)\}/g, (match, p) => {
    switch (true) {
      case /entity.metadata.\w*$/.test(p):
        return (0, _lodash.get)(parsableDatasets, `${p}[0].value`);

      case /entity.metadata.\w*.(value|displayValue)$/.test(p):{
          const path = p.split('.');
          const pathEnd = path.pop();
          return (0, _lodash.get)(parsableDatasets, `${path.join('.')}[0].${pathEnd}`);
        }

      case /entity.metadata.\w*\[\d+]$/.test(p):
        return (0, _lodash.get)(parsableDatasets, `${p}.value`);

      case (0, _lodash.has)(parsableDatasets, p):
        return (0, _lodash.get)(parsableDatasets, p);

      default:
        errors.push(match);
        return match;}

  });
  return { content, errors };
};

const getPageAssets = async (
requestParams,
additionalDatasets,
localDatasets) =>
{var _page$metadata;
  const page = await _PagesAPI.default.getById(requestParams);

  const { content, errors } = replaceDynamicProperties((_page$metadata = page.metadata) === null || _page$metadata === void 0 ? void 0 : _page$metadata.content, localDatasets);
  page.metadata.content = content;

  const listsData = prepareLists(page.metadata.content, requestParams);

  const dataSets = _Markdown.markdownDatasets.fetch(page.metadata.content, requestParams.onlyHeaders(), {
    additionalDatasets });


  const [pageView, searchParams, searchOptions, datasets, listSearchs] = await Promise.all([
  page,
  listsData.params,
  listsData.options,
  dataSets,
  listsData.searchs]);

  pageView.scriptRendered = false;

  const itemLists = searchParams.map((p, index) => ({
    params: p,
    items: listSearchs[index].rows,
    options: searchOptions[index] }));


  const failedExpressions = (0, _lodash.uniq)(errors).join('\n');
  return _objectSpread({
    pageView,
    itemLists,
    datasets: _objectSpread(_objectSpread({}, datasets), localDatasets) },
  failedExpressions.length && {
    errors: `The following expressions are not valid properties:\n ${failedExpressions}` });


};exports.getPageAssets = getPageAssets;