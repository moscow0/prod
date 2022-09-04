"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.SelectMultiplePanel = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _I18N = require("../../I18N");
var _actions = require("../../Entities/actions/actions");
var metadataActions = _interopRequireWildcard(require("../actions/actions"));
var _reselect = require("reselect");
var _Multireducer = require("../../Multireducer");
var _advancedSort = require("../../utils/advancedSort");
var _ShareButton = require("../../Permissions/components/ShareButton");
var _TemplateLabel = _interopRequireDefault(require("../../Layout/TemplateLabel"));
var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _immutable = _interopRequireDefault(require("immutable"));
var _UI = require("../../UI");
var _Auth = require("../../Auth");
var _MetadataForm = _interopRequireDefault(require("./MetadataForm"));
var _comonTemplate = _interopRequireDefault(require("../helpers/comonTemplate"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const sortedTemplates = (0, _reselect.createSelector)(
(s) => s.templates,
(templates) => {
  const _templates = templates ? templates.toJS() : [];
  return (0, _advancedSort.advancedSort)(_templates, { property: 'name' });
});


const commonTemplate = (0, _reselect.createSelector)(sortedTemplates, (s) => s.entitiesSelected, _comonTemplate.default);

class SelectMultiplePanel extends _react.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.delete = this.delete.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
    this.edit = this.edit.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
  }

  close() {
    this.props.unselectAllDocuments();
    this.props.resetForm(this.props.formKey);
  }

  delete() {
    this.context.confirm({
      accept: () => {
        this.props.deleteEntities(this.props.entitiesSelected.toJS());
      },
      title: 'Confirm',
      message: 'Confirm delete multiple items' });

  }

  metadataFieldModified(key) {
    return (
      !this.props.formState.metadata[key].pristine && (
      !this.props.formState.metadata[key].$form ||
      !this.props.formState.metadata[key].$form.pristine));

  }

  save(formValues) {
    const modifiedValues = { metadata: {} };
    const template = this.props.template.toJS();
    Object.keys(formValues.metadata).forEach((key) => {
      if (this.metadataFieldModified(key)) {
        modifiedValues.metadata[key] = formValues.metadata[key];
      }
    });

    if (template._id) {
      modifiedValues.template = template._id;
    }

    if (this.props.formState.icon && !this.props.formState.icon.pristine) {
      modifiedValues.icon = formValues.icon;
    }

    return this.props.
    multipleUpdate(this.props.entitiesSelected, modifiedValues).
    then((updatedEntities) => {
      this.props.updateEntities(updatedEntities);
      this.props.unselectAllDocuments();
      this.props.resetForm(this.props.formKey);
    });
  }

  changeTemplate(_formModel, template) {
    const updatedEntities = this.props.entitiesSelected.map((entity) =>
    entity.set('template', template));

    this.props.updateSelectedEntities(updatedEntities);
  }

  cancel() {
    this.context.confirm({
      accept: () => {
        this.props.resetForm(this.props.formKey);
      },
      title: 'Confirm',
      message: 'Discard changes' });

  }

  edit() {
    this.props.loadForm(this.props.formKey, this.props.template.toJS());
  }

  sharedIds() {
    return this.props.entitiesSelected.map((entity) => entity.get('sharedId'));
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
      _jsx(_Auth.NeedAuthorization, {
        roles: ['admin', 'editor'],
        orWriteAccessTo: this.props.entitiesSelected.toJS() }, void 0, /*#__PURE__*/

      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: this.cancel,
        className: "cancel-edit-metadata btn btn-default" }, void 0, /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Cancel'))), /*#__PURE__*/

      _jsx("button", { type: "submit", form: "multiEdit", className: "btn btn-success" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Save'))))));




  }

  renderListButtons() {
    return /*#__PURE__*/(
      _jsx(_Auth.NeedAuthorization, {
        roles: ['admin', 'editor'],
        orWriteAccessTo: this.props.entitiesSelected.toJS() }, void 0, /*#__PURE__*/

      _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", onClick: this.edit, className: "edit btn btn-default" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "pencil-alt" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Edit'))), /*#__PURE__*/

      _jsx(_ShareButton.ShareButton, { sharedIds: this.sharedIds(), storeKey: this.props.storeKey })), /*#__PURE__*/

      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", className: "delete btn btn-danger", onClick: this.delete }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "trash-alt" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Delete'))))));




  }

  renderList() {
    const { entitiesSelected, getAndSelectDocument } = this.props;
    return /*#__PURE__*/(
      _jsx("ul", { className: "entities-list" }, void 0,
      entitiesSelected.map((entity, index) => {
        const onClick = getAndSelectDocument.bind(this, entity.get('sharedId'));
        return /*#__PURE__*/(
          _jsx("li", { onClick: onClick }, index, /*#__PURE__*/
          _jsx("span", { className: "entity-title" }, void 0,
          entity.get('title'), /*#__PURE__*/
          _jsx(_TemplateLabel.default, { template: entity.get('template') }))));



      })));


  }

  render() {
    const { entitiesSelected, open, editing } = this.props;
    return /*#__PURE__*/(
      _jsx(_SidePanel.default, { open: open, className: "multi-edit" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "check" }), ' ', /*#__PURE__*/
      _jsx("span", {}, void 0,
      entitiesSelected.size, " ", (0, _I18N.t)('System', 'selected')), /*#__PURE__*/

      _jsx("button", { type: "button", className: "closeSidepanel close-modal", onClick: this.close }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "times" }))), /*#__PURE__*/


      _jsx("div", { className: "sidepanel-body" }, void 0,
      !editing && this.renderList(),
      editing && this.renderEditingForm()), /*#__PURE__*/

      _jsx("div", { className: "sidepanel-footer" }, void 0,
      !editing && this.renderListButtons(),
      editing && this.renderEditingButtons())));



  }}exports.SelectMultiplePanel = SelectMultiplePanel;


SelectMultiplePanel.defaultProps = {
  entitiesSelected: _immutable.default.fromJS([]),
  template: null,
  open: false,
  editing: false };





















SelectMultiplePanel.contextTypes = {
  confirm: _propTypes.default.func };


const mapStateToProps = (_state, props) => ({
  template: commonTemplate(props),
  open: props.entitiesSelected.size > 1,
  editing: Object.keys(props.state || {}).length > 0 });exports.mapStateToProps = mapStateToProps;


function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)(
  {
    deleteEntities: _actions.deleteEntities,
    loadForm: metadataActions.loadTemplate,
    resetForm: metadataActions.resetReduxForm,
    multipleUpdate: metadataActions.multipleUpdate },

  (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));

}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SelectMultiplePanel);exports.default = _default;