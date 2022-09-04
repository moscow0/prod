"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.SearchBar = void 0;exports.mapStateToProps = mapStateToProps;var _reactReduxForm = require("react-redux-form");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _UI = require("../../UI");
var _libraryActions = require("../actions/libraryActions");
var _I18N = require("../../I18N");
var _Multireducer = require("../../Multireducer");
var _ModalTips = _interopRequireDefault(require("../../App/ModalTips"));
var _SearchTipsContent = require("../../App/SearchTipsContent");
var _actions = require("../../SemanticSearch/actions/actions");
var _FeatureToggleSemanticSearch = require("../../SemanticSearch/components/FeatureToggleSemanticSearch");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// eslint-disable-next-line import/exports-last
class SearchBar extends _react.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.submitSemanticSearch = this.submitSemanticSearch.bind(this);
  }

  resetSearch() {
    this.props.change(`${this.props.storeKey}.search.searchTerm`, '');
    const search = _objectSpread({}, this.props.search);
    search.searchTerm = '';
    this.props.searchDocuments({ search }, this.props.storeKey);
  }

  submitSemanticSearch() {
    this.props.semanticSearch(this.props.search);
  }

  submitSearch() {
    const search = _objectSpread({}, this.props.search);
    this.props.searchDocuments({ search }, this.props.storeKey);
  }

  search(search) {
    this.props.searchDocuments({ search }, this.props.storeKey);
  }

  render() {
    const { search, storeKey } = this.props;
    const model = `${storeKey}.search`;
    return /*#__PURE__*/(
      _jsx("div", { className: "search-box" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Form, { model: model, onSubmit: this.search, autoComplete: "off" }, void 0, /*#__PURE__*/
      _jsx("div", { className: `input-group${search.searchTerm ? ' is-active' : ''}` }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: ".searchTerm" }, void 0, /*#__PURE__*/
      _jsx("input", {
        type: "text",
        placeholder: (0, _I18N.t)('System', 'Search', null, false),
        "aria-label": (0, _I18N.t)('System', 'Search text description', null, false),
        className: "form-control",
        autoComplete: "off" }), /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times", onClick: this.resetSearch, "aria-label": "Reset Search input" })), /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "search", onClick: this.submitSearch, "aria-label": "Search button" })), /*#__PURE__*/

      _jsx(_FeatureToggleSemanticSearch.FeatureToggleSemanticSearch, {}, void 0, /*#__PURE__*/
      _jsx("button", {
        disabled: search.searchTerm ? '' : 'disabled',
        type: "button",
        onClick: this.submitSemanticSearch,
        className: "btn btn-success semantic-search-button" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "flask" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Semantic Search")))), /*#__PURE__*/



      _jsx(_ModalTips.default, {
        label: (0, _I18N.t)('System', 'Search Tips', null, false),
        title: (0, _I18N.t)('System', 'Narrow down your searches', null, false) }, void 0, /*#__PURE__*/

      _jsx(_SearchTipsContent.SearchTipsContent, {}))));



  }}exports.SearchBar = SearchBar;










function mapStateToProps(state, props) {
  const search = (0, _libraryActions.processFilters)(state[props.storeKey].search, state[props.storeKey].filters.toJS());
  return {
    search };

}

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)(
  {
    searchDocuments: _libraryActions.searchDocuments,
    change: _reactReduxForm.actions.change,
    semanticSearch: _actions.submitNewSearch },

  (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchBar);exports.default = _default;