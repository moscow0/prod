"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.SemanticSearchMultieditPanel = void 0;exports.mapDispatchToProps = mapDispatchToProps;exports.mapStateToProps = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _I18N = require("../../I18N");
var metadataActions = _interopRequireWildcard(require("../../Metadata/actions/actions"));
var _Multireducer = require("../../Multireducer");
var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _immutable = _interopRequireDefault(require("immutable"));
var _UI = require("../../UI");
var _comonTemplate = _interopRequireDefault(require("../../Metadata/helpers/comonTemplate"));
var _MetadataForm = _interopRequireDefault(require("../../Metadata/components/MetadataForm"));
var _actions2 = require("../actions/actions");
var _reselect = require("reselect");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const getTemplates = (0, _reselect.createSelector)(
(s) => s.templates,
(templates) => templates.toJS());


const commonTemplateSelector = (0, _reselect.createSelector)(
getTemplates,
(s) => s.semanticSearch.multiedit,
_comonTemplate.default);


class SemanticSearchMultieditPanel extends _react.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
  }

  close() {
    this.props.resetForm(this.props.formKey);
    this.props.setEntities([]);
  }

  metadataFieldModified(key) {
    return (
      !this.props.formState.metadata[key].pristine && (
      !this.props.formState.metadata[key].$form ||
      !this.props.formState.metadata[key].$form.pristine));

  }

  save(formValues) {
    const { entities, template, formState, searchId } = this.props;
    const modifiedValues = { metadata: {} };
    Object.keys(formValues.metadata).forEach((key) => {
      if (this.metadataFieldModified(key)) {
        modifiedValues.metadata[key] = formValues.metadata[key];
      }
    });

    if (template.get('_id')) {
      modifiedValues.template = template.get('_id');
    }

    if (formState.icon && !formState.icon.pristine) {
      modifiedValues.icon = formValues.icon;
    }
    return this.props.multipleUpdate(entities, modifiedValues).then(() => {
      this.close();
      this.props.getSearch(searchId);
    });
  }

  changeTemplate(_formModel, template) {
    const updatedEntities = this.props.entities.map((entity) => entity.set('template', template));
    this.props.setEntities(updatedEntities);
  }

  cancel() {
    const { confirm } = this.context;
    confirm({
      accept: () => {
        this.close();
      },
      title: 'Confirm',
      message: 'Discard changes' });

  }

  renderEditingForm() {
    const { formKey, thesauris } = this.props;

    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("div", { className: "alert alert-warning" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "exclamation-triangle", size: "2x" }), /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Warning: you are editing multiple entities. Fields marked with a"), ' ', /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "exclamation-triangle" }), ' ', /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "will be updated with the same value."))), /*#__PURE__*/


      _jsx(_MetadataForm.default, {
        id: "multiEdit",
        model: formKey,
        onSubmit: this.save,
        thesauris: thesauris,
        template: this.props.template,
        changeTemplate: this.changeTemplate,
        multipleEdition: true })));



  }

  renderEditingButtons() {
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: this.cancel,
        className: "cancel-edit-metadata btn btn-primary" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Cancel'))), /*#__PURE__*/

      _jsx("button", { type: "submit", form: "multiEdit", className: "btn btn-success" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "save" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Save')))));



  }

  render() {
    const { open } = this.props;
    return /*#__PURE__*/(
      _jsx(_SidePanel.default, { open: open, className: "multi-edit" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", className: "closeSidepanel close-modal", onClick: this.close }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "times" }))), /*#__PURE__*/


      _jsx("div", { className: "sidepanel-body" }, void 0, this.renderEditingForm()), /*#__PURE__*/
      _jsx("div", { className: "sidepanel-footer" }, void 0, this.renderEditingButtons())));


  }}exports.SemanticSearchMultieditPanel = SemanticSearchMultieditPanel;


SemanticSearchMultieditPanel.defaultProps = {
  template: null,
  open: false };
















SemanticSearchMultieditPanel.contextTypes = {
  confirm: _propTypes.default.func };


const mapStateToProps = (state) => {
  const entities = state.semanticSearch.multiedit;
  return {
    template: commonTemplateSelector(state),
    thesauris: state.thesauris,
    entities,
    open: Boolean(entities.size),
    formState: state.semanticSearch.multipleEditForm };

};exports.mapStateToProps = mapStateToProps;

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)(
  {
    loadForm: metadataActions.loadTemplate,
    resetForm: metadataActions.resetReduxForm,
    setEntities: _actions2.setEditSearchEntities,
    getSearch: _actions2.getSearch,
    multipleUpdate: metadataActions.multipleUpdate },

  (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SemanticSearchMultieditPanel);exports.default = _default;