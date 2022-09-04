"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ContactForm = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _I18N = require("../../I18N");
var _api = _interopRequireDefault(require("../../utils/api"));
var _UI = require("../../UI");
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _notificationsActions = require("../../Notifications/actions/notificationsActions");
var _RequestParams = require("../../utils/RequestParams");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ContactForm extends _react.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { name: '', email: '', message: '' };
    this.submit = this.submit.bind(this);
  }

  onChange(key, e) {
    const changedData = {};
    changedData[key] = e.target.value;
    this.setState(changedData);
  }

  async submit(e) {
    e.preventDefault();
    await _api.default.post('contact', new _RequestParams.RequestParams(this.state));
    this.props.notify('Message sent', 'success');
    this.setState({ name: '', email: '', message: '' });
  }

  render() {
    return /*#__PURE__*/(
      _jsx("form", { onSubmit: this.submit, className: "contact-form" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx("label", { className: "form-group-label", htmlFor: "name" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Name")), /*#__PURE__*/

      _jsx("input", {
        required: true,
        name: "name",
        className: "form-control",
        onChange: this.onChange.bind(this, 'name'),
        value: this.state.name })), /*#__PURE__*/


      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx("label", { className: "form-group-label", htmlFor: "email" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Email")), /*#__PURE__*/

      _jsx("input", {
        required: true,
        name: "email",
        className: "form-control",
        onChange: this.onChange.bind(this, 'email'),
        value: this.state.email })), /*#__PURE__*/


      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx("label", { className: "form-group-label", htmlFor: "message" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Message")), /*#__PURE__*/

      _jsx("textarea", {
        required: true,
        name: "message",
        className: "form-control",
        onChange: this.onChange.bind(this, 'message'),
        value: this.state.message })), /*#__PURE__*/


      _jsx("button", { type: "submit", className: "btn btn-success" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "paper-plane" }), "\xA0", /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Send")))));




  }}exports.ContactForm = ContactForm;






function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ notify: _notificationsActions.notify }, dispatch);
}var _default =

(0, _reactRedux.connect)(null, mapDispatchToProps)(ContactForm);exports.default = _default;