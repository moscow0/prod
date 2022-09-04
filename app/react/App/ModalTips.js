"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _I18N = require("../I18N");
var _Modal = _interopRequireDefault(require("../Layout/Modal"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}
// eslint-disable-next-line import/exports-last
class ModalTips extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false };

  }

  render() {
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("div", { className: "modal-tip-label", onClick: () => this.setState({ isOpen: true }) }, void 0,
      this.props.label), /*#__PURE__*/

      _jsx(_Modal.default, { isOpen: this.state.isOpen, type: this.props.type, className: "modal-tip-dim" }, void 0, /*#__PURE__*/
      _jsx(_Modal.default.Body, {}, void 0, /*#__PURE__*/
      _jsx("h4", {}, void 0, this.props.title),
      this.props.children), /*#__PURE__*/

      _jsx(_Modal.default.Footer, {}, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "btn confirm-button btn-info",
        onClick: () => this.setState({ isOpen: false }) }, void 0,

      (0, _I18N.t)('System', 'Accept'))))));





  }}exports.default = ModalTips;


ModalTips.defaultProps = {
  type: 'info' };