"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _reactHelmet = require("react-helmet");
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));

var _RequestParams = require("../utils/RequestParams");
var _BasicReducer = require("../BasicReducer");
var _utils = require("../utils");
var _JSONRequest = require("../../shared/JSONRequest");
var _Viewer = require("./components/Viewer");
var _EntitiesAPI = _interopRequireDefault(require("../Entities/EntitiesAPI"));
var _documentActions = require("./actions/documentActions");
var _redux = require("redux");
var _uiActions = require("./actions/uiActions");
var _routeActions = require("./actions/routeActions");const _excluded = ["page"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

const defaultDoc = (entity) => entity.get('defaultDoc') ? entity.get('defaultDoc').toJS() : {};

class PDFView extends _react.Component {
  static async requestState(requestParams, globalResources) {
    return (0, _routeActions.requestViewerState)(
    requestParams.add({ raw: requestParams.data.raw === 'true' || !_utils.isClient }),
    globalResources);

  }

  constructor(props, context) {
    super(props, context);
    this.changeBrowserHistoryPage = this.changeBrowserHistoryPage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.onDocumentReady = this.onDocumentReady.bind(this);
  }

  componentDidMount() {
    if (this.props.location.query.searchTerm) {
      this.context.store.dispatch(_BasicReducer.actions.set('viewer.sidepanel.tab', 'text-search'));
    }
  }

  componentWillReceiveProps(props) {
    const { query = {} } = props.location;
    if (query.page !== this.props.location.query.page && query.raw !== 'true') {
      this.changePage(query.page);
    }
    if (
    (query.page !== this.props.location.query.page ||
    query.raw !== this.props.location.query.raw) &&
    query.raw === 'true')
    {
      _EntitiesAPI.default.
      getRawPage(new _RequestParams.RequestParams({ _id: defaultDoc(props.entity)._id, page: query.page })).
      then((pageText) => {
        this.context.store.dispatch(_BasicReducer.actions.set('viewer/rawText', pageText));
      });
    }
  }

  componentWillUnmount() {
    this.props.leaveEditMode();
  }

  onDocumentReady(doc) {
    _utils.events.emit('documentLoaded');
    if (this.props.location.query.raw === 'true') {
      return;
    }
    if (this.props.location.query.page) {
      (0, _uiActions.scrollToPage)(this.props.location.query.page, 0);
    }
    const { ref } = this.props.location.query;
    if (ref) {
      const reference = doc.get('relations').find((r) => r.get('_id') === ref);
      this.context.store.dispatch((0, _uiActions.activateReference)(reference.toJS()));
    }
  }

  changePage(nextPage) {
    if (!this.props.location.query.raw) {
      return (0, _uiActions.scrollToPage)(nextPage);
    }

    return this.changeBrowserHistoryPage(nextPage);
  }

  changeBrowserHistoryPage(newPage) {
    const _this$props$location =

    this.props.location,{ query: { page } } = _this$props$location,queryWithoutPage = _objectWithoutProperties(_this$props$location.query, _excluded);
    queryWithoutPage.raw = queryWithoutPage.raw || undefined;
    _reactRouter.browserHistory.push(
    `${this.props.location.pathname}${(0, _JSONRequest.toUrlParams)(_objectSpread(_objectSpread({}, queryWithoutPage), {}, { page: newPage }))}`);

  }

  render() {
    const { query = {}, pathname } = this.props.location;
    const raw = query.raw === 'true' || !_utils.isClient;
    const page = Number(query.page || 1);

    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_reactHelmet.Helmet, {}, void 0, raw && /*#__PURE__*/_jsx("link", { rel: "canonical", href: `${pathname}?page=${page}` })), /*#__PURE__*/
      _jsx(_Viewer.ConnectedViewer, {
        raw: raw,
        searchTerm: query.searchTerm,
        onPageChange: this.changeBrowserHistoryPage,
        onDocumentReady: this.onDocumentReady,
        changePage: this.changePage,
        page: page,
        file: defaultDoc(this.props.entity) })));



  }}


PDFView.contextTypes = {
  store: _propTypes.default.instanceOf(Object) };








PDFView.defaultProps = {
  leaveEditMode: () => {} };


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ leaveEditMode: _documentActions.leaveEditMode }, dispatch);
}var _default =

(0, _reactRedux.connect)(null, mapDispatchToProps)(PDFView);exports.default = _default;