"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));
var _I18N = require("../../I18N");
var _colorScheme = _interopRequireDefault(require("./colorScheme"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const compareStrings = (a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase());
const compareDocCount = (a, b) => b.filtered.doc_count - a.filtered.doc_count;

const sortValues = (values) => {
  values.sort((a, b) => {
    if (a.others || b.others) {
      return false;
    }

    if (a.results === b.results) {
      return compareStrings(a, b);
    }

    return b.results - a.results;
  });

  return values;
};

const sortAndOrder = (data, method, order, reverseCondition) => {
  data.sort(method);
  return order === reverseCondition ? data.reverse() : data;
};

const sortData = (data, { by = 'result', order } = {}) => {
  if (by === 'result') {
    return sortAndOrder(data, compareDocCount, order, 'asc');
  }

  if (by === 'label') {
    return sortAndOrder(data, compareStrings, order, 'desc');
  }

  return data;
};

const limitMaxCategories = (sortedCategories, maxCategories, aggregateOthers) => {
  const categories = sortedCategories.slice(0, Number(maxCategories));

  if (aggregateOthers) {
    categories[categories.length] = sortedCategories.slice(Number(maxCategories)).reduce(
    (memo, category) => {
      // eslint-disable-next-line
      memo.filtered.doc_count += category.filtered.doc_count;
      return memo;
    },
    { others: true, key: 'others', filtered: { doc_count: 0 } });

  }

  return categories;
};

const determineRelevantCategories = (data, formatOptions) => {
  const { excludeZero, pluckCategories = [] } = formatOptions;
  let relevantCategories = data.filter((i) => i.key !== 'missing' && i.key !== 'any');

  if (excludeZero) {
    relevantCategories = relevantCategories.filter((i) => i.filtered.doc_count !== 0);
  }

  if (pluckCategories.length) {
    relevantCategories = pluckCategories.reduce((results, category) => {
      const matchingCategory = relevantCategories.find((c) => c.label === category);
      if (matchingCategory) {
        results.push(matchingCategory);
      }
      return results;
    }, []);
  }

  return relevantCategories;
};

const formatPayload = (data) =>
data.map((item, index) => ({
  value: item.name,
  type: 'rect',
  color: _colorScheme.default[index % _colorScheme.default.length],
  formatter: () => /*#__PURE__*/_jsx("span", { style: { color: '#333' } }, void 0, item.name) }));


const formatForNestedValues = (category, options) => {
  const { labelsMap = {}, excludeZero, context } = options;
  const flatValues = category.values.map((value) => ({
    id: value.key,
    label: labelsMap[value.label] || (0, _I18N.t)(context, value.label, null, false),
    results: value.filtered.doc_count,
    parent: labelsMap[category.label] || (0, _I18N.t)(context, category.label, null, false) }));

  if (excludeZero) {
    return flatValues.filter((value) => value.results !== 0);
  }
  return flatValues;
};

const formatDataForChart = (data, _property, formatOptions) => {
  const { maxCategories, aggregateOthers = false, labelsMap = {}, sort, context } = formatOptions;

  const relevantCategories = determineRelevantCategories(data.toJS(), formatOptions);
  const sortedCategories = sortData(relevantCategories, sort);

  let categories = sortedCategories;

  if (Number(maxCategories)) {
    categories = limitMaxCategories(sortedCategories, maxCategories, aggregateOthers);
  }

  return [].concat(
  ...categories.
  map((item) => {
    if (item.others && item.filtered.doc_count) {
      return { others: true, id: item.key, label: 'others', results: item.filtered.doc_count };
    }

    if (!item.label) {
      return null;
    }

    if (item.values && formatOptions.scatter) {
      return formatForNestedValues(item, formatOptions);
    }

    return {
      id: item.key,
      label: labelsMap[item.label] || (0, _I18N.t)(context, item.label, null, false),
      results: item.filtered.doc_count };

  }).
  filter((i) => !!i));

};var _default =

{
  sortValues,
  formatPayload,
  formatDataForChart };exports.default = _default;