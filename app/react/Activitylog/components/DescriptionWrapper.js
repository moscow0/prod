"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = require("immutable");
var _I18N = require("../../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const DescriptionWrapper = (props) => {
  const { entry, toggleExpand, expanded, children } = props;

  return /*#__PURE__*/(
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx("span", {
      className: "expand",
      onClick: () => {
        toggleExpand();
      } }, void 0,

    children)),


    expanded && /*#__PURE__*/
    _jsx("div", { className: "expanded-content" }, void 0, /*#__PURE__*/
    _jsx("table", {}, void 0, /*#__PURE__*/
    _jsx("tbody", {}, void 0,
    entry.getIn(['semantic', 'beautified']) && /*#__PURE__*/
    _jsx("tr", {}, void 0, /*#__PURE__*/
    _jsx("td", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Route")), /*#__PURE__*/

    _jsx("td", {}, void 0,
    entry.get('method'), " : ", entry.get('url'))), /*#__PURE__*/



    _jsx("tr", {}, void 0, /*#__PURE__*/
    _jsx("td", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Query")), /*#__PURE__*/

    _jsx("td", { className: "tdquery" }, void 0, entry.get('query'))), /*#__PURE__*/

    _jsx("tr", {}, void 0, /*#__PURE__*/
    _jsx("td", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Body")), /*#__PURE__*/

    _jsx("td", { className: "tdbody" }, void 0, entry.get('body'))),

    entry.getIn(['semantic', 'errorStack']) && /*#__PURE__*/
    _jsx("tr", {}, void 0, /*#__PURE__*/
    _jsx("td", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Error")), /*#__PURE__*/

    _jsx("td", { className: "tdbody" }, void 0, entry.getIn(['semantic', 'errorStack']))))))));








};

DescriptionWrapper.defaultProps = {
  children: /*#__PURE__*/_jsx("span", {}),
  expanded: false };var _default =









DescriptionWrapper;exports.default = _default;