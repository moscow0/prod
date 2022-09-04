"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactReduxForm = require("react-redux-form");
var _reactRedux = require("react-redux");
var _UI = require("../../UI");

var _I18N = require("../../I18N");
var _ReactReduxForms = require("../../ReactReduxForms");
var _Tip = _interopRequireDefault(require("../../Layout/Tip"));

var _FilterSuggestions = require("./FilterSuggestions");
var _PropertyConfigOption = _interopRequireDefault(require("./PropertyConfigOption"));
var _checkErrorsOnLabel = require("../utils/checkErrorsOnLabel");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const style = (index) => /*#__PURE__*/
_jsx("div", {}, void 0, /*#__PURE__*/
_jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
_jsx("label", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Style")), /*#__PURE__*/

_jsx(_ReactReduxForms.Select, {
  model: `template.data.properties[${index}].style`,
  options: [
  { _id: 'contain', name: 'Fit' },
  { _id: 'cover', name: 'Fill' }],

  optionsLabel: "name",
  optionsValue: "_id" })), /*#__PURE__*/


_jsx("div", { className: "protip" }, void 0, /*#__PURE__*/
_jsx("p", {}, void 0, /*#__PURE__*/
_jsx("b", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Fit")), "\xA0", /*#__PURE__*/


_jsx(_I18N.Translate, { translationKey: "Multimedia fit description" }, void 0, "will show the entire media inside the container."), /*#__PURE__*/


_jsx("br", {}), /*#__PURE__*/
_jsx("b", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Fill")), "\xA0", /*#__PURE__*/


_jsx(_I18N.Translate, { translationKey: "Multimedia fill description" }, void 0, "will attempt to fill the container, using it's entire width. In cards, cropping is likely to occur."))));








class FormConfigMultimedia extends _react.Component {
  render() {
    const { index, canShowInCard, helpText, canSetStyle, canBeRequired, labelHasError } =
    this.props;

    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: `form-group${labelHasError ? ' has-error' : ''}` }, void 0, /*#__PURE__*/
      _jsx("label", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Name")), /*#__PURE__*/

      _jsx(_reactReduxForm.Field, { model: `template.data.properties[${index}].label` }, void 0, /*#__PURE__*/
      _jsx("input", { className: "form-control" }))),



      helpText && /*#__PURE__*/
      _jsx("div", { className: "protip" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "lightbulb" }), /*#__PURE__*/
      _jsx("span", {}, void 0, helpText)), /*#__PURE__*/



      _jsx(_PropertyConfigOption.default, {
        label: "Hide label",
        model: `template.data.properties[${index}].noLabel` }, void 0, /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This property will be shown without the label."))), /*#__PURE__*/


      _jsx(_PropertyConfigOption.default, {
        label: "Full width",
        model: `template.data.properties[${index}].fullWidth` }, void 0, /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This property will be shown using all the width available."))),


      canBeRequired && /*#__PURE__*/
      _jsx(_PropertyConfigOption.default, {
        label: "Required property",
        model: `template.data.properties[${index}].required` }, void 0, /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "You won't be able to save an entity if this property is empty."))),





      canShowInCard && /*#__PURE__*/
      _jsx(_PropertyConfigOption.default, {
        label: "Show in cards",
        model: `template.data.properties[${index}].showInCard` }, void 0, /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This property will appear in the library cards as part of the basic info."))),






      canSetStyle && style(index), /*#__PURE__*/
      _jsx(_FilterSuggestions.FilterSuggestions, { index: index })));


  }}


FormConfigMultimedia.defaultProps = {
  canShowInCard: true,
  canSetStyle: true,
  canBeRequired: true,
  labelHasError: false,
  helpText: '' };











function mapStateToProps(state, props) {
  return {
    labelHasError: (0, _checkErrorsOnLabel.checkErrorsOnLabel)(state, props) };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(FormConfigMultimedia);exports.default = _default;