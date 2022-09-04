"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.dropTarget = exports.default = exports.MetadataTemplate = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDnd = require("react-dnd");

var _propTypes = _interopRequireDefault(require("prop-types"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");
var _UI = require("../../UI");




var _Forms = require("../../Forms");
var _ColorPicker = _interopRequireDefault(require("../../Forms/components/ColorPicker"));
var _I18N = require("../../I18N");
var _Notifications = require("../../Notifications");
var _notificationsActions = require("../../Notifications/actions/notificationsActions");
var _templateActions = require("../actions/templateActions");





var _MetadataProperty = _interopRequireDefault(require("./MetadataProperty"));
var _RemovePropertyConfirm = _interopRequireDefault(require("./RemovePropertyConfirm"));
var _AddThesaurusButton = require("../../Thesauri/components/AddThesaurusButton");
var _AddRelationshipTypeButton = require("../../RelationTypes/components/AddRelationshipTypeButton");
var _colors = require("../../utils/colors");


var _TemplateAsPageControl = require("./TemplateAsPageControl");
var _ValidateTemplate = _interopRequireDefault(require("./ValidateTemplate"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


















const getTemplateDefaultColor = (allTemplates, template) =>
template.data.color ? template.data.color : _colors.COLORS[allTemplates.size % _colors.COLORS.length];

class MetadataTemplate extends _react.Component {




































  constructor(props) {
    super(props);_defineProperty(this, "confirmation", { templateConflict: { title: 'Template conflict', key: 'Mapping conflict error', text: `A reindex of your collection is necessary. The reason may vary
       -- from certain changes made to a template's property to new fields
       that need to be populated across entities.
       This process will not negatively affect the data in your collection.
       It can last a few minutes and some parts of your collection might take
       some time to reappear in the Library, but this is temporary. Do you want to continue?` }, largeNumberOfEntities: { title: 'Lengthy reindex process', key: 'Template with a long number of entities', text: `The template has changed and the associated entities will be re-indexed,
      this process may take several minutes, do you want to continue?` } });_defineProperty(this, "onSubmit", async (_template) => {var _template$properties;const template = _objectSpread({}, _template);
      if (this.props.environment === 'relationType') {
        template.commonProperties = undefined;
      }
      template.properties = (_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.map((_prop) => {
        const prop = _objectSpread({}, _prop);
        prop.label = _prop.label.trim();
        return prop;
      });
      if (template._id) {
        const entitiesCountOfTemplate = await (0, _templateActions.countByTemplate)(template);
        const lengthyReindexFloorCount = 30000;
        if (entitiesCountOfTemplate >= lengthyReindexFloorCount) {
          return this.confirmAndSaveTemplate(template, 'largeNumberOfEntities');
        }
      }
      try {
        await this.props.saveTemplate(template);
      } catch (e) {
        if (e.status === 409) return this.confirmAndSaveTemplate(template, 'templateConflict');
      }
    });this.onSubmit = this.onSubmit.bind(this);this.onSubmitFailed = this.onSubmitFailed.bind(this);}

  onSubmitFailed() {
    this.props.notify((0, _I18N.t)('System', 'The template contains errors', null, false), 'danger');
  }

  confirmAndSaveTemplate(
  template,
  confirmationKey)
  {
    return this.context.confirm({
      accept: () => {
        try {
          this.props.saveTemplate(_objectSpread(_objectSpread({}, template), {}, { reindex: confirmationKey === 'templateConflict' }));
        } catch (e) {
          if (e.status === 409) return this.confirmAndSaveTemplate(template, 'templateConflict');
        }
      },

      cancel: () => {},
      title: this.confirmation[confirmationKey].title,
      messageKey: this.confirmation[confirmationKey].key,
      message: this.confirmation[confirmationKey].text,
      type: 'success',
      acceptLabel: 'Confirm',
      zIndex: 99 });

  }

  render() {
    const { connectDropTarget, defaultColor, environment, syncedTemplate } = this.props;
    const commonProperties = this.props.commonProperties || [];
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_RemovePropertyConfirm.default, {}), /*#__PURE__*/
      _jsx(_reactReduxForm.Form, {
        model: "template.data",
        onSubmit: this.onSubmit,
        onSubmitFailed: this.onSubmitFailed,
        className: "metadataTemplate",
        validators: (0, _ValidateTemplate.default)(
        this.props.properties,
        commonProperties,
        this.props.templates.toJS(),
        this.props._id) }, void 0,


      environment === 'template' && syncedTemplate && /*#__PURE__*/
      _jsx("div", { className: "metadataTemplate-sync" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "exclamation-triangle" }), " \xA0", /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "syncedTemplateEditorMessage" }, void 0, "This template is synced from another instance. Only entity view page can be enabled.")), /*#__PURE__*/





      _jsx("div", { className: "metadataTemplate-heading" }, void 0, /*#__PURE__*/
      _jsx(_Forms.FormGroup, { model: ".name" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: ".name" }, void 0, /*#__PURE__*/
      _jsx("input", {
        placeholder: "Template name",
        className: "form-control",
        disabled: syncedTemplate }))),



      defaultColor && !(environment === 'relationType') && /*#__PURE__*/
      _jsx(_reactReduxForm.Control, {
        model: ".color",
        component: _ColorPicker.default,
        defaultValue: defaultColor,
        mapProps: {
          defaultValue: (props) => props.defaultValue },

        disabled: syncedTemplate })),




      environment === 'template' && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("div", { className: "metadataTemplate-pageview" }, void 0, /*#__PURE__*/
      _jsx(_Forms.FormGroup, { model: ".entityViewPage" }, void 0, /*#__PURE__*/
      _jsx(_TemplateAsPageControl.TemplateAsPageControl, { selectedPage: this.props.entityViewPage || '' }))),


      connectDropTarget( /*#__PURE__*/
      _jsx("ul", { className: "metadataTemplate-list list-group" }, void 0,
      commonProperties.map((property, index) => /*#__PURE__*/
      _react.default.createElement(_MetadataProperty.default, _extends({},
      property, {
        key: property.localID,
        localID: property.localID,
        index: index - commonProperties.length,
        syncedTemplate: syncedTemplate }))),


      this.props.properties.map((property, index) => /*#__PURE__*/
      _jsx(_MetadataProperty.default, {
        _id: property._id,
        type: property.type,
        inserting: property.inserting,

        localID: property.localID,
        index: index,
        syncedTemplate: syncedTemplate }, property.localID)),


      !syncedTemplate && /*#__PURE__*/
      _jsx("div", { className: "no-properties" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "no-properties-wrap" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "clone" }), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Drag properties here")))))), /*#__PURE__*/








      _jsx("div", { className: "settings-footer remove-extra-nesting" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: this.props.backUrl, className: "btn btn-default btn-plain" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "arrow-left", directionAware: true }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Back")))),



      environment === 'template' && /*#__PURE__*/
      _jsx("div", { className: "btn-cluster lg-margin-left-12 sm-order-1 sm-footer-extra-row" }, void 0, /*#__PURE__*/
      _jsx(_AddThesaurusButton.AddThesaurusButton, {}), /*#__PURE__*/
      _jsx(_AddRelationshipTypeButton.AddRelationshipTypeButton, {})), /*#__PURE__*/


      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: this.props.backUrl, className: "btn btn-default btn-extra-padding" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Cancel"))), /*#__PURE__*/


      _jsx("button", {
        type: "submit",
        className: "btn btn-success save-template btn-extra-padding",
        disabled: !!this.props.savingTemplate }, void 0, /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Save"))))))));







  }}


/* eslint-disable react/forbid-prop-types, react/require-default-props */exports.MetadataTemplate = MetadataTemplate;_defineProperty(MetadataTemplate, "contextTypes", { confirm: _propTypes.default.func });_defineProperty(MetadataTemplate, "defaultProps", { notify: _notificationsActions.notify, /* eslint-disable react/default-props-match-prop-types */saveTemplate: _templateActions.saveTemplate, environment: 'template', /* eslint-enable react/default-props-match-prop-types */savingTemplate: false, defaultColor: null, properties: [] });
















/* eslint-enable react/forbid-prop-types, react/require-default-props */

const target = {
  canDrop() {
    return true;
  },

  drop(props, monitor) {
    const item = monitor.getItem();

    const propertyAlreadyAdded = props.properties[item.index];

    if (propertyAlreadyAdded) {
      props.inserted(item.index);
      return {};
    }

    props.addProperty({ label: item.label, type: item.type }, props.properties.length);
    return { name: 'container' };
  } };


const dropTarget = (0, _reactDnd.DropTarget)('METADATA_OPTION', target, (connector) => ({
  connectDropTarget: connector.dropTarget() }))(
MetadataTemplate);exports.dropTarget = dropTarget;

const mapStateToProps = (
{
  template,
  templates,
  relationTypes },















props) =>
{
  const environment = props.relationType ? 'relationType' : 'template';
  const _templates = environment === 'relationType' ? relationTypes : templates;
  return {
    _id: template.data._id,
    commonProperties: template.data.commonProperties,
    properties: template.data.properties,
    entityViewPage: template.data.entityViewPage,
    syncedTemplate: template.data.synced,
    templates: _templates,
    savingTemplate: template.uiState.get('savingTemplate'),
    defaultColor: getTemplateDefaultColor(templates, template),
    environment };

};exports.mapStateToProps = mapStateToProps;

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  { inserted: _templateActions.inserted, addProperty: _templateActions.addProperty, setErrors: _reactReduxForm.actions.setErrors, notify: _Notifications.notificationActions.notify },
  dispatch);

}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, { withRef: true })(dropTarget);exports.default = _default;