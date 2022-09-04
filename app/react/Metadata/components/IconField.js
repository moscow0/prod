"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.IconFieldBase = exports.IconField = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");

var _ReactReduxForms = require("../../ReactReduxForms");
var _ = require("./..");
var _Forms = require("../../Forms");
var _ToggleDisplay = _interopRequireDefault(require("../../Layout/ToggleDisplay"));
var _redux = require("redux");
var _I18N = require("../../I18N");
var _UI = require("../../UI");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const IconFieldBase = ({ model, removeIcon }) => /*#__PURE__*/
_jsx(_Forms.FormValue, { model: `${model}.icon` }, void 0,
(icon = {}) => /*#__PURE__*/
_jsx("div", { className: "icon-selector" }, void 0, /*#__PURE__*/
_jsx(_ToggleDisplay.default, {
  showLabel: /*#__PURE__*/
  _jsx("span", {}, void 0, /*#__PURE__*/
  _jsx(_I18N.Translate, {}, void 0, "add icon"), /*#__PURE__*/
  _jsx(_UI.Icon, { icon: "eye" })),


  hideLabel: /*#__PURE__*/
  _jsx("span", {}, void 0, /*#__PURE__*/
  _jsx(_I18N.Translate, {}, void 0, "remove icon"), /*#__PURE__*/
  _jsx(_UI.Icon, { icon: "eye-slash" })),


  onHide: () => removeIcon(`${model}.icon`),
  open: !!icon._id }, void 0, /*#__PURE__*/

_jsx("ul", { className: "search__filter" }, void 0, /*#__PURE__*/
_jsx("li", {}, void 0, /*#__PURE__*/
_jsx("label", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Icon"), " / ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Flag"))), /*#__PURE__*/


_jsx("li", { className: "wide" }, void 0, /*#__PURE__*/
_jsx(_ReactReduxForms.IconSelector, { model: ".icon" }))))));exports.IconFieldBase = IconFieldBase;













function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ removeIcon: _.actions.removeIcon }, dispatch);
}

const IconField = (0, _reactRedux.connect)(null, mapDispatchToProps)(IconFieldBase);exports.IconField = IconField;