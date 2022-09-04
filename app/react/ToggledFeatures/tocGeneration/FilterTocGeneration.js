"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.FilterTocGeneration = void 0;var _react = _interopRequireDefault(require("react"));

var _FeatureToggle = require("../../components/Elements/FeatureToggle");
var _SelectFilter = _interopRequireDefault(require("../../Library/components/SelectFilter"));
var _FormGroup = _interopRequireDefault(require("../../DocumentForm/components/FormGroup"));
var _I18N = require("../../I18N");
var _Auth = require("../../Auth");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}






const filteredAggregation = (aggregations, key) => {var _aggregations$all, _aggregations$all$gen;
  const bucket = ((aggregations === null || aggregations === void 0 ? void 0 : (_aggregations$all = aggregations.all) === null || _aggregations$all === void 0 ? void 0 : (_aggregations$all$gen = _aggregations$all.generatedToc) === null || _aggregations$all$gen === void 0 ? void 0 : _aggregations$all$gen.buckets) || []).find((a) => a.key === key) || {
    filtered: { doc_count: 0 } };

  return bucket.filtered.doc_count;
};

const options = (aggregations = { all: {} }) => [
{
  label: (0, _I18N.t)('System', 'Automatically generated'),
  value: true,
  results: filteredAggregation(aggregations, 'true') },

{
  label: (0, _I18N.t)('System', 'Reviewed'),
  value: false,
  results: filteredAggregation(aggregations, 'false') }];



const FilterTocGeneration = ({ onChange, aggregations }) => /*#__PURE__*/
_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_FeatureToggle.FeatureToggle, { feature: "tocGeneration" }, void 0, /*#__PURE__*/
_jsx(_FormGroup.default, { className: "admin-filter" }, "generatedToc", /*#__PURE__*/
_jsx(_SelectFilter.default, {
  model: ".customFilters.generatedToc",
  prefix: "generatedToc",
  label: (0, _I18N.t)('System', 'Automatic Table of Contents'),
  onChange: onChange,
  options: options(aggregations),
  showBoolSwitch: false }))));exports.FilterTocGeneration = FilterTocGeneration;