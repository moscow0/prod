"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.GoogleAnalytics = void 0;exports.mapStateToProps = mapStateToProps;exports.trackPage = trackPage;var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

function trackPage() {
  if (_utils.isClient && window.gtag) {
    window.gtag('send', 'pageview');
  }

  if (_utils.isClient && window._paq) {
    window._paq.push(['setCustomUrl', window.location.href]);
    window._paq.push(['deleteCustomVariables', 'page']);
    window._paq.push(['setGenerationTimeMs', 0]);
    window._paq.push(['trackPageView']);
  }
}

class GoogleAnalytics extends _react.Component {
  constructor(props) {
    super(props);
    if (!props.analyticsTrackingId || !_utils.isClient) {
      return;
    }
    /*eslint-disable */
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', props.analyticsTrackingId);
    trackPage();
    /*eslint-enable */
  }

  render() {
    if (!this.props.analyticsTrackingId) {
      return false;
    }
    return /*#__PURE__*/(
      _jsx("script", {
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${this.props.analyticsTrackingId}` }));


  }}exports.GoogleAnalytics = GoogleAnalytics;


GoogleAnalytics.defaultProps = {
  analyticsTrackingId: '' };






function mapStateToProps({ settings }) {
  return {
    analyticsTrackingId: settings.collection.get('analyticsTrackingId') };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(GoogleAnalytics);exports.default = _default;