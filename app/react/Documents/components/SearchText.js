"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.SearchText = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _I18N = require("../../I18N");
var _reactReduxForm = require("react-redux-form");
var _libraryActions = require("../../Library/actions/libraryActions");
var _uiActions = require("../../Viewer/actions/uiActions");
var _reactRouter = require("react-router");
var _UI = require("../../UI");
var _ModalTips = _interopRequireDefault(require("../../App/ModalTips"));
var _JSONRequest = require("../../../shared/JSONRequest");
var _SearchTipsContent = require("../../App/SearchTipsContent");
var _SnippetList = _interopRequireDefault(require("./SnippetList"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class SearchText extends _react.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  componentDidMount() {
    if (this.props.storeKey === 'documentViewer') {
      this.searchSnippets(this.props.searchTerm, this.props.doc.get('sharedId'));
    }
  }

  componentDidUpdate(prevProps) {
    if (
    prevProps.searchTerm !== this.props.searchTerm ||
    prevProps.doc.get('sharedId') !== this.props.doc.get('sharedId'))
    {
      this.searchSnippets(this.props.searchTerm, this.props.doc.get('sharedId'));
    }
  }

  attachDispatch(dispatch) {
    this.formDispatch = dispatch;
  }

  resetSearch() {}

  searchSnippets(searchTerm, sharedId) {
    if (sharedId) {
      this.props.searchSnippets(searchTerm, sharedId, this.props.storeKey);
      if (this.formDispatch) {
        this.formDispatch(_reactReduxForm.actions.change('searchText.searchTerm', searchTerm));
      }
    }
  }

  submit(value) {
    const path = _reactRouter.browserHistory.getCurrentLocation().pathname;
    const { query } = _reactRouter.browserHistory.getCurrentLocation();
    query.searchTerm = value.searchTerm;

    _reactRouter.browserHistory.push(path + (0, _JSONRequest.toUrlParams)(query));

    return this.props.searchSnippets(
    value.searchTerm,
    this.props.doc.get('sharedId'),
    this.props.storeKey);

  }

  render() {
    const { doc, snippets } = this.props;
    const documentViewUrl = doc.get('file') ?
    `/document/${doc.get('sharedId')}` :
    `/entity/${doc.get('sharedId')}`;
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.LocalForm, {
        model: "searchText",
        onSubmit: this.submit,
        getDispatch: (dispatch) => this.attachDispatch(dispatch),
        autoComplete: "off" }, void 0,

      this.props.storeKey === 'documentViewer' && /*#__PURE__*/
      _jsx("div", { className: "search-box" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "input-group" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: ".searchTerm" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "search" }), /*#__PURE__*/
      _jsx("input", {
        type: "text",
        placeholder: (0, _I18N.t)('System', 'Search related entities or documents', null, false),
        className: "form-control",
        autoComplete: "off",
        "aria-label": (0, _I18N.t)('System', 'Search text description', null, false) }), /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times", onClick: this.resetSearch }))), /*#__PURE__*/


      _jsx(_ModalTips.default, {
        label: (0, _I18N.t)('System', 'Search Tips', null, false),
        title: (0, _I18N.t)('System', 'Narrow down your searches', null, false) }, void 0, /*#__PURE__*/

      _jsx(_SearchTipsContent.SearchTipsContent, {})))),





      !snippets.get('count') && /*#__PURE__*/
      _jsx("div", { className: "blank-state" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "search" }), /*#__PURE__*/
      _jsx("h4", {}, void 0, (0, _I18N.t)('System', !this.props.searchTerm ? 'Search text' : 'No text match')), /*#__PURE__*/
      _jsx("p", {}, void 0,
      (0, _I18N.t)(
      'System',
      !this.props.searchTerm ? 'Search text description' : 'No text match description'))),




      doc.size ? /*#__PURE__*/
      _jsx(_SnippetList.default, {
        doc: this.props.doc,
        snippets: snippets,
        selectSnippet: this.props.selectSnippet,
        searchTerm: this.props.searchTerm,
        documentViewUrl: documentViewUrl }) :


      ''));



  }}exports.SearchText = SearchText;














SearchText.defaultProps = {
  searchTerm: '',
  snippets: {
    count: 0,
    metadata: [],
    fullText: [] } };



function mapStateToProps(state, props) {
  return {
    snippets: state[props.storeKey].sidepanel.snippets };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ searchSnippets: _libraryActions.searchSnippets, selectSnippet: _uiActions.selectSnippet }, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchText);exports.default = _default;