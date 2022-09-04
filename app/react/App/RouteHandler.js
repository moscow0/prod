"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _I18N = require("../I18N");
var _utils = require("../utils");
var _api = _interopRequireDefault(require("../utils/api"));
var _RequestParams = require("../utils/RequestParams");
var _moment = _interopRequireDefault(require("moment"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _JSONUtils = _interopRequireDefault(require("../../shared/JSONUtils"));const _excluded = ["lang"];function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

const getLocale = ({ store }) => store.getState().locale;

const setLocale = (locale) => {
  _moment.default.locale(locale);
  _api.default.locale(locale);
  _I18N.I18NUtils.saveLocale(locale);
};

class RouteHandler extends _react.Component {
  static async requestState(_requestParams, _state) {
    return new Promise((resolve, _reject) => {
      resolve([]);
    });
  }

  emptyState() {} //eslint-disable-line

  static renderTools() {}

  //eslint-disable-next-line
  isRenderedFromServer() {
    const result = RouteHandler.renderedFromServer;
    RouteHandler.renderedFromServer = false;
    return result;
  }

  constructor(props, context) {
    super(props, context);
    setLocale(getLocale(context));
    if (!this.isRenderedFromServer() && _utils.isClient) {
      this.getClientState(this.props);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.urlHasChanged(prevProps)) {
      this.emptyState();
      this.getClientState(this.props);
    }
  }

  async getClientState(props) {
    let query;
    if (props.location) {
      query = _JSONUtils.default.parseNested(props.location.query);
    }

    const { store = { getState: () => {} } } = this.context;

    const headers = {};
    const _props$params = props.params,{ lang } = _props$params,params = _objectWithoutProperties(_props$params, _excluded);
    const requestParams = new _RequestParams.RequestParams(_objectSpread(_objectSpread({}, query), params), headers);
    const actions = await this.constructor.requestState(requestParams, store.getState());

    actions.forEach((action) => {
      store.dispatch(action);
    });
  }

  urlHasChanged(prevProps) {
    const { params: nextParams = {}, routes: nextRoutes = [] } = prevProps;
    const { params, routes } = this.props;

    const sameParams = Object.keys(nextParams).reduce(
    (memo, key) => memo && prevProps.params[key] === params[key],
    true);

    const sameAmountOfparams = Object.keys(nextParams).length === Object.keys(params).length;
    const currentPath = routes.reduce((path, r) => path + r.path, '');
    const newPath = nextRoutes.reduce((path, r) => path + r.path, '');
    const samePath = currentPath === newPath;
    return !sameParams || !sameAmountOfparams || !samePath;
  }

  render() {
    return /*#__PURE__*/_jsx("div", {}, void 0, false);
  }}


RouteHandler.renderedFromServer = true;

RouteHandler.defaultProps = {
  params: {} };


RouteHandler.contextTypes = {
  getInitialData: _propTypes.default.func,
  isRenderedFromServer: _propTypes.default.func,
  router: _propTypes.default.object,
  store: _propTypes.default.object };var _default =








RouteHandler;exports.default = _default;