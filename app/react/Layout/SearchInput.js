"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.SearchInput = void 0;var _react = _interopRequireWildcard(require("react"));
var _UI = require("../UI");
var _I18N = require("../I18N");
var _ModalTips = _interopRequireDefault(require("../App/ModalTips"));
var _SearchTipsContent = require("../App/SearchTipsContent");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}

class SearchInput extends _react.Component {
  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "input-group" }, void 0, /*#__PURE__*/
      _react.default.createElement("input", _extends({ type: "text", className: "form-control", placeholder: "Search" }, this.props)), /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "search" }), /*#__PURE__*/
      _jsx(_ModalTips.default, {
        label: (0, _I18N.t)('System', 'Search Tips', null, false),
        title: (0, _I18N.t)('System', 'Narrow down your searches', null, false) }, void 0, /*#__PURE__*/

      _jsx(_SearchTipsContent.SearchTipsContent, {}))));



  }}exports.SearchInput = SearchInput;var _default =


SearchInput;exports.default = _default;