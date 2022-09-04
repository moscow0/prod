"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Cookiepopup = void 0;var Cookie = _interopRequireWildcard(require("tiny-cookie"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _utils = require("../utils");
var _I18N = require("../I18N");

var _Notification = require("../Notifications/components/Notification");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Cookiepopup extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { cookieExists: !_utils.isClient || _utils.isClient && Boolean(Cookie.get('cookiepolicy')) };
    this.close = this.close.bind(this);
  }

  close() {
    Cookie.set('cookiepolicy', 1, { expires: 365 * 10 });
    this.setState({ cookieExists: true });
  }

  render() {
    const { cookiepolicy } = this.props;
    const { cookieExists } = this.state;
    if (!cookiepolicy || cookieExists) {
      return /*#__PURE__*/_jsx("div", { className: "alert-wrapper" });
    }

    const message = /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "To bring you a better experience, this site uses cookies.");

    return /*#__PURE__*/(
      _jsx("div", { className: "alert-wrapper" }, void 0, /*#__PURE__*/
      _jsx(_Notification.Notification, { id: "cookiepolicy", removeNotification: this.close, message: message })));


  }}exports.Cookiepopup = Cookiepopup;






const mapStateToProps = (state) => ({
  cookiepolicy: Boolean(state.settings.collection.get('cookiepolicy')) });var _default =


(0, _reactRedux.connect)(mapStateToProps)(Cookiepopup);exports.default = _default;