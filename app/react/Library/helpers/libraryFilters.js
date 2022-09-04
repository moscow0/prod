"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.parseWithAggregations = parseWithAggregations;exports.populateOptions = populateOptions;var _comonProperties = _interopRequireDefault(require("../../../shared/comonProperties"));
var _prioritySortingCriteria = _interopRequireDefault(require("../../utils/prioritySortingCriteria"));
var _publishedStatusFilter = require("./publishedStatusFilter");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}

function getOptions(property, thesauris) {
  const matchingTHesauri = thesauris.find((thesauri) => thesauri._id === property.content);
  return matchingTHesauri ? matchingTHesauri.values : null;
}

function populateOptions(filters, thesauris) {
  return filters.map((property) => {
    if (property.content) {
      return Object.assign(property, { options: getOptions(property, thesauris) });
    }

    if (!property.content && property.type === 'relationship') {
      return Object.assign(property, {
        options: thesauris.
        filter((t) => t.type === 'template').
        reduce((options, thesauri) => options.concat(thesauri.values), []) });

    }

    return property;
  });
}

function URLQueryToState(query, templates, _thesauris, _relationTypes, forcedProps = []) {
  let properties = _comonProperties.default.comonFilters(templates, query.types, forcedProps);
  if (!query.types || !query.types.length) {
    properties = _comonProperties.default.defaultFilters(templates, forcedProps);
  }

  const {
    searchTerm = '',
    filters = {},
    sort = _prioritySortingCriteria.default.get().sort,
    order = _prioritySortingCriteria.default.get().order,
    userSelectedSorting,
    includeUnpublished = false,
    unpublished = false,
    allAggregations = false } =
  query;

  return {
    properties,
    search: {
      searchTerm,
      filters,
      customFilters: query.customFilters,
      sort,
      order,
      userSelectedSorting,
      publishedStatus: (0, _publishedStatusFilter.queryToFilter)(unpublished, includeUnpublished),
      allAggregations } };


}

const normalizeBucket = (bucket) => {
  const normalizedBucket = {
    id: bucket.key,
    value: bucket.key,
    label: bucket.label,
    results: bucket.filtered.doc_count };


  if (bucket.icon) {
    normalizedBucket.icon = bucket.icon;
  }

  if (bucket.values) {
    normalizedBucket.options = bucket.values.map(normalizeBucket);
  }

  if (bucket.key === 'missing') {
    normalizedBucket.noValueKey = true;
  }

  return normalizedBucket;
};

function parseWithAggregations(filters, aggregations, showNoValue = true) {
  return filters.map((_ref) => {let property = _extends({}, _ref);
    const propertyAggregations = aggregations.all[property.name];
    if (propertyAggregations && propertyAggregations.buckets) {
      property.options = propertyAggregations.buckets.
      map(normalizeBucket).
      filter((opt) => opt.results || !showNoValue && opt.value === 'missing');

      property.totalPossibleOptions = propertyAggregations.count;
    }

    return property;
  });
}var _default =

{
  URLQueryToState,
  populateOptions,
  parseWithAggregations };exports.default = _default;