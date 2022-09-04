"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ShowToc = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _uiActions = require("../../Viewer/actions/uiActions");
var _immutable = _interopRequireDefault(require("immutable"));
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _I18N = require("../../I18N");
var _UI = require("../../UI");

require("./scss/showToc.scss");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ShowToc extends _react.Component {
  scrollTo(tocElement, e) {
    e.preventDefault();
    this.props.scrollToToc(tocElement.toJS());
  }

  render() {
    const toc = _immutable.default.fromJS(this.props.toc);

    if (!toc.size) {
      return /*#__PURE__*/(
        _jsx("div", { className: "blank-state" }, void 0, /*#__PURE__*/
        _jsx(_UI.Icon, { icon: "font" }), /*#__PURE__*/
        _jsx("h4", {}, void 0, (0, _I18N.t)('System', 'No Table of Contents')), /*#__PURE__*/
        _jsx("p", {}, void 0, (0, _I18N.t)('System', 'No Table of Contents description'))));


    }

    return /*#__PURE__*/(
      _jsx("div", { className: "toc" }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "toc-view" }, void 0,
      toc.map((tocElement, index) => /*#__PURE__*/
      _jsx("li", { className: `toc-indent-${tocElement.get('indentation')}` }, index, /*#__PURE__*/
      _jsx(_ShowIf.default, { if: !this.props.readOnly }, void 0, /*#__PURE__*/
      _jsx("a", {
        className: "toc-view-link",
        href: "#",
        onClick: this.scrollTo.bind(this, tocElement) }, void 0,

      tocElement.get('label'), /*#__PURE__*/
      _jsx("span", { className: "page-number" }, void 0,
      tocElement.getIn(['selectionRectangles', 0]).get('page')))), /*#__PURE__*/



      _jsx(_ShowIf.default, { if: this.props.readOnly }, void 0, /*#__PURE__*/
      _jsx("span", { className: "toc-view-link" }, void 0, tocElement.get('label'))))))));






  }}exports.ShowToc = ShowToc;


ShowToc.defaultProps = {
  toc: [] };








function mapDispatchToProps() {
  return { scrollToToc: _uiActions.scrollToToc };
}var _default =

(0, _reactRedux.connect)(null, mapDispatchToProps)(ShowToc);exports.default = _default;