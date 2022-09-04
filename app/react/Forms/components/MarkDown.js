"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MarkDown = void 0;var _Markdown = _interopRequireDefault(require("../../Markdown"));
var _react = _interopRequireWildcard(require("react"));
var _reactTabsRedux = require("react-tabs-redux");
var _I18N = require("../../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}








class MarkDown extends _react.Component {
  render() {
    const { rows = 6, value = '', onChange, showPreview = true } = this.props;
    return /*#__PURE__*/(
      _jsx("div", { className: "markdownEditor" }, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.Tabs, { renderActiveTabContentOnly: true }, void 0, /*#__PURE__*/
      _jsx("div", { className: "tab-nav" }, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.TabLink, { to: "edit", default: true }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Edit")),

      showPreview && /*#__PURE__*/
      _jsx(_reactTabsRedux.TabLink, { to: "preview", component: "div" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Preview")), /*#__PURE__*/


      _jsx("a", {
        className: "tab-link tab-link--help",
        href: "https://guides.github.com/features/mastering-markdown/",
        target: "_blank",
        rel: "noopener noreferrer" }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "help"))), /*#__PURE__*/


      _jsx(_reactTabsRedux.TabContent, { for: "edit" }, void 0, /*#__PURE__*/
      _jsx("textarea", { className: "form-control", rows: rows, onChange: onChange, value: value })),

      showPreview && /*#__PURE__*/
      _jsx(_reactTabsRedux.TabContent, { for: "preview", className: "markdownViewer" }, void 0, /*#__PURE__*/
      _jsx(_Markdown.default, { html: this.props.htmlOnViewer, markdown: value })))));





  }}exports.MarkDown = MarkDown;