"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Notification = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _UI = require("../../UI");
var _notificationsActions = require("../actions/notificationsActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Notification extends _react.Component {
  close() {
    this.props.removeNotification(this.props.id);
  }

  render() {
    const { type, message } = this.props;
    const cssClass = `alert alert-${type}`;
    let icon = 'check';
    if (type === 'warning' || type === 'danger') {
      icon = 'exclamation-triangle';
    }

    const isNode = typeof message !== 'string';

    const FormattedMessage = isNode ?
    message :
    message.split('\n').map((item, i) => /*#__PURE__*/
    //eslint-disable-next-line react/no-array-index-key
    _jsx(_react.default.Fragment, {}, i,
    item, /*#__PURE__*/
    _jsx("br", {})));



    return /*#__PURE__*/(
      _jsx("div", { className: cssClass, onClick: this.close.bind(this) }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: icon }), /*#__PURE__*/
      _jsx("span", { className: "alert-text" }, void 0, FormattedMessage), /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "times" })));


  }}exports.Notification = Notification;


Notification.defaultProps = {
  type: 'success' };









function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ removeNotification: _notificationsActions.removeNotification }, dispatch);
}var _default =

(0, _reactRedux.connect)(null, mapDispatchToProps)(Notification);exports.default = _default;