"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ResultsFiltersPanel = void 0;var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");
var _ReactReduxForms = require("../../ReactReduxForms");
var _UI = require("../../UI");

var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _I18N = require("../../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const filters = [
{
  label: 'Threshold',
  model: 'threshold',
  min: 0.3,
  max: 1,
  step: 0.01,
  minLabel: 'Exploration',
  maxLabel: 'Precision' },

{
  label: 'Minimum relevant sentences per document',
  model: 'minRelevantSentences',
  min: 1,
  max: 50,
  step: 1,
  minLabel: '',
  maxLabel: '' }];



const filterValue = (filter, filtersValues) =>
filter.model === 'threshold' ?
`${(filtersValues[filter.model] * 100).toFixed(2)}%` :
filtersValues[filter.model];

const ResultsFiltersPanel = ({ open, filtersValues }) => {
  return /*#__PURE__*/(
    _jsx(_SidePanel.default, { open: open }, void 0, /*#__PURE__*/
    _jsx("div", { className: "sidepanel-body" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "sidepanel-title" }, void 0, (0, _I18N.t)('System', 'Fine tune')), /*#__PURE__*/
    _jsx(_reactReduxForm.Form, { model: "semanticSearch.resultsFilters" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "view" }, void 0,
    filters.map((filter) => /*#__PURE__*/
    _jsx("dl", { className: "metadata-type-text" }, filter.label, /*#__PURE__*/
    _jsx("dt", {}, void 0,
    (0, _I18N.t)('System', filter.label), " ", filterValue(filter, filtersValues)), /*#__PURE__*/

    _jsx("dd", {}, void 0, /*#__PURE__*/
    _jsx(_ReactReduxForms.NumericRangeSlide, {
      delay: 200,
      model: `.${filter.model}`,
      prefix: filter.model,
      min: filter.min,
      max: filter.max,
      step: filter.step,
      minLabel: (0, _I18N.t)('System', filter.minLabel),
      maxLabel: (0, _I18N.t)('System', filter.maxLabel) })))))), /*#__PURE__*/






    _jsx("div", { className: "semantic-search-help" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "alert alert-info alert-vertical" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "info-circle", size: "2x" }), /*#__PURE__*/
    _jsx("p", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "Semantic search overview" }, void 0, "Semantic search is a technique to provide contextual results. Its ability to capture concepts and word associations in human language enables the retrieval of related information such as synonyms, connected categories or entities, etc. .")), /*#__PURE__*/





    _jsx("p", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "Semantic search threshold help" }, void 0, "The threshold determines how close the results match the search concept. Move the slider to the right to narrow down the concept of the search query. The obtained results will be more precise. Move the slider to the left to more broaden the concept and explore related content.")), /*#__PURE__*/






    _jsx("p", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "Semantic search minimum sentences help" }, void 0, "Semantic search is applied to each sentence in a document. Filter the documents by the minimum number of sentences that exceed the threshold.")))))));









};exports.ResultsFiltersPanel = ResultsFiltersPanel;








function mapStateToProps({ semanticSearch }) {
  return {
    open: semanticSearch.selectedDocument.isEmpty(),
    filtersValues: semanticSearch.resultsFilters };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(ResultsFiltersPanel);exports.default = _default;