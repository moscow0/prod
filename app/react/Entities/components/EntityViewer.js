"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.EntityViewer = void 0;
var _immutable = _interopRequireDefault(require("immutable"));
var _reactTabsRedux = require("react-tabs-redux");
var _redux = require("redux");
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _reselect = require("reselect");
var _reactHelmet = require("react-helmet");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _Attachments = require("../../Attachments");
var _ConnectionsList = require("../../ConnectionsList");
var _Connections = require("../../Connections");
var _Metadata = require("../../Metadata");
var _Relationships = require("../../Relationships");
var _Layout = require("../../Layout");
var _actions = require("../../ConnectionsList/actions/actions");
var _I18N = require("../../I18N");
var _AddEntities = _interopRequireDefault(require("../../Relationships/components/AddEntities"));
var _RelationshipMetadata = _interopRequireDefault(require("../../Relationships/components/RelationshipMetadata"));
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _ContextMenu = _interopRequireDefault(require("../../ContextMenu"));
var _UI = require("../../UI");
var _FileList = require("../../Attachments/components/FileList");
var _CopyFromEntity = require("../../Metadata/components/CopyFromEntity");
var _PageViewer = require("../../Pages/components/PageViewer");

var _ShowSidepanelMenu = require("./ShowSidepanelMenu");
var _actions2 = require("../actions/actions");
var _uiActions = require("../actions/uiActions");
var _EntityForm = _interopRequireDefault(require("../containers/EntityForm"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class EntityViewer extends _react.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      panelOpen: !this.props.hasPageView,
      copyFrom: false,
      copyFromProps: [] };

    this.deleteEntity = this.deleteEntity.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.openPanel = this.openPanel.bind(this);
    this.toggleCopyFrom = this.toggleCopyFrom.bind(this);
    this.onCopyFromSelect = this.onCopyFromSelect.bind(this);
    this.deleteConnection = this.deleteConnection.bind(this);
  }

  onCopyFromSelect(copyFromProps) {
    this.setState({ copyFromProps });
  }

  deleteEntity() {
    this.context.confirm({
      accept: () => {
        this.props.deleteEntity(this.props.entity.toJS()).then(() => {
          _reactRouter.browserHistory.goBack();
        });
      },
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this entity?' });

  }

  toggleCopyFrom() {
    this.setState((currentState) => ({
      copyFrom: !currentState.copyFrom }));

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

  render() {
    const {
      entity,
      entityBeingEdited,
      tab: selectedTab,
      connectionsGroups,
      relationships,
      hasPageView,
      user } =
    this.props;

    const { panelOpen, copyFrom, copyFromProps } = this.state;
    const rawEntity = entity.toJS();
    const summary = connectionsGroups.reduce(
    (summaryData, g) => {
      g.get('templates').forEach((template) => {
        summaryData.totalConnections += template.get('count');
      });
      return summaryData;
    },
    { totalConnections: 0 });


    const includeFooter = user.get('_id') && ['info', 'connections'].includes(selectedTab);
    const hasHeader = ['info', 'connections'].includes(selectedTab);
    const mainClass = `entity-viewer ${hasHeader ? 'with-header' : ''} ${
    user.get('_id') && includeFooter ? 'with-footer' : ''
    } ${panelOpen ? 'with-panel' : ''}`;

    return /*#__PURE__*/(
      _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
      _jsx(_reactHelmet.Helmet, {}, void 0, /*#__PURE__*/
      _jsx("title", {}, void 0, entity.get('title') ? entity.get('title') : 'Entity')),


      selectedTab !== 'page' && /*#__PURE__*/
      _jsx("div", { className: "content-header content-header-entity" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "content-header-title" }, void 0, /*#__PURE__*/
      _jsx(_Layout.Icon, {
        className: "item-icon item-icon-center",
        data: entity.get('icon'),
        size: "sm" }), /*#__PURE__*/

      _jsx("h1", { className: "item-name" }, void 0, entity.get('title')), /*#__PURE__*/
      _jsx(_Layout.TemplateLabel, { template: entity.get('template') }))), /*#__PURE__*/




      _jsx("main", { className: mainClass }, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.Tabs, { selectedTab: selectedTab }, void 0,
      hasPageView && /*#__PURE__*/
      _jsx(_reactTabsRedux.TabContent, { for: "page" }, void 0, /*#__PURE__*/
      _jsx(_PageViewer.PageViewer, { setBrowserTitle: false })), /*#__PURE__*/


      _jsx(_reactTabsRedux.TabContent, {
        for: selectedTab === 'info' || selectedTab === 'attachments' ? selectedTab : 'none' }, void 0, /*#__PURE__*/

      _jsx("div", { className: "entity-metadata" }, void 0,
      (() => {
        if (entityBeingEdited) {
          return /*#__PURE__*/_jsx(_EntityForm.default, { highlightedProps: copyFromProps });
        }
        return /*#__PURE__*/(
          _jsx("div", {}, void 0, /*#__PURE__*/
          _jsx(_Metadata.ShowMetadata, {
            relationships: relationships,
            entity: rawEntity,
            showTitle: false,
            showType: false,
            groupGeolocations: true }), /*#__PURE__*/

          _jsx(_FileList.FileList, { files: rawEntity.documents, entity: rawEntity }), /*#__PURE__*/
          _jsx(_Attachments.AttachmentsList, {
            attachments: rawEntity.attachments,
            parentId: entity.get('_id'),
            parentSharedId: entity.get('sharedId'),
            entityView: true,
            processed: entity.get('processed') })));



      })())), /*#__PURE__*/


      _jsx(_reactTabsRedux.TabContent, { for: "connections" }, void 0, /*#__PURE__*/
      _jsx(_ConnectionsList.ConnectionsList, { deleteConnection: this.deleteConnection, searchCentered: true })))),




      user.get('_id') && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_ShowIf.default, { if: selectedTab === 'info' || selectedTab === 'attachments' }, void 0, /*#__PURE__*/
      _jsx("div", { className: `entity-footer ${panelOpen ? 'with-sidepanel' : ''}` }, void 0, /*#__PURE__*/
      _jsx(_Metadata.MetadataFormButtons, {
        includeViewButton: false,
        delete: this.deleteEntity,
        data: this.props.entity,
        formStatePath: "entityView.entityForm",
        entityBeingEdited: entityBeingEdited,
        copyFrom: this.toggleCopyFrom }))), /*#__PURE__*/




      _jsx(_ShowIf.default, { if: selectedTab === 'connections' }, void 0, /*#__PURE__*/
      _jsx("div", { className: `entity-footer ${panelOpen ? 'with-sidepanel' : ''}` }, void 0, /*#__PURE__*/
      _jsx(_Relationships.RelationshipsFormButtons, {})))), /*#__PURE__*/





      _jsx(_SidePanel.default, { className: `entity-connections entity-${selectedTab}`, open: panelOpen }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "closeSidepanel close-modal",
        onClick: this.closePanel.bind(this),
        "aria-label": "Close side panel" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" })), /*#__PURE__*/

      _jsx(_reactTabsRedux.Tabs, {
        className: "content-header-tabs",
        selectedTab: selectedTab,
        handleSelect: (tabName) => {
          this.props.showTab(tabName);
        } }, void 0, /*#__PURE__*/

      _jsx("ul", { className: "nav nav-tabs" }, void 0,
      hasPageView && /*#__PURE__*/
      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.TabLink, {
        to: "page",
        role: "button",
        tabIndex: "0",
        "aria-label": (0, _I18N.t)('System', 'Page', null, false),
        component: "div" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "file-image" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Page')))), /*#__PURE__*/



      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.TabLink, {
        to: "info",
        role: "button",
        tabIndex: "0",
        "aria-label": (0, _I18N.t)('System', 'Info', null, false),
        component: "div" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "info-circle" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Info')))), /*#__PURE__*/


      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.TabLink, {
        to: "connections",
        role: "button",
        tabIndex: "0",
        "aria-label": (0, _I18N.t)('System', 'Connections', null, false),
        component: "div" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "exchange-alt" }), /*#__PURE__*/
      _jsx("span", { className: "connectionsNumber" }, void 0, summary.totalConnections), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Connections'))))))), /*#__PURE__*/





      _jsx(_ShowIf.default, { if: selectedTab === 'info' || selectedTab === 'connections' }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-footer" }, void 0, /*#__PURE__*/
      _jsx(_ConnectionsList.ResetSearch, {}))), /*#__PURE__*/



      _jsx("div", { className: "sidepanel-body" }, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.Tabs, { selectedTab: selectedTab }, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.TabContent, {
        for: ['info', 'connections', 'page'].includes(selectedTab) ? selectedTab : 'none' }, void 0, /*#__PURE__*/

      _jsx(_ConnectionsList.ConnectionsGroups, {}))))), /*#__PURE__*/




      _jsx(_SidePanel.default, { className: "copy-from-panel", open: copyFrom }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-body" }, void 0, /*#__PURE__*/
      _jsx(_CopyFromEntity.CopyFromEntity, {
        originalEntity: this.props.entity.toJS(),
        templates: this.props.templates,
        onSelect: this.onCopyFromSelect,
        formModel: "entityView.entityForm",
        onCancel: this.toggleCopyFrom }))), /*#__PURE__*/




      _jsx(_ContextMenu.default, {
        align: `bottom${includeFooter ? '-with-footer' : ''}`,
        overrideShow: true,
        show: !panelOpen,
        className: "show-info-sidepanel-context-menu" }, void 0, /*#__PURE__*/

      _jsx(_ShowSidepanelMenu.ShowSidepanelMenu, {
        className: "show-info-sidepanel-menu",
        panelIsOpen: panelOpen,
        openPanel: this.openPanel })), /*#__PURE__*/



      _jsx(_Connections.CreateConnectionPanel, {
        className: "entity-create-connection-panel",
        containerId: entity.sharedId,
        onCreate: this.props.connectionsChanged }), /*#__PURE__*/

      _jsx(_AddEntities.default, {}), /*#__PURE__*/
      _jsx(_RelationshipMetadata.default, {})));


  }}exports.EntityViewer = EntityViewer;


EntityViewer.defaultProps = {
  relationships: _immutable.default.fromJS([]),
  entityBeingEdited: false,
  tab: 'info',
  hasPageView: false,
  user: _immutable.default.fromJS({}) };




















EntityViewer.contextTypes = {
  confirm: _propTypes.default.func };


const selectRelationTypes = (0, _reselect.createSelector)(
(s) => s.relationTypes,
(r) => r.toJS());


const mapStateToProps = (state) => {
  const entityTemplateId = state.entityView.entity && state.entityView.entity.get('template');
  const entityTemplate = state.templates.find((template) => template.get('_id') === entityTemplateId);
  const templateWithPageView = entityTemplate.get('entityViewPage');
  const defaultTab = templateWithPageView ? 'page' : 'info';
  const { uiState } = state.entityView;
  return {
    entity: state.entityView.entity,
    relationTypes: selectRelationTypes(state),
    templates: state.templates,
    relationships: state.entityView.entity.get('relations'),
    connectionsGroups: state.relationships.list.connectionsGroups,
    entityBeingEdited: !!state.entityView.entityForm._id,
    tab: uiState.get('userSelectedTab') ? uiState.get('tab') : defaultTab,
    hasPageView: Boolean(templateWithPageView),
    user: state.user,
    // Is this used at all?
    library: state.library };

};exports.mapStateToProps = mapStateToProps;

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    deleteEntity: _actions2.deleteEntity,
    connectionsChanged: _actions.connectionsChanged,
    deleteConnection: _actions.deleteConnection,
    showTab: _uiActions.showTab,
    startNewConnection: _Connections.actions.startNewConnection },

  dispatch);

}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EntityViewer);exports.default = _default;