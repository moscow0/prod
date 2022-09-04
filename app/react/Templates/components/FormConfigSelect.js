"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.mapStateToProps = mapStateToProps;var _reactReduxForm = require("react-redux-form");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _lodash = require("lodash");

var _ReactReduxForms = require("../../ReactReduxForms");
var _I18N = require("../../I18N");
var _Layout = require("../../Layout");
var _PropertyConfigOptions = _interopRequireDefault(require("./PropertyConfigOptions"));
var _checkErrorsOnLabel = require("../utils/checkErrorsOnLabel");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class FormConfigSelect extends _react.Component {
  static getDerivedStateFromProps(props, state) {
    return { warning: Boolean(state.initialContent !== props.content) };
  }

  static contentValidation() {
    return { required: (val) => val.trim() !== '' };
  }

  constructor(props) {
    super(props);
    this.state = { warning: false, initialContent: props.content };
  }

  render() {
    const { index, type, labelHasError, contentRequiredError, templateId } = this.props;
    const thesauris = this.props.thesauris.toJS();

    const options = (0, _lodash.orderBy)(
    thesauris.
    filter((thesaurus) => thesaurus._id !== templateId && thesaurus.type !== 'template').
    map((thesaurus) => _objectSpread(_objectSpread({},
    thesaurus), {}, {
      name: (0, _I18N.t)(thesaurus._id, thesaurus.name, null, false) })),

    'name');


    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: `form-group${labelHasError ? ' has-error' : ''}` }, void 0, /*#__PURE__*/
      _jsx("label", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Label")), /*#__PURE__*/

      _jsx(_reactReduxForm.Field, { model: `template.data.properties[${index}].label` }, void 0, /*#__PURE__*/
      _jsx("input", { className: "form-control" }))), /*#__PURE__*/



      _jsx("div", { className: contentRequiredError ? 'form-group has-error' : 'form-group' }, void 0, /*#__PURE__*/
      _jsx("label", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Select list"), /*#__PURE__*/
      _jsx("span", { className: "required" }, void 0, "*")),

      this.state.warning && /*#__PURE__*/
      _jsx(_Layout.Warning, { inline: true }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "All entities and documents that have already this property assigned will loose its current value")), /*#__PURE__*/





      _jsx(_ReactReduxForms.Select, {
        model: `template.data.properties[${index}].content`,
        options: options,
        optionsLabel: "name",
        optionsValue: "_id" })), /*#__PURE__*/



      _jsx(_PropertyConfigOptions.default, { index: index, type: type })));


  }}


FormConfigSelect.defaultProps = {
  labelHasError: false,
  contentRequiredError: false,
  templateId: '',
  content: '' };













function mapStateToProps(state, props) {
  const { template, thesauris } = state;
  return {
    labelHasError: (0, _checkErrorsOnLabel.checkErrorsOnLabel)(state, props),
    contentRequiredError:
    template.formState.$form.errors[`properties.${props.index}.content.required`] &&
    template.formState.$form.submitFailed,
    templateId: template.data._id,
    thesauris,
    content: template.data.properties[props.index].content };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(FormConfigSelect);exports.default = _default;