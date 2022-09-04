"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _reactReduxForm = require("react-redux-form");
var _reactRouter = require("react-router");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _risonNode = _interopRequireDefault(require("rison-node"));
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _ModalTips = _interopRequireDefault(require("../../App/ModalTips"));
var _SearchTipsContent = require("../../App/SearchTipsContent");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const search = ({ searchTerm }) => {
  _reactRouter.browserHistory.push(`/library/?q=${_risonNode.default.encode({ searchTerm })}`);
};

const SearchBox = ({ placeholder, classname }) => /*#__PURE__*/
_jsx("div", { className: `search-box ${classname}` }, void 0, /*#__PURE__*/
_jsx(_reactReduxForm.Form, { model: "library.search", onSubmit: search }, void 0, /*#__PURE__*/
_jsx("div", { className: "input-group" }, void 0, /*#__PURE__*/
_jsx("button", { type: "submit", className: "btn btn-primary" }, void 0, /*#__PURE__*/
_jsx(_UI.Icon, { icon: "search" })), /*#__PURE__*/

_jsx(_reactReduxForm.Field, { model: ".searchTerm" }, void 0, /*#__PURE__*/
_jsx("input", { className: "form-control", type: "text", placeholder: placeholder })))), /*#__PURE__*/



_jsx(_ModalTips.default, {
  label: (0, _I18N.t)('System', 'Search Tips', null, false),
  title: (0, _I18N.t)('System', 'Narrow down your searches', null, false) }, void 0, /*#__PURE__*/

_jsx(_SearchTipsContent.SearchTipsContent, {})));




SearchBox.defaultProps = {
  placeholder: '',
  classname: '' };var _default =







SearchBox;exports.default = _default;