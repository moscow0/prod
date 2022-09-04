"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.FormConfigRelationship = void 0;exports.mapStateToProps = mapStateToProps;var _reactReduxForm = require("react-redux-form");
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reselect = require("reselect");

var _ReactReduxForms = require("../../ReactReduxForms");
var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _PropertyConfigOptions = _interopRequireDefault(require("./PropertyConfigOptions"));
var _Tip = _interopRequireDefault(require("../../Layout/Tip"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class FormConfigRelationship extends _react.Component {
  static contentValidation() {
    return { required: (val) => val && val.trim() !== '' };
  }

  constructor(props) {
    super(props);
    this.state = { inherit: props.showInheritSelect };
    this.onInheritChange = this.onInheritChange.bind(this);
    this.onInheritTypeChange = this.onInheritTypeChange.bind(this);
  }

  onInheritChange() {
    const { index } = this.props;
    if (this.state.inherit) {
      this.props.resetFormValue(`template.data.properties[${index}].inherit.property`);
    }
    this.props.resetFormValue(`template.data.properties[${index}].filter`);
    this.setState((prevState) => ({ inherit: !prevState.inherit }));
  }

  onInheritTypeChange() {
    const { index } = this.props;
    this.props.resetFormValue(`template.data.properties[${index}].filter`);
  }

  render() {
    const {
      index,
      type,
      labelError,
      relationTypeError,
      templates,
      relationTypes,
      templateId,
      showInheritOption,
      templateProperties,
      inheritSelectPropertyType } =
    this.props;

    const options = templates.toJS().filter((template) => template._id !== templateId);

    const labelClass = labelError ? 'form-group has-error' : 'form-group';
    const canBeFilter =
    !this.state.inherit ||
    this.state.inherit &&
    !['image', 'geolocation', 'preview', 'media', 'link'].includes(inheritSelectPropertyType);
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: labelClass }, void 0, /*#__PURE__*/
      _jsx("label", { htmlFor: "label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Label")), /*#__PURE__*/

      _jsx(_reactReduxForm.Field, { model: `template.data.properties[${index}].label` }, void 0, /*#__PURE__*/
      _jsx("input", { id: "label", className: "form-control" }))), /*#__PURE__*/


      _jsx("div", { className: relationTypeError ? 'form-group has-error' : 'form-group' }, void 0, /*#__PURE__*/
      _jsx("label", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Relationship"), /*#__PURE__*/
      _jsx("span", { className: "required" }, void 0, "*")), /*#__PURE__*/

      _jsx(_ReactReduxForms.Select, {
        model: `template.data.properties[${index}].relationType`,
        options: relationTypes.toJS(),
        optionsLabel: "name",
        validators: FormConfigRelationship.contentValidation(),
        optionsValue: "_id" })), /*#__PURE__*/


      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx("label", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Entities")), /*#__PURE__*/

      _jsx(_ReactReduxForms.Select, {
        model: `template.data.properties[${index}].content`,
        options: options,
        optionsLabel: "name",
        placeholder: "Any entity or document",
        optionsValue: "_id" })),


      showInheritOption && /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("label", { className: "property-label", htmlFor: `inherit${index}` }, void 0, /*#__PURE__*/
      _jsx("input", {
        id: `inherit${index}`,
        type: "checkbox",
        checked: this.state.inherit,
        onChange: this.onInheritChange }),
      ' ', /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Inherit property")), /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This property will be inherited from the related entities and shown as metadata of this type of entities."))),






      this.state.inherit && /*#__PURE__*/
      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx(_ReactReduxForms.Select, {
        model: `template.data.properties[${index}].inherit.property`,
        options: templateProperties,
        onChange: this.onInheritTypeChange,
        optionsLabel: "label",
        optionsValue: "_id" })),



      this.state.inherit && inheritSelectPropertyType === 'geolocation' && /*#__PURE__*/
      _jsx("div", { className: "geolocation-grouping-alert" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "info-circle" }), /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Adjacent geolocation properties will render on the same map"), ".")), /*#__PURE__*/



      _jsx(_PropertyConfigOptions.default, { canBeFilter: canBeFilter, index: index, type: type })));


  }}exports.FormConfigRelationship = FormConfigRelationship;


FormConfigRelationship.defaultProps = {
  labelError: false,
  relationTypeError: false,
  showInheritOption: false,
  showInheritSelect: false,
  templateId: null,
  inheritSelectPropertyType: null };

















const getTemplateProperties = (0, _reselect.createSelector)(
(state) => state.templates,
(state, props) =>
state.template.formState.properties[props.index].content ?
state.template.formState.properties[props.index].content.value :
null,
(templates, content) => {
  const targetTemplate = templates.find((t) => t.get('_id') === content);
  return targetTemplate ? targetTemplate.get('properties').toJS() : [];
});


const getInheritSelectPropertyType = (0, _reselect.createSelector)(
getTemplateProperties,
(state, props) => {var _state$template$data$;return (_state$template$data$ = state.template.data.properties[props.index].inherit) === null || _state$template$data$ === void 0 ? void 0 : _state$template$data$.property;},
(templateProperties, inheritedPropertyId) => {
  const inheritedProperty = templateProperties.find((p) => p._id === inheritedPropertyId);
  return inheritedProperty && inheritedProperty.type;
});


function mapStateToProps(state, props) {var _template$formState$p, _template$formState$p2;
  const { template, templates, relationTypes } = state;

  const templateProperties = getTemplateProperties(state, props);

  return {
    labelError:
    template.formState.$form.errors[`properties.${props.index}.label.required`] ||
    template.formState.$form.errors[`properties.${props.index}.label.duplicated`],

    relationTypeError:
    template.formState.$form.errors[`properties.${props.index}.relationType.required`] &&
    template.formState.$form.submitFailed,

    showInheritOption: Boolean(
    template.formState.properties[props.index].content && templateProperties.length),


    showInheritSelect: Boolean(
    ((_template$formState$p = template.formState.properties[props.index].inherit) === null || _template$formState$p === void 0 ? void 0 : (_template$formState$p2 = _template$formState$p.property) === null || _template$formState$p2 === void 0 ? void 0 : _template$formState$p2.value) &&
    templateProperties.length),

    inheritSelectPropertyType: getInheritSelectPropertyType(state, props),
    templateProperties,
    templateId: template.data._id,
    templates,
    relationTypes };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    resetFormValue: (model) => _reactReduxForm.actions.reset(model) },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FormConfigRelationship);exports.default = _default;