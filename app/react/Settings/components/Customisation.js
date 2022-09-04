"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Customisation = void 0;var _reactReduxForm = require("react-redux-form");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _I18N = require("../../I18N");

var _settingsActions = _interopRequireDefault(require("../actions/settingsActions"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Customisation extends _react.Component {
  componentDidMount() {
    this.props.loadForm('settings.settings', { customCSS: this.props.settings.get('customCSS') });
  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default settings-custom-css" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, (0, _I18N.t)('System', 'Custom styles')), /*#__PURE__*/
      _jsx("div", { className: "panel-body" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Form, { model: "settings.settings", onSubmit: this.props.saveSettings }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: ".customCSS", className: "test" }, void 0, /*#__PURE__*/
      _jsx("label", { className: "form-group-label", htmlFor: "custom_css" }, void 0,
      (0, _I18N.t)('System', 'Custom CSS'), /*#__PURE__*/
      _jsx("textarea", { className: "form-control", id: "custom_css" }))), /*#__PURE__*/


      _jsx("div", { className: "settings-footer remove-extra-nesting" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "submit", className: "btn btn-success btn-extra-padding" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Save")))))))));








  }}exports.Customisation = Customisation;








const mapStateToProps = (state) => ({ settings: state.settings.collection });
const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)(
{
  loadForm: _reactReduxForm.actions.load,
  saveSettings: _settingsActions.default },

dispatch);var _default =




(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Customisation);exports.default = _default;