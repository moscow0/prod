"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _templateActions = require("../actions/templateActions");
var _reactReduxForm = require("react-redux-form");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _ViolatedArticlesNestedProperties = _interopRequireDefault(require("./ViolatedArticlesNestedProperties"));
var _PropertyConfigOptions = _interopRequireDefault(require("./PropertyConfigOptions"));
var _checkErrorsOnLabel = require("../utils/checkErrorsOnLabel");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class FormConfigNested extends _react.Component {
  constructor(props) {
    super(props);
    props.setNestedProperties(props.index, Object.keys(_ViolatedArticlesNestedProperties.default));
  }

  render() {
    const { index, type, labelHasError } = this.props;

    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: `form-group${labelHasError ? ' has-error' : ''}` }, void 0, /*#__PURE__*/
      _jsx("label", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Label")), /*#__PURE__*/

      _jsx(_reactReduxForm.Field, { model: `template.data.properties[${index}].label` }, void 0, /*#__PURE__*/
      _jsx("input", { className: "form-control" }))), /*#__PURE__*/



      _jsx(_reactReduxForm.Field, { model: `template.data.properties[${index}].required` }, void 0, /*#__PURE__*/
      _jsx("input", { id: `required${this.props.index}`, type: "checkbox" }), "\xA0", /*#__PURE__*/

      _jsx("label", { className: "property-label", htmlFor: `required${this.props.index}` }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Required property"), /*#__PURE__*/
      _jsx("span", { className: "property-help" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "question-circle" }), /*#__PURE__*/
      _jsx("div", { className: "property-description" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "You won't be able to save an entity if this property is empty."))))), /*#__PURE__*/






      _jsx(_PropertyConfigOptions.default, { index: index, type: type })));


  }}


FormConfigNested.defaultProps = {
  labelHasError: false };











function mapStateToProps(state, props) {
  return {
    labelHasError: (0, _checkErrorsOnLabel.checkErrorsOnLabel)(state, props) };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ setNestedProperties: _templateActions.setNestedProperties }, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FormConfigNested);exports.default = _default;