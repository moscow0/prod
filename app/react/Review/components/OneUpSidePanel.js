"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.OneUpSidePanelBase = exports.OneUpSidePanel = void 0;


var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _ConnectionsList = require("../../ConnectionsList");
var _actions = require("../../ConnectionsList/actions/actions");
var _uiActions = require("../../Entities/actions/uiActions");
var _I18N = require("../../I18N");

var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _Metadata = require("../../Metadata");
var _actions2 = require("../actions/actions");
var _StateSelector = require("./StateSelector");
var _immutable = _interopRequireDefault(require("immutable"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactTabsRedux = require("react-tabs-redux");
var _redux = require("redux");



var _UI = require("../../UI");
var _common = require("../common");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const defaultProps = {
  entity: {},
  connectionsGroups: _immutable.default.fromJS([]),
  templates: _immutable.default.fromJS([]),
  mlThesauri: [],
  oneUpState: {},
  tab: 'info',
  panelOpen: true,
  selectedConnection: false,
  closePanel: () => {},
  showTab: (_tab) => ({}),
  connectionsChanged: () => {},
  deleteConnection: (_reference) => {},
  toggleOneUpLoadConnections: () => {} };




class OneUpSidePanelBase extends _react.Component {


  mlProps() {var _templates$find, _template$get;
    const { entity, mlThesauri, templates } = this.props;
    const template = (_templates$find =
    templates.find((tmpl) => tmpl.get('_id') === entity.template)) !== null && _templates$find !== void 0 ? _templates$find : _immutable.default.fromJS({});
    const properties = (_template$get =
    template.get('properties')) !== null && _template$get !== void 0 ? _template$get : _immutable.default.fromJS([]);
    return properties.
    filter((p) => {var _get;return mlThesauri.includes((_get = p.get('content')) !== null && _get !== void 0 ? _get : '');}).
    map((p) => p.get('name')).
    toJS();
  }

  render() {var _entity$template$toSt, _entity$template;
    const { entity, tab, selectedConnection, connectionsGroups, oneUpState, panelOpen } =
    this.props;
    const selectedTab = tab !== null && tab !== void 0 ? tab : 'info';

    const summary = connectionsGroups.reduce(
    (summaryData, g) => {
      g.get('templates').forEach((tmpl) => {
        summaryData.totalConnections += tmpl.get('count'); // eslint-disable-line no-param-reassign
      });
      return summaryData;
    },
    { totalConnections: 0 });


    return /*#__PURE__*/(
      _jsx(_SidePanel.default, {
        className: `entity-connections entity-${this.props.tab}`,
        open: panelOpen && !selectedConnection }, void 0, /*#__PURE__*/

      _jsx("div", { className: "sidepanel-header content-header-tabs" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "blank" }), /*#__PURE__*/
      _jsx(_reactTabsRedux.Tabs, {
        selectedTab: selectedTab,
        handleSelect: (tabName) => {
          this.props.showTab(tabName);
        } }, void 0, /*#__PURE__*/

      _jsx("ul", { className: "nav nav-tabs" }, void 0, /*#__PURE__*/
      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.TabLink, { to: "info", component: "div" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "info-circle" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Info')))), /*#__PURE__*/


      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.TabLink, { to: "connections", component: "div" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "exchange-alt" }), /*#__PURE__*/
      _jsx("span", { className: "connectionsNumber" }, void 0, summary.totalConnections), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Connections')))))), /*#__PURE__*/




      _jsx("button", {
        type: "button",
        className: "closeSidepanel close-modal",
        onClick: this.props.closePanel }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" }))), /*#__PURE__*/


      _jsx("div", { className: "sidepanel-body" }, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.Tabs, { selectedTab: selectedTab }, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.TabContent, { for: selectedTab === 'connections' ? selectedTab : 'none' }, void 0, /*#__PURE__*/
      _jsx(_ConnectionsList.ConnectionsGroups, { connectionsGroups: connectionsGroups })), /*#__PURE__*/

      _jsx(_reactTabsRedux.TabContent, { for: selectedTab === 'info' ? selectedTab : 'none' }, void 0, /*#__PURE__*/
      _jsx(_Metadata.MetadataForm, {
        id: "sidePanelMetadataForm",
        model: "entityView.entityForm",
        templateId: (_entity$template$toSt = (_entity$template = entity.template) === null || _entity$template === void 0 ? void 0 : _entity$template.toString()) !== null && _entity$template$toSt !== void 0 ? _entity$template$toSt : '',
        showSubset: this.mlProps(),
        version: "OneUp" })))), /*#__PURE__*/




      _jsx(_ShowIf.default, { if: selectedTab === 'connections' }, void 0, /*#__PURE__*/
      _jsx(_StateSelector.StateSelector, { isPristine: _common.selectIsPristine }, void 0,
      ({ isPristine }) => /*#__PURE__*/
      _jsx("div", { className: "sidepanel-footer" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: () => this.props.toggleOneUpLoadConnections(),
        className: isPristine ? 'btn btn-default' : 'btn btn-default btn-disabled' }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: oneUpState.loadConnections ? 'times' : 'undo' }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0,
      (0, _I18N.t)(
      'System',
      oneUpState.loadConnections ? 'Hide Connections' : 'Load Connections'))))))));









  }}exports.OneUpSidePanelBase = OneUpSidePanelBase;_defineProperty(OneUpSidePanelBase, "defaultProps", defaultProps);


const mapStateToProps = (state) => {var _selectOneUpState;return {
    entity: (0, _common.selectEntity)(state),
    connectionsGroups: state.relationships.list.connectionsGroups,
    selectedConnection: Boolean(
    state.relationships.connection && state.relationships.connection.get('_id')),

    tab: state.entityView.uiState.get('tab'),
    oneUpState: (_selectOneUpState = (0, _common.selectOneUpState)(state)) !== null && _selectOneUpState !== void 0 ? _selectOneUpState : {},
    templates: state.templates,
    mlThesauri: (0, _common.selectMlThesauri)(state) };};


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    connectionsChanged: _actions.connectionsChanged,
    deleteConnection: _actions.deleteConnection,
    showTab: _uiActions.showTab,
    toggleOneUpLoadConnections: _actions2.toggleOneUpLoadConnections },

  dispatch);

}

const OneUpSidePanel = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OneUpSidePanelBase);exports.OneUpSidePanel = OneUpSidePanel;