"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _reactRouter = require("react-router");
var _utils = require("../../utils");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const MarkdownLink = ({ url, classname, children }) => {
  if (_utils.isClient) {
    console.warn('MarkdownLink is deprecated, use <Link to="url"></Link> instead');
  }
  return /*#__PURE__*/(
    _jsx(_reactRouter.Link, { to: url, className: classname, href: url }, void 0,
    children));


};

MarkdownLink.defaultProps = {
  children: '',
  classname: '' };var _default =












MarkdownLink;exports.default = _default;