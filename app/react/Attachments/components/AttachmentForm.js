"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.AttachmentForm = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");

var _ReactReduxForms = require("../../ReactReduxForms");
var _languagesList = require("../../../shared/languagesList");
var _t = _interopRequireDefault(require("../../I18N/t"));
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class AttachmentForm extends _react.Component {
  render() {
    const { model } = this.props;
    const validators = { originalname: { required: (val) => !!val && val.trim() !== '' } };
    const languageOptions = Object.keys(_languagesList.elasticLanguages).map((key) => ({
      value: _languagesList.elasticLanguages[key].franc,
      label: _languagesList.elasticLanguages[key].elastic }));

    languageOptions.push({ value: 'other', label: 'other' });

    return /*#__PURE__*/(
      _jsx(_reactReduxForm.Form, {
        id: "attachmentForm",
        model: model,
        onSubmit: this.props.onSubmit,
        validators: validators }, void 0, /*#__PURE__*/

      _jsx(_ReactReduxForms.FormGroup, { model: model, field: "originalname" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: ".originalname" }, void 0, /*#__PURE__*/
      _jsx("input", { className: "form-control" }))), /*#__PURE__*/


      _jsx(_ShowIf.default, { if: this.props.isSourceDocument }, void 0, /*#__PURE__*/
      _jsx(_ReactReduxForms.FormGroup, { className: "set-language" }, void 0, /*#__PURE__*/
      _jsx("label", {}, void 0, (0, _t.default)('System', 'Language')), /*#__PURE__*/
      _jsx(_ReactReduxForms.Select, { model: ".language", className: "form-control", options: languageOptions })))));




  }}exports.AttachmentForm = AttachmentForm;var _default =








(0, _reactRedux.connect)()(AttachmentForm);exports.default = _default;