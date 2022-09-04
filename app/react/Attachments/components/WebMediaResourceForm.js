"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.WebMediaResourceForm = void 0;var _reactReduxForm = require("react-redux-form");
var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _react = _interopRequireDefault(require("react"));
var _Forms = require("../../Forms");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








const WebMediaResourceForm = ({
  handleSubmit,
  url,
  dispatch,
  hasName = false }) =>
{
  const validators = _objectSpread(_objectSpread({},
  hasName && { name: { required: (val) => !!val && val.trim() !== '' } }), {}, {
    url: { required: (val) => !!val && val.trim() !== '' } });


  return /*#__PURE__*/(
    _jsx(_reactReduxForm.LocalForm, {
      onSubmit: handleSubmit,
      getDispatch: dispatch,
      model: "urlForm",
      validators: validators,
      initialState: { url },
      className: !hasName ? 'select-from-link' : '' }, void 0, /*#__PURE__*/

    _jsx(_Forms.FormGroup, { className: "has-feedback", model: ".url" }, void 0, /*#__PURE__*/
    _jsx(_reactReduxForm.Field, { model: ".url" }, void 0, /*#__PURE__*/
    _jsx("input", {
      type: "text",
      className: "form-control web-attachment-url",
      placeholder: "Paste URL here" }))),



    hasName && /*#__PURE__*/
    _jsx(_Forms.FormGroup, { className: "form-group", model: ".name" }, void 0, /*#__PURE__*/
    _jsx(_reactReduxForm.Field, { model: ".name", className: "field" }, void 0, /*#__PURE__*/
    _jsx("input", { type: "text", className: "form-control web-attachment-name", placeholder: "Title" }))), /*#__PURE__*/



    _jsx("button", { type: "submit", className: "btn" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "link" }), "\xA0 ", /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Add from URL"))));



};exports.WebMediaResourceForm = WebMediaResourceForm;