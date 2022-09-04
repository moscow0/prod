"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.TranslateForm = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactReduxForm = require("react-redux-form");
var _reactRedux = require("react-redux");
var _ = require("./..");
var _Modal = _interopRequireDefault(require("../../Layout/Modal"));
var _Forms = require("../../Forms");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class TranslateForm extends _react.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  submit(values) {
    let translations = this.props.translations.toJS();
    translations = translations.map((translation) => {
      const { locale } = translation;
      const context = translation.contexts.find((c) => c.id === this.props.context);
      context.values[this.props.value] = values[locale];
      translation.contexts = [context];
      return translation;
    });
    this.props.saveTranslations(translations);
    this.props.close();
  }

  cancel() {
    this.props.close();
  }

  render() {
    const translations = this.props.translations.toJS();
    const languages = translations.map((translation) => translation.locale);

    return /*#__PURE__*/(
      _jsx(_Modal.default, { isOpen: this.props.isOpen, type: "info" }, void 0, /*#__PURE__*/
      _jsx(_Modal.default.Body, {}, void 0, /*#__PURE__*/
      _jsx("h4", {}, void 0, /*#__PURE__*/
      _jsx(_.Translate, {}, void 0, "Translate")), /*#__PURE__*/

      _jsx(_reactReduxForm.Form, { model: "inlineEditModel", onSubmit: this.submit, id: "inlineEdit" }, void 0,
      languages.map((language) => /*#__PURE__*/
      _jsx(_Forms.FormGroup, { model: `.${language}` }, language, /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: `.${language}` }, void 0, /*#__PURE__*/
      _jsx("label", { className: "form-group-label", htmlFor: language }, void 0,
      language, /*#__PURE__*/
      _jsx("input", { id: language, className: "form-control" }))))))), /*#__PURE__*/







      _jsx(_Modal.default.Footer, {}, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", className: "btn btn-default cancel-button", onClick: this.cancel }, void 0,
      (0, _.t)('System', 'Cancel', null, false)), /*#__PURE__*/

      _jsx("button", { type: "submit", form: "inlineEdit", className: "btn confirm-button btn-primary" }, void 0,
      (0, _.t)('System', 'Submit', null, false)))));




  }}exports.TranslateForm = TranslateForm;


TranslateForm.defaultProps = {
  isOpen: false };











function mapStateToProps(state) {
  return {
    translations: state.translations,
    isOpen: state.inlineEdit.get('showInlineEditForm'),
    context: state.inlineEdit.get('context'),
    value: state.inlineEdit.get('key') };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  { saveTranslations: _.actions.saveTranslations, close: _.actions.closeInlineEditTranslation },
  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TranslateForm);exports.default = _default;