"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.RelationTypeForm = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactReduxForm = require("react-redux-form");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _Layout = require("../../Layout");
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _FormGroup = _interopRequireDefault(require("../../DocumentForm/components/FormGroup"));
var _relationTypeActions = require("../actions/relationTypeActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class RelationTypeForm extends _react.Component {
  componentWillUnmount() {
    this.props.resetForm('relationType');
    this.props.setInitial('relationType');
  }

  validation(relationTypes, id) {
    return {
      name: {
        required: (val) => val && val.trim() !== '',
        duplicated: (val) => {
          const name = val || '';
          return !relationTypes.find(
          (relationType) =>
          relationType._id !== id &&
          relationType.name.trim().toLowerCase() === name.trim().toLowerCase());

        } } };


  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "relationType" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Form, {
        model: "relationType",
        onSubmit: this.props.saveRelationType,
        validators: this.validation(this.props.relationTypes.toJS(), this.props.relationType._id) }, void 0, /*#__PURE__*/

      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _react.default.createElement(_FormGroup.default, _extends({}, this.props.state.name, { submitFailed: this.props.state.submitFailed }), /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: ".name" }, void 0, /*#__PURE__*/
      _jsx("input", {
        id: "relationTypeName",
        className: "form-control",
        type: "text",
        placeholder: "Connection name" }),

      (() => {
        if (
        this.props.state.dirty &&
        this.props.state.fields.name &&
        this.props.state.fields.name.errors.duplicated)
        {
          return /*#__PURE__*/(
            _jsx("div", { className: "validation-error" }, void 0, /*#__PURE__*/
            _jsx(_UI.Icon, { icon: "exclamation-triangle" }), ' ', /*#__PURE__*/
            _jsx(_I18N.Translate, {}, void 0, "Duplicated name")));


        }
      })()))), /*#__PURE__*/



      _jsx("div", { className: "panel-body" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Currently connections only need a title.")), /*#__PURE__*/

      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx(_Layout.BackButton, { to: "/settings/connections" }), /*#__PURE__*/
      _jsx("button", { type: "submit", className: "btn btn-success save-template" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "save" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Save"))))))));







  }}exports.RelationTypeForm = RelationTypeForm;












function mapStateToProps(state) {
  return {
    relationType: state.relationType,
    relationTypes: state.relationTypes,
    state: state.relationTypeForm };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    saveRelationType: _relationTypeActions.saveRelationType,
    resetRelationType: _relationTypeActions.resetRelationType,
    resetForm: _reactReduxForm.actions.reset,
    setInitial: _reactReduxForm.actions.setInitial },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RelationTypeForm);exports.default = _default;