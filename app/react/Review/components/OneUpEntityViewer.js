"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.OneUpEntityViewerBase = exports.OneUpEntityViewer = void 0;

var _Footer = _interopRequireDefault(require("../../App/Footer"));
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _Attachments = require("../../Attachments");
var _FileList = require("../../Attachments/components/FileList");
var _Connections = require("../../Connections");
var _ConnectionsList = require("../../ConnectionsList");
var _actions = require("../../ConnectionsList/actions/actions");
var _ContextMenu = _interopRequireDefault(require("../../ContextMenu"));
var _ShowSidepanelMenu = require("../../Entities/components/ShowSidepanelMenu");
var _I18N = require("../../I18N");

var _Layout = require("../../Layout");
var _Tip = _interopRequireDefault(require("../../Layout/Tip"));
var _Metadata = require("../../Metadata");
var _Relationships = require("../../Relationships");
var _AddEntities = _interopRequireDefault(require("../../Relationships/components/AddEntities"));
var _RelationshipMetadata = _interopRequireDefault(require("../../Relationships/components/RelationshipMetadata"));
var _actions2 = require("../actions/actions");
var _OneUpEntityButtons = require("./OneUpEntityButtons");
var _OneUpSidePanel = require("./OneUpSidePanel");
var _OneUpTitleBar = require("./OneUpTitleBar");
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactHelmet = require("react-helmet");
var _reactRedux = require("react-redux");
var _reactTabsRedux = require("react-tabs-redux");
var _redux = require("redux");



var _UI = require("../../UI");
var _common = require("../common");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const defaultProps = {
  entity: {},
  relationships: _immutable.default.fromJS([]),
  templates: _immutable.default.fromJS([]),
  mlThesauri: [],
  oneUpState: {},
  tab: 'info',
  connectionsChanged: () => {},
  deleteConnection: (_reference) => {},
  toggleOneUpFullEdit: () => {} };








class OneUpEntityViewerBase extends _react.Component


{






  constructor(props, context) {
    super(props, context);
    this.state = {
      panelOpen: true };

    this.closePanel = this.closePanel.bind(this);
    this.openPanel = this.openPanel.bind(this);
    this.deleteConnection = this.deleteConnection.bind(this);
  }

  deleteConnection(reference) {
    if (reference.sourceType !== 'metadata') {
      this.context.confirm({
        accept: () => {
          this.props.deleteConnection(reference);
        },
        title: 'Confirm delete connection',
        message: 'Are you sure you want to delete this connection?' });

    }
  }

  closePanel() {
    this.setState({ panelOpen: false });
  }

  openPanel() {
    this.setState({ panelOpen: true });
  }

  nonMlProps() {var _templates$find, _template$get;
    const { entity, mlThesauri, templates } = this.props;
    const template = (_templates$find =
    templates.find((tmpl) => tmpl.get('_id') === entity.template)) !== null && _templates$find !== void 0 ? _templates$find : _immutable.default.fromJS({});
    const properties = (_template$get =
    template.get('properties')) !== null && _template$get !== void 0 ? _template$get : _immutable.default.fromJS([]);
    return properties.
    filter((p) => {var _get;return !mlThesauri.includes((_get = p.get('content')) !== null && _get !== void 0 ? _get : '');}).
    map((p) => p.get('name')).
    toJS();
  }

  renderFullEditToggle() {
    const { oneUpState } = this.props;
    let onClick = () => this.props.toggleOneUpFullEdit();
    if (!oneUpState.fullEdit) {
      onClick = () =>
      this.context.confirm({
        accept: () => this.props.toggleOneUpFullEdit(),
        title: 'Keep this in mind if you want to edit:',
        message:
        "Changes can't be undone after saving. Changing text fields may invalidate the suggestions." });

    }
    return /*#__PURE__*/(
      _jsx("button", {
        type: "button",
        onClick: onClick,
        className:
        oneUpState.fullEdit ? 'btn btn-default btn-toggle-on' : 'btn btn-default btn-toggle-off' }, void 0, /*#__PURE__*/


      _jsx(_UI.Icon, { icon: oneUpState.fullEdit ? 'toggle-on' : 'toggle-off' }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Full edit mode"))));



  }

  render() {var _entity$template$toSt, _entity$template, _entity$template$toSt2, _entity$template2;
    const { entity, tab, relationships, oneUpState } = this.props;
    const { panelOpen } = this.state;
    const selectedTab = tab !== null && tab !== void 0 ? tab : 'info';

    return /*#__PURE__*/(
      _jsx("div", { className: "row flex" }, void 0, /*#__PURE__*/
      _jsx(_reactHelmet.Helmet, {}, void 0, /*#__PURE__*/
      _jsx("title", {}, void 0, entity.title ? entity.title : 'Entity')), /*#__PURE__*/

      _jsx("div", { className: "content-holder" }, void 0, /*#__PURE__*/
      _jsx("main", { className: "content-main" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "content-header content-header-entity" }, void 0, /*#__PURE__*/
      _jsx(_OneUpTitleBar.OneUpTitleBar, {}),
      this.renderFullEditToggle()), /*#__PURE__*/

      _jsx("div", { className: "entity-viewer" }, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.Tabs, { selectedTab: selectedTab }, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.TabContent, {
        for:
        selectedTab === 'info' || selectedTab === 'attachments' ? selectedTab : 'none' }, void 0, /*#__PURE__*/


      _jsx("div", { className: "entity-metadata" }, void 0, /*#__PURE__*/
      _jsx(_ShowIf.default, { if: oneUpState.fullEdit }, void 0, /*#__PURE__*/
      _jsx(_Metadata.MetadataForm, {
        id: "fullEditMetadataForm",
        model: "entityView.entityForm",
        templateId: (_entity$template$toSt = (_entity$template = entity.template) === null || _entity$template === void 0 ? void 0 : _entity$template.toString()) !== null && _entity$template$toSt !== void 0 ? _entity$template$toSt : '',
        showSubset: [...this.nonMlProps(), 'title'],
        version: "OneUp" })), /*#__PURE__*/


      _jsx(_ShowIf.default, { if: !oneUpState.fullEdit }, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: "content-header-title" }, void 0, /*#__PURE__*/
      _jsx(_Layout.Icon, {
        className: "item-icon item-icon-center",
        data: entity.icon,
        size: "sm" }), /*#__PURE__*/

      _jsx("h1", { className: "item-name" }, void 0, entity.title), /*#__PURE__*/
      _jsx(_Layout.TemplateLabel, { template: (_entity$template$toSt2 = (_entity$template2 = entity.template) === null || _entity$template2 === void 0 ? void 0 : _entity$template2.toString()) !== null && _entity$template$toSt2 !== void 0 ? _entity$template$toSt2 : '' }),
      entity.published ?
      '' : /*#__PURE__*/

      _jsx(_Tip.default, { icon: "eye-slash" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This entity is not public."))), /*#__PURE__*/



      _jsx(_Metadata.ShowMetadata, {
        relationships: relationships,
        entity: entity,
        showTitle: false,
        showType: false,
        showSubset: this.nonMlProps() }), /*#__PURE__*/

      _jsx(_FileList.FileList, { files: entity.documents, entity: entity }), /*#__PURE__*/
      _jsx(_Attachments.AttachmentsList, {
        attachments: entity.attachments,
        parentId: entity._id,
        parentSharedId: entity.sharedId,
        isDocumentAttachments: Boolean(entity.file),
        entityView: true,
        processed: entity.processed }))))), /*#__PURE__*/





      _jsx(_reactTabsRedux.TabContent, { for: "connections" }, void 0, /*#__PURE__*/
      _jsx(_ConnectionsList.ConnectionsList, {
        deleteConnection: this.deleteConnection,
        searchCentered: true,
        hideFooter: true })))), /*#__PURE__*/




      _jsx(_ShowIf.default, { if: selectedTab === 'connections' }, void 0, /*#__PURE__*/
      _jsx("div", { className: "content-footer" }, void 0, /*#__PURE__*/
      _jsx(_Relationships.RelationshipsFormButtons, {}))), /*#__PURE__*/


      _jsx(_ShowIf.default, { if: selectedTab !== 'connections' }, void 0, /*#__PURE__*/
      _jsx(_OneUpEntityButtons.OneUpEntityButtons, {
        isLast: oneUpState.indexInDocs === oneUpState.totalDocs - 1,
        thesaurusName: oneUpState.reviewThesaurusValues[0] })), /*#__PURE__*/


      _jsx(_ContextMenu.default, {
        align: "bottom",
        overrideShow: true,
        show: !panelOpen,
        className: "show-info-sidepanel-context-menu" }, void 0, /*#__PURE__*/

      _jsx(_ShowSidepanelMenu.ShowSidepanelMenu, {
        className: "show-info-sidepanel-menu",
        panelIsOpen: panelOpen,
        openPanel: this.openPanel }))), /*#__PURE__*/



      _jsx(_OneUpSidePanel.OneUpSidePanel, { panelOpen: panelOpen, closePanel: this.closePanel }), /*#__PURE__*/
      _jsx(_Connections.CreateConnectionPanel, {
        className: "entity-create-connection-panel",
        containerId: entity.sharedId,
        onCreate: this.props.connectionsChanged }), /*#__PURE__*/

      _jsx(_AddEntities.default, {}), /*#__PURE__*/
      _jsx(_RelationshipMetadata.default, {})), /*#__PURE__*/

      _jsx(_Footer.default, {})));


  }}exports.OneUpEntityViewerBase = OneUpEntityViewerBase;_defineProperty(OneUpEntityViewerBase, "defaultProps", defaultProps);_defineProperty(OneUpEntityViewerBase, "contextTypes", { confirm: _propTypes.default.func });


const mapStateToProps = (state) => {var _selectOneUpState;return {
    entity: (0, _common.selectEntity)(state),
    relationships: state.entityView.entity.get('relationships'),
    tab: state.entityView.uiState.get('tab'),
    oneUpState: (_selectOneUpState = (0, _common.selectOneUpState)(state)) !== null && _selectOneUpState !== void 0 ? _selectOneUpState : {},
    templates: state.templates,
    mlThesauri: (0, _common.selectMlThesauri)(state) };};


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    connectionsChanged: _actions.connectionsChanged,
    deleteConnection: _actions.deleteConnection,
    toggleOneUpFullEdit: _actions2.toggleOneUpFullEdit },

  dispatch);

}

const OneUpEntityViewer = (0, _reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(
OneUpEntityViewerBase);exports.OneUpEntityViewer = OneUpEntityViewer;