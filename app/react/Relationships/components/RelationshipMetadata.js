"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.RelationshipMetadata = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _reactReduxForm = require("react-redux-form");
var _immutable = _interopRequireDefault(require("immutable"));
var _reselect = require("reselect");
var _UI = require("../../UI");

var _Metadata = require("../../Metadata");
var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _CopyFromEntity = require("../../Metadata/components/CopyFromEntity");
var _Entities = require("../../Entities");
var _RequestParams = require("../../utils/RequestParams");
var _saveEntityWithFiles = require("../../Library/actions/saveEntityWithFiles");
var _actions = require("../actions/actions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}







class RelationshipMetadata extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { copyFrom: false, copyFromProps: [] };

    this.toggleCopyFrom = this.toggleCopyFrom.bind(this);
    this.onCopyFromSelect = this.onCopyFromSelect.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.saveEntity = this.saveEntity.bind(this);
    this.closeSidePanel = this.closeSidePanel.bind(this);
  }

  onCopyFromSelect(copyFromProps) {
    this.setState({ copyFromProps });
  }

  async deleteDocument() {
    this.context.confirm({
      accept: async () => {
        this.props.unselectConnection();
        await _Entities.api.delete(new _RequestParams.RequestParams({ sharedId: this.props.entity.sharedId }));
        await this.props.reloadRelationships(this.props.parentSharedId);
      },
      title: 'Confirm delete entity',
      message: 'Are you sure you want to delete this entity?' });

  }

  async saveEntity(entity, formModel) {
    this.props.resetForm(formModel);
    this.props.unselectConnection();
    const { entity: savedEntity, errors } = await (0, _saveEntityWithFiles.saveEntityWithFiles)(entity);
    this.props.updateRelationshipEntityData(savedEntity);

    if (Number.isInteger(this.props.hubIndex)) {
      this.props.addEntity(
      this.props.hubIndex,
      this.props.rightRelationshipIndex,
      savedEntity,
      errors);

      this.props.setAddToData(null, null);
    }
  }

  toggleCopyFrom() {
    this.setState((currentState) => ({
      copyFrom: !currentState.copyFrom }));

  }

  closeSidePanel() {
    return this.props.entityBeingEdited ?
    this.props.resetForm('relationships.metadata') :
    this.props.unselectConnection();
  }

  renderForm() {
    const form = /*#__PURE__*/
    _jsx(_Metadata.MetadataForm, {
      model: "relationships.metadata",
      initialTemplateId: this.props.entity.template,
      templateId: this.props.formState.template,
      onSubmit: this.saveEntity,
      changeTemplate: this.props.changeTemplate,
      highlightedProps: this.state.copyFromProps });



    return this.state.copyFrom ? /*#__PURE__*/
    _jsx("div", { className: "tab-content tab-content-visible" }, void 0,
    form, /*#__PURE__*/
    _jsx(_CopyFromEntity.CopyFromEntity, {
      originalEntity: this.props.formState,
      templates: this.props.templates,
      onSelect: this.onCopyFromSelect,
      formModel: "relationships.metadata",
      onCancel: this.toggleCopyFrom })) :



    form;

  }

  renderBody() {
    return this.props.entityBeingEdited ?
    this.renderForm() : /*#__PURE__*/

    _jsx(_Metadata.ShowMetadata, { entity: this.props.entity, showTitle: true, showType: true });

  }

  render() {
    const twoColumns = this.state.copyFrom ? 'two-columns' : '';
    return /*#__PURE__*/(
      _jsx(_SidePanel.default, {
        open: this.props.selectedConnection,
        className: `connections-metadata ${twoColumns}` }, void 0,

      !this.state.copyFrom && /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "closeSidepanel close-modal",
        onClick: this.closeSidePanel }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" })), /*#__PURE__*/


      _jsx("div", { className: "sidepanel-body" }, void 0, this.renderBody()), /*#__PURE__*/
      _jsx("div", { className: "sidepanel-footer" }, void 0,
      !this.state.copyFrom && /*#__PURE__*/
      _jsx(_Metadata.MetadataFormButtons, {
        data: _immutable.default.fromJS(this.props.entity),
        delete: this.deleteDocument,
        formStatePath: "relationships.metadata",
        entityBeingEdited: this.props.entityBeingEdited,
        copyFrom: this.toggleCopyFrom,
        hideDelete: this.props.hubsBeingEdited,
        includeViewButton: false }))));





  }}exports.RelationshipMetadata = RelationshipMetadata;


RelationshipMetadata.contextTypes = {
  confirm: _propTypes.default.func };


RelationshipMetadata.defaultProps = {
  selectedConnection: false,
  entityBeingEdited: false,
  hubsBeingEdited: false,
  hubIndex: null,
  rightRelationshipIndex: null };





















const connectionSelector = (0, _reselect.createSelector)(
(state) => state.relationships.connection,
(entity) => entity && entity.toJS ? entity.toJS() : { metadata: {} });


const mapStateToProps = (state) => {
  const entityBeingEdited = Boolean(state.relationships.metadata.metadata);

  return {
    selectedConnection: Boolean(
    state.relationships.connection && state.relationships.connection.get('_id') ||
    entityBeingEdited),

    entity: connectionSelector(state),
    entityBeingEdited,
    hubsBeingEdited: Boolean(state.relationships.hubActions.get('editing')),
    templates: state.templates,
    formState: state.relationships.metadata,
    hubIndex: state.relationships.hubActions.getIn(['addTo', 'hubIndex']),
    rightRelationshipIndex: state.relationships.hubActions.getIn([
    'addTo',
    'rightRelationshipIndex']),

    parentSharedId: state.relationships.list.sharedId };

};exports.mapStateToProps = mapStateToProps;

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    unselectConnection: _actions.unselectConnection,
    updateRelationshipEntityData: _actions.updateRelationshipEntityData,
    changeTemplate: _Metadata.actions.changeTemplate,
    addEntity: _actions.addEntity,
    setAddToData: _actions.setAddToData,
    resetForm: _reactReduxForm.actions.reset,
    reloadRelationships: _actions.reloadRelationships },

  dispatch);

}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RelationshipMetadata);exports.default = _default;