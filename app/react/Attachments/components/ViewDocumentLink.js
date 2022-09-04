"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ViewDocumentLinkBase = exports.ViewDocumentLink = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _Layout = require("../../Layout");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}









class ViewDocumentLinkBase extends _react.Component {
  render() {
    const { filename, location, children, entity } = this.props;
    const onViewer = location.pathname.match(/entity/);
    return onViewer ? /*#__PURE__*/
    _jsx(_Layout.CurrentLocationLink, {
      className: "btn btn-default",
      location: location,
      queryParams: { file: filename, page: 1 },
      type: "button" }, void 0,

    children) : /*#__PURE__*/


    _jsx(_reactRouter.Link, {
      className: "btn btn-default",
      to: `/entity/${entity.sharedId}?file=${filename}`,
      type: "button" }, void 0,

    children);


  }}exports.ViewDocumentLinkBase = ViewDocumentLinkBase;


const ViewDocumentLink = (0, _reactRouter.withRouter)(ViewDocumentLinkBase);exports.ViewDocumentLink = ViewDocumentLink;