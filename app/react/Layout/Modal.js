"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactModal = _interopRequireDefault(require("react-modal"));
var _I18N = require("../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Modal extends _react.Component {
  render() {
    const style = {
      overlay: { zIndex: this.props.zIndex, backgroundColor: 'rgba(0, 0, 0, 0.75)' } };

    const { type, className, children, isOpen } = this.props;
    return /*#__PURE__*/(
      _jsx(_reactModal.default, {
        style: style,
        className: `modal-dialog modal-${type} ${className}`,
        isOpen: isOpen,
        contentLabel: "",
        ariaHideApp: false }, void 0, /*#__PURE__*/

      _jsx("div", { className: "modal-content" }, void 0, children)));


  }}exports.default = Modal;











Modal.defaultProps = {
  isOpen: false,
  type: 'success',
  className: '',
  zIndex: 100 };

const Body = ({ children }) => /*#__PURE__*/_jsx("div", { className: "modal-body" }, void 0, children);


const Header = ({ children }) => /*#__PURE__*/_jsx("div", { className: "modal-header" }, void 0, children);


const Footer = ({ children }) => /*#__PURE__*/_jsx("div", { className: "modal-footer" }, void 0, children);


const Title = ({ children }) => /*#__PURE__*/_jsx("h4", { className: "modal-title" }, void 0, children);


const Close = ({ onClick }) => /*#__PURE__*/
_jsx("button", { type: "button", className: "close", onClick: onClick }, void 0, /*#__PURE__*/
_jsx("span", { "aria-hidden": "true" }, void 0, "\xD7"), /*#__PURE__*/
_jsx("span", { className: "sr-only" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Close")));





Modal.Body = Body;
Modal.Header = Header;
Modal.Footer = Footer;
Modal.Title = Title;
Modal.Close = Close;