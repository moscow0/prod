"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PageViewer = void 0;var _reactRedux = require("react-redux");
var _reactHelmet = require("react-helmet");
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _Footer = _interopRequireDefault(require("../../App/Footer"));
var _Markdown = _interopRequireDefault(require("../../Markdown"));
var _components = require("../../Markdown/components");
var _ErrorBoundary = require("../../App/ErrorHandling/ErrorBoundary");
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _ErrorFallback = require("../../App/ErrorHandling/ErrorFallback");
var _ErrorUtils = require("../../App/ErrorHandling/ErrorUtils");
var _Script = _interopRequireDefault(require("./Script"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const parseSSRError = (error) => {
  const SSRError = error instanceof _immutable.default.Map ? error.toJS() : error;
  return SSRError !== null && SSRError !== void 0 && SSRError.json ? (0, _ErrorUtils.parseRenderingError)(SSRError) : null;
};

class PageViewer extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.warningPageError = this.warningPageError.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page.get('title') !== this.props.page.get('title')) {
      this.removeCustomPageError();
    }
  }

  componentWillUnmount() {
    if (this.state.customPageError) {
      this.removeCustomPageError();
    }
  }

  warningPageError(error) {
    this.setState({ customPageError: error });
  }

  removeCustomPageError() {
    this.setState({ customPageError: null });
  }

  renderErrorWarning() {
    return /*#__PURE__*/(
      _jsx("div", { className: "alert alert-danger" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "exclamation-triangle" }), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "There is an unexpected error on this custom page, it may not work properly. Please contact an admin for details."), /*#__PURE__*/



      _jsx(_UI.Icon, { icon: "times", onClick: () => this.removeCustomPageError() })));


  }

  render() {
    const { page, itemLists, datasets, error, setBrowserTitle } = this.props;
    const lists = itemLists.toJS();
    const originalText = page.getIn(['metadata', 'content']) || '';
    const scriptRendered = page.getIn(['scriptRendered']);
    let scriptCode = page.getIn(['metadata', 'script']) || '';
    scriptCode = `var datasets = window.store.getState().page.datasets.toJS();
    ${scriptCode}`;
    const parsedPageError = parseSSRError(error);
    return /*#__PURE__*/(
      _jsx("div", { className: "row" }, void 0,
      !parsedPageError && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null,
      setBrowserTitle && /*#__PURE__*/
      _jsx(_reactHelmet.Helmet, {}, void 0, /*#__PURE__*/
      _jsx("title", {}, void 0, page.get('title') ? page.get('title') : 'Page')), /*#__PURE__*/


      _jsx("main", { className: "page-viewer document-viewer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "main-wrapper" }, void 0,
      this.state.customPageError && this.renderErrorWarning(), /*#__PURE__*/
      _jsx(_components.Context.Provider, { value: datasets }, void 0, /*#__PURE__*/
      _jsx(_ErrorBoundary.ErrorBoundary, {}, void 0, /*#__PURE__*/
      _jsx(_Markdown.default, { html: true, markdown: originalText, lists: lists }))), /*#__PURE__*/


      _jsx(_Footer.default, {}))), /*#__PURE__*/


      _jsx(_Script.default, { scriptRendered: scriptRendered, onError: (e) => this.warningPageError(e) }, void 0,
      scriptCode)),



      parsedPageError && /*#__PURE__*/
      _jsx("div", { className: "main-wrapper" }, void 0, /*#__PURE__*/
      _jsx(_ErrorFallback.ErrorFallback, { error: parsedPageError }), /*#__PURE__*/
      _jsx(_Footer.default, {}))));




  }}


PageViewer.defaultProps = {
  page: _immutable.default.fromJS({}),
  itemLists: _immutable.default.fromJS([]),
  datasets: _immutable.default.fromJS({}),
  error: _immutable.default.fromJS({}),
  setBrowserTitle: true };










const mapStateToProps = ({ page }) => ({
  page: page.pageView,
  datasets: page.datasets,
  itemLists: page.itemLists,
  error: page.error });


const container = (0, _reactRedux.connect)(mapStateToProps)(PageViewer);exports.PageViewer = container;