"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.SemanticSearchResults = void 0;exports.mapDispatchToProps = mapDispatchToProps;exports.mapStateToProps = void 0;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _reactHelmet = require("react-helmet");
var _Lists = require("../../Layout/Lists");
var _Doc = _interopRequireDefault(require("../../Library/components/Doc"));
var semanticSearchActions = _interopRequireWildcard(require("../actions/actions"));
var _immutable = _interopRequireDefault(require("immutable"));
var _I18N = require("../../I18N");
var _SearchDescription = _interopRequireDefault(require("../../Library/components/SearchDescription"));
var _UI = require("../../UI");
var _ResultsSidePanel = _interopRequireDefault(require("./ResultsSidePanel"));
var _SemanticSearchMultieditPanel = _interopRequireDefault(require("./SemanticSearchMultieditPanel"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

function renderAditionalText(doc) {
  const resultsSize = doc.getIn(['semanticSearch', 'totalResults']);
  const aboveThreshold = doc.getIn(['semanticSearch', 'numRelevant']);
  const percentage = doc.getIn(['semanticSearch', 'relevantRate']) * 100;

  return /*#__PURE__*/(
    _jsx("div", { className: "item-metadata" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "metadata-type-text" }, void 0, /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Sentences above threshold")), /*#__PURE__*/

    _jsx("div", {}, void 0,
    aboveThreshold, " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "out of"), " ", resultsSize, " (", percentage.toFixed(2), "%)"))));




}

class SemanticSearchResults extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
    this.onClick = this.onClick.bind(this);
    this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
    this.multiEdit = this.multiEdit.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { items, filters, isEmpty, searchTerm } = this.props;
    return (
      !_immutable.default.is(nextProps.items, items) ||
      Boolean(nextProps.filters.threshold !== filters.threshold) ||
      Boolean(nextProps.filters.minRelevantSentences !== filters.minRelevantSentences) ||
      Boolean(nextProps.isEmpty !== isEmpty) ||
      Boolean(nextProps.searchTerm !== searchTerm));

  }

  componentDidUpdate(prevProps) {
    const { filters, searchId } = this.props;
    if (
    filters.minRelevantSentences !== prevProps.filters.minRelevantSentences ||
    filters.threshold !== prevProps.filters.threshold)
    {
      this.props.getSearch(searchId, filters);
    }
  }

  onClick(_e, doc) {
    this.props.selectSemanticSearchDocument(doc);
  }

  onLoadMoreClick() {
    const { searchId, filters } = this.props;
    const { page } = this.state;
    const limit = 30;
    const skip = page * limit;
    const args = _objectSpread(_objectSpread({}, filters), {}, { skip, limit });
    this.setState({ page: page + 1 });
    this.props.getMoreSearchResults(searchId, args);
  }

  multiEdit() {
    const { editSearchEntities: edit, filters, searchId } = this.props;
    edit(searchId, filters);
  }

  render() {
    const { items, isEmpty, searchTerm, totalCount, query, searchId } = this.props;
    return /*#__PURE__*/(
      _jsx("div", { className: "row panels-layout" }, void 0,
      isEmpty && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Search not found")), /*#__PURE__*/

      _jsx(_reactHelmet.Helmet, {}, void 0, /*#__PURE__*/
      _jsx("title", {}, void 0, (0, _I18N.t)('System', 'Search not found', null, false)))),



      !isEmpty && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_reactHelmet.Helmet, {}, void 0, /*#__PURE__*/
      _jsx("title", {}, void 0, `${searchTerm} - Semantic search results`)), /*#__PURE__*/

      _jsx("main", { className: "semantic-search-results-viewer document-viewer with-panel" }, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("h3", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Semantic search"), ":", ' ', /*#__PURE__*/
      _jsx(_SearchDescription.default, { searchTerm: searchTerm, query: query })), /*#__PURE__*/

      _jsx("button", {
        type: "button",
        onClick: this.multiEdit,
        className: "btn btn-success edit-semantic-search" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "pencil-alt" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Edit all documents matching this criteria"))), /*#__PURE__*/


      _jsx("div", { className: "documents-counter" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "documents-counter-label" }, void 0, /*#__PURE__*/
      _jsx("b", {}, void 0, totalCount), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "documents"))), /*#__PURE__*/


      _jsx(_Lists.RowList, {}, void 0,
      items.map((doc) => /*#__PURE__*/
      _jsx(_Doc.default, {
        doc: doc,

        onClick: this.onClick,
        additionalText: renderAditionalText(doc) }, doc.get('sharedId')))), /*#__PURE__*/



      _jsx("p", { className: "col-sm-12 text-center documents-counter" }, void 0, /*#__PURE__*/
      _jsx("b", {}, void 0, " ", items.size, " "), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "of"), /*#__PURE__*/
      _jsx("b", {}, void 0, " ", totalCount, " "), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "documents")), /*#__PURE__*/

      _jsx("div", { className: "col-sm-12 text-center documents-counter" }, void 0, /*#__PURE__*/
      _jsx("button", {
        onClick: this.onLoadMoreClick,
        type: "button",
        className: "btn btn-default btn-load-more" }, void 0, /*#__PURE__*/

      _jsx("span", { "no-translate": true }, void 0, "30"), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "x more")))), /*#__PURE__*/



      _jsx(_ResultsSidePanel.default, {}), /*#__PURE__*/
      _jsx(_SemanticSearchMultieditPanel.default, {
        searchId: searchId,
        formKey: "semanticSearch.multipleEdit" }))));





  }}exports.SemanticSearchResults = SemanticSearchResults;


SemanticSearchResults.defaultProps = {
  searchTerm: '',
  items: _immutable.default.fromJS([]),
  query: { searchTerm: '' },
  searchId: '' };






















const mapStateToProps = (state) => {
  const { search } = state.semanticSearch;
  const searchTerm = search.get('searchTerm');
  const items = search.get('results');
  const filters = state.semanticSearch.resultsFilters;
  const isEmpty = search.size === 0;
  const { _id, query } = search.toJS();

  return {
    searchId: _id,
    query: query || { searchTerm: '' },
    totalCount: isEmpty ? 0 : search.get('documents').size,
    searchTerm,
    filters,
    items,
    isEmpty };

};exports.mapStateToProps = mapStateToProps;

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(semanticSearchActions, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SemanticSearchResults);exports.default = _default;