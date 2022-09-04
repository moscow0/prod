"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Notice = void 0;
var _react = _interopRequireWildcard(require("react"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}











const defaultProps = {
  allowClose: true,
  children: '' };


class Notice extends _react.Component {


  static learnIconSvg() {
    return /*#__PURE__*/(
      _jsx("svg", {
        width: "29",
        height: "29",
        viewBox: "0 0 29 29",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg" }, void 0, /*#__PURE__*/

      _jsx("circle", { cx: "14.5", cy: "14.5", r: "14.5", fill: "#2B56C1" }), /*#__PURE__*/
      _jsx("path", {
        d: "M14.8971 16.9227C14.8314 16.9446 14.7657 16.9665 14.7 16.9665C14.6343 16.9665 14.5686 16.9446 14.503 16.9227L7.86842 14.3389V18.1927C7.86842 20.8202 12.6418 21.1048 14.7 21.1048C16.7583 21.1048 21.5316 20.8202 21.5316 18.1927V14.3389L14.8971 16.9227Z",
        fill: "#FAFBFF" }), /*#__PURE__*/

      _jsx("path", {
        d: "M24.1372 11.6238L14.8533 8.03284C14.7438 7.98905 14.6343 7.98905 14.5467 8.03284L5.28465 11.6238C5.10948 11.6895 5 11.8428 5 12.0398C5 12.2369 5.10948 12.3902 5.28465 12.4559L14.5467 16.0249C14.5905 16.0468 14.6562 16.0468 14.7 16.0468C14.7438 16.0468 14.8095 16.0468 14.8533 16.0249L24.1154 12.4559C24.2905 12.3902 24.4 12.2369 24.4 12.0398C24.4 11.8428 24.2905 11.6895 24.1372 11.6238Z",
        fill: "#FAFBFF" })));



  }

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false };


    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ isHidden: true });
  }

  render() {
    const { children, title, allowClose } = this.props;
    const { isHidden } = this.state;

    return /*#__PURE__*/(
      _jsx("div", { className: `notice ${isHidden ? 'is-hidden' : ''}` }, void 0, /*#__PURE__*/
      _jsx("div", { className: "header" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "icon" }, void 0, Notice.learnIconSvg()), /*#__PURE__*/
      _jsx("span", { className: "title" }, void 0, title),
      allowClose && /*#__PURE__*/
      _jsx("button", { className: "close-notice", onClick: this.close, type: "button", "no-translate": true }, void 0, "X")), /*#__PURE__*/




      _jsx("div", { className: "main" }, void 0, children)));


  }}exports.Notice = Notice;_defineProperty(Notice, "defaultProps", defaultProps);