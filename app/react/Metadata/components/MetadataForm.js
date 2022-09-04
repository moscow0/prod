"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.MetadataForm = void 0;var _filterBaseProperties = _interopRequireDefault(require("../../Entities/utils/filterBaseProperties"));
var _Forms = require("../../Forms");
var _I18N = require("../../I18N");
var _Notifications = require("../../Notifications");
var _ReactReduxForms = require("../../ReactReduxForms");
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");
var _redux = require("redux");
var _reselect = require("reselect");
var _UI = require("../../UI");
var _ = require("./..");
var _defaultTemplate = _interopRequireDefault(require("../helpers/defaultTemplate"));
var _validator = _interopRequireDefault(require("../helpers/validator"));
var _IconField = require("./IconField");
var _MetadataFormFields = _interopRequireDefault(require("./MetadataFormFields"));
var _MetadataExtractor = require("./MetadataExtractor");
var _SupportingFiles = require("./SupportingFiles");
var _PDFUpload = require("./PDFUpload");
var _DeleteSelectionButton = require("./DeleteSelectionButton");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const immutableDefaultTemplate = _immutable.default.fromJS(_defaultTemplate.default);
const selectTemplateOptions = (0, _reselect.createSelector)(
(s) => s.templates,
(templates) => templates.map((tmpl) => ({ label: tmpl.get('name'), value: tmpl.get('_id') })));


class MetadataForm extends _react.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailed = this.onSubmitFailed.bind(this);
  }

  componentWillUnmount() {
    this.props.componentWillUnmount();
  }

  onSubmit(entity) {
    this.props.onSubmit(
    (0, _.wrapEntityMetadata)(_filterBaseProperties.default.filterBaseProperties(entity)),
    this.props.model);

  }

  onSubmitFailed() {
    this.props.notify((0, _I18N.t)('System', 'Invalid form', null, false), 'danger');
  }

  renderTemplateSelect(templateOptions, template) {
    if (templateOptions.size) {
      const sortedTemplates = templateOptions.toJS().sort((a, b) => a.label > b.label ? 1 : -1);

      return /*#__PURE__*/(
        _jsx(_ReactReduxForms.FormGroup, {}, void 0, /*#__PURE__*/
        _jsx("ul", { className: "search__filter" }, void 0, /*#__PURE__*/
        _jsx("li", {}, void 0, /*#__PURE__*/
        _jsx("label", {}, void 0, (0, _I18N.t)('System', 'Type'))), /*#__PURE__*/

        _jsx("li", { className: "wide" }, void 0,
        this.props.initialTemplateId !== undefined &&
        this.props.initialTemplateId !== this.props.templateId && /*#__PURE__*/
        _jsx("span", {}, void 0, /*#__PURE__*/
        _jsx(_UI.Icon, { icon: "exclamation-triangle" }), /*#__PURE__*/
        _jsx(_I18N.Translate, { context: "System" }, void 0, "Changing the type will erase all connections to this entity."))), /*#__PURE__*/





        _jsx("li", { className: "wide" }, void 0, /*#__PURE__*/
        _jsx(_Forms.Select, {
          className: "form-control",
          value: template.get('_id'),
          options: sortedTemplates,
          onChange: (e) => {
            this.props.changeTemplate(this.props.model, e.target.value);
          } })))));





    }

    return /*#__PURE__*/(
      _jsx("ul", { className: "search__filter" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "text-center protip" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "lightbulb" }), ' ', /*#__PURE__*/
      _jsx("b", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "ProTip!")), /*#__PURE__*/

      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "You can create metadata templates in"), ' ', /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: "/settings" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "settings")), "."))));






  }

  render() {
    const {
      model,
      template,
      templateOptions,
      id,
      multipleEdition,
      showSubset,
      version,
      storeKey,
      highlightedProps,
      attachments,
      sharedId,
      progress } =
    this.props;

    if (!template) {
      return /*#__PURE__*/_jsx("div", {});
    }
    const titleLabel = template.get('commonProperties') ?
    template.
    get('commonProperties').
    find((p) => p.get('name') === 'title').
    get('label') :
    'Title';

    return /*#__PURE__*/(
      _jsx("fieldset", { disabled: progress !== undefined }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Form, {
        id: id,
        model: model,
        onSubmit: this.onSubmit,
        validators: _validator.default.generate(template.toJS(), multipleEdition),
        onSubmitFailed: this.onSubmitFailed }, void 0,

      !multipleEdition && (!showSubset || showSubset.includes('title')) && /*#__PURE__*/
      _jsx(_ReactReduxForms.FormGroup, { model: ".title" }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "search__filter" }, void 0, /*#__PURE__*/
      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx("label", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { context: template.get('_id') }, void 0, titleLabel), ' ', /*#__PURE__*/
      _jsx("span", { className: "required" }, void 0, "*"))), /*#__PURE__*/


      _jsx("li", { className: "wide" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "metadata-extractor-container" }, void 0,
      storeKey === 'documentViewer' && /*#__PURE__*/
      _jsx(_MetadataExtractor.MetadataExtractor, { fieldName: "title", model: `${model}.title` }), /*#__PURE__*/

      _jsx(_reactReduxForm.Field, { model: ".title" }, void 0, /*#__PURE__*/
      _jsx("textarea", { className: "form-control" })))), /*#__PURE__*/



      _jsx("div", { className: "form-title-actions" }, void 0,
      storeKey === 'documentViewer' && /*#__PURE__*/_jsx(_DeleteSelectionButton.DeleteSelectionButton, { propertyName: "title" }), /*#__PURE__*/
      _jsx(_IconField.IconField, { model: model })))),





      (!showSubset || showSubset.includes('template')) &&
      this.renderTemplateSelect(templateOptions, template), /*#__PURE__*/
      _jsx(_MetadataFormFields.default, {
        multipleEdition: multipleEdition,
        thesauris: this.props.thesauris,
        model: model,
        template: template,
        showSubset: showSubset,
        version: version,
        highlightedProps: highlightedProps,
        storeKey: storeKey }),

      !multipleEdition && !showSubset && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_PDFUpload.PDFUpload, { entitySharedID: sharedId, model: model }), /*#__PURE__*/
      _jsx(_SupportingFiles.SupportingFiles, {
        supportingFiles: attachments,
        entitySharedID: sharedId,
        model: model })))));






  }}exports.MetadataForm = MetadataForm;


MetadataForm.defaultProps = {
  id: 'metadataForm',
  multipleEdition: false,
  showSubset: undefined,
  version: undefined,
  initialTemplateId: undefined,
  componentWillUnmount: () => {},
  notify: () => {},
  changeTemplate: () => {},
  onSubmit: () => {},
  highlightedProps: [],
  storeKey: '',
  attachments: [],
  sharedId: '',
  progress: undefined };























function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ notify: _Notifications.notificationActions.notify }, dispatch);
}
const mapStateToProps = (state, ownProps) => {
  const entityModel = ownProps.model.split('.').reduce((o, i) => o[i], state);
  const { attachments, sharedId } = entityModel;
  return {
    thesauris: ownProps.thesauris ? ownProps.thesauris : state.thesauris || _immutable.default.fromJS([]),
    template: ownProps.template ?
    ownProps.template :
    state.templates.find((tmpl) => tmpl.get('_id') === ownProps.templateId) ||
    immutableDefaultTemplate,
    templateOptions: selectTemplateOptions(state),
    attachments,
    sharedId,
    progress: sharedId ?
    state.attachments.progress.get(sharedId) :
    state.attachments.progress.get('NEW_ENTITY') };

};exports.mapStateToProps = mapStateToProps;var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MetadataForm);exports.default = _default;