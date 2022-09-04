"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.FormConfigCommon = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactReduxForm = require("react-redux-form");
var _reactRedux = require("react-redux");

var _Tip = _interopRequireDefault(require("../../Layout/Tip"));
var _PropertyConfigOption = _interopRequireDefault(require("./PropertyConfigOption"));
var _I18N = require("../../I18N");
var _PrioritySortingLabel = _interopRequireDefault(require("./PrioritySortingLabel"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class FormConfigCommon extends _react.Component {
  getZeroIndex() {
    const { index, data } = this.props;
    const baseZeroIndex = index + data.commonProperties.length;
    return baseZeroIndex;
  }

  renderTitleField() {
    const { index, formState } = this.props;
    let labelClass = 'form-group';
    const labelKey = `commonProperties.${this.getZeroIndex()}.label`;
    const requiredLabel = formState.$form.errors[`${labelKey}.required`];
    const duplicatedLabel = formState.$form.errors[`${labelKey}.duplicated`];
    if (requiredLabel || duplicatedLabel) {
      labelClass += ' has-error';
    }

    return /*#__PURE__*/(
      _jsx("div", { className: labelClass }, void 0, /*#__PURE__*/
      _jsx("label", { htmlFor: `label${index}` }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Name")), /*#__PURE__*/

      _jsx(_reactReduxForm.Field, { model: `template.data.commonProperties[${this.getZeroIndex()}].label` }, void 0, /*#__PURE__*/
      _jsx("input", { id: `label${index}`, className: "form-control" }))));



  }

  render() {
    const { index, data } = this.props;
    const property = data.commonProperties[this.getZeroIndex()];

    return /*#__PURE__*/(
      _jsx("div", {}, void 0,
      property.name === 'title' && this.renderTitleField(), /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: `template.data.commonProperties[${this.getZeroIndex()}].prioritySorting` }, void 0, /*#__PURE__*/
      _jsx("input", { id: `prioritySorting${index}`, type: "checkbox" }), "\xA0", /*#__PURE__*/

      _jsx(_PrioritySortingLabel.default, { htmlFor: `prioritySorting${index}` })),

      property.name === 'title' && /*#__PURE__*/
      _jsx(_PropertyConfigOption.default, {
        label: "Generated ID",
        model: `template.data.commonProperties[${this.getZeroIndex()}].generatedId` }, void 0, /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "A generated ID will be the default title.")))));





  }}exports.FormConfigCommon = FormConfigCommon;








function mapStateToProps({ template }) {
  return {
    data: template.data,
    formState: template.formState };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(FormConfigCommon);exports.default = _default;