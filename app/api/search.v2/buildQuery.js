"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.buildQuery = void 0;

var _queryHelpers = require("./queryHelpers");
var _permissionsFilters = require("./permissionsFilters");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



const isRange = (range) =>
typeof range === 'object' && (range.hasOwnProperty('from') || range.hasOwnProperty('to'));

const isCompound = (filterValue) =>
typeof filterValue === 'object' && filterValue.hasOwnProperty('values');

const getFilterValue = (filterValue) => {
  if (isCompound(filterValue)) {var _filterValue$values;
    const operator = filterValue.operator === 'AND' ? ' + ' : ' | ';
    return (_filterValue$values = filterValue.values) === null || _filterValue$values === void 0 ? void 0 : _filterValue$values.join(operator);
  }

  return filterValue;
};

const buildPropertyFilter = (query) => (key) => {var _query$filter;
  const filterValue = (_query$filter = query.filter) === null || _query$filter === void 0 ? void 0 : _query$filter[key];
  if (isRange(filterValue)) {
    return {
      range: { [`${key}.value`]: { gte: filterValue.from, lte: filterValue.to } } };

  }

  return {
    simple_query_string: {
      query: getFilterValue(filterValue),
      fields: [`${key}.value`] } };


};

const metadataFilters = (query) =>
Object.keys(query.filter || {}).
filter((filter) => filter.startsWith('metadata.')).
map(buildPropertyFilter(query));

const fullTextSearch = (
searchString,
query,
searchMethod) =>

searchString && searchMethod ?
[
{
  has_child: {
    type: 'fullText',
    score_mode: 'max',
    inner_hits: _objectSpread({
      _source: false },
    (0, _queryHelpers.snippetsHighlight)(query)),

    query: {
      [searchMethod]: {
        query: searchString,
        fields: ['fullText_*'] } } } }] :





[];

const languageFilter = (language) => [{ term: { language } }];

const textSearch = (searchString, searchMethod) =>
searchString && searchMethod ? [{ [searchMethod]: { query: searchString } }] : [];

const termsFilter = (query, propertyName) => {var _query$filter2;return (
    (_query$filter2 = query.filter) !== null && _query$filter2 !== void 0 && _query$filter2[propertyName] ? [{ terms: { [propertyName]: [query.filter[propertyName]] } }] : []);};

const defaultFields = ['title', 'template', 'sharedId'];

const buildSortQuery = (query) => {
  if (!query.sort) {
    return [];
  }

  const isDescending = query.sort.startsWith('-');
  const order = isDescending ? 'desc' : 'asc';
  const sortProp = isDescending ? query.sort.substring(1) : query.sort;

  if (sortProp.startsWith('metadata.')) {
    const labelPriority = { [`${sortProp}.label.sort`]: { unmapped_type: 'keyword', order } };
    const valuePriority = { [`${sortProp}.value.sort`]: { order } };
    return [labelPriority, valuePriority];
  }

  return [{ [`${sortProp}.sort`]: order }];
};

const buildQuery = async (query, language) => {var _searchParams$fullTex, _searchParams$fullTex2, _searchParams$search, _searchParams$search2, _query$page, _query$page2;
  const searchParams = await (0, _queryHelpers.extractSearchParams)(query);

  return {
    _source: {
      includes: query.fields || defaultFields },


    query: {
      bool: {
        filter: [
        ...metadataFilters(query),
        ...(0, _permissionsFilters.permissionsFilters)(query),
        ...languageFilter(language),
        ...termsFilter(query, 'template'),
        ...termsFilter(query, 'sharedId')],

        must: [
        {
          bool: {
            should: [
            ...fullTextSearch((_searchParams$fullTex =
            searchParams.fullText) === null || _searchParams$fullTex === void 0 ? void 0 : _searchParams$fullTex.string,
            query, (_searchParams$fullTex2 =
            searchParams.fullText) === null || _searchParams$fullTex2 === void 0 ? void 0 : _searchParams$fullTex2.method),

            ...textSearch((_searchParams$search = searchParams.search) === null || _searchParams$search === void 0 ? void 0 : _searchParams$search.string, (_searchParams$search2 = searchParams.search) === null || _searchParams$search2 === void 0 ? void 0 : _searchParams$search2.method)] } }] } },






    highlight: {
      order: 'score',
      pre_tags: ['<b>'],
      post_tags: ['</b>'],
      encoder: 'html',
      number_of_fragments: 9999,
      type: 'fvh',
      fragment_size: 300,
      fragmenter: 'span',
      fields: {
        title: {},
        'metadata.*': {} } },


    sort: buildSortQuery(query),
    from: ((_query$page = query.page) === null || _query$page === void 0 ? void 0 : _query$page.offset) || 0,
    size: ((_query$page2 = query.page) === null || _query$page2 === void 0 ? void 0 : _query$page2.limit) || 30 };

};exports.buildQuery = buildQuery;