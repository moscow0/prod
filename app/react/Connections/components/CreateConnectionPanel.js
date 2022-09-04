"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.CreateConnectionPanel = void 0;var _redux = require("redux");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _UI = require("../../UI");
var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _I18N = require("../../I18N");

var _uiActions = require("../actions/uiActions");
var _actions = require("../actions/actions");
var _ActionButton = _interopRequireDefault(require("./ActionButton"));
var _SearchForm = _interopRequireDefault(require("./SearchForm"));
var _SearchResults = _interopRequireDefault(require("./SearchResults"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class CreateConnectionPanel extends _react.Component {
  renderCheckType(template) {
    if (this.props.connection.get('template') === template.get('_id')) {
      return /*#__PURE__*/_jsx(_UI.Icon, { icon: "check" });
    }

    return /*#__PURE__*/_jsx(_UI.Icon, { icon: ['far', 'square'] });
  }

  render() {
    const { uiState, searchResults } = this.props;
    const connection = this.props.connection.toJS();
    const typeLabel = connection.type === 'basic' ? 'Connection' : 'Reference';
    const open = Boolean(
    this.props.uiState.get('open') && this.props.containerId === connection.sourceDocument);

    const className = `${this.props.className} create-reference`;

    return /*#__PURE__*/(
      _jsx(_SidePanel.default, { open: open, className: className }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
      _jsx("h1", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Create"), " ", typeLabel), /*#__PURE__*/

      _jsx("button", {
        className: "closeSidepanel close-modal",
        onClick: this.props.closePanel,
        "aria-label": "Close side panel",
        type: "button" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" })), /*#__PURE__*/

      _jsx("div", { className: "connections-list-title" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Select relationship type")), /*#__PURE__*/

      _jsx("ul", { className: "connections-list multiselect" }, void 0,
      this.props.relationTypes.map((template) => /*#__PURE__*/
      _jsx("li", {
        onClick: () => this.props.setRelationType(template.get('_id')),

        className: "multiselectItem" }, template.get('_id'), /*#__PURE__*/

      _jsx("label", { className: "multiselectItem-label", htmlFor: template.get('_id') }, void 0, /*#__PURE__*/
      _jsx("span", { className: "multiselectItem-icon" }, void 0, this.renderCheckType(template)), /*#__PURE__*/
      _jsx("span", { className: "multiselectItem-name" }, void 0, template.get('name'))))))), /*#__PURE__*/






      _jsx("div", { className: "sidepanel-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx("button", {
        className: "btn btn-default",
        onClick: this.props.closePanel,
        "aria-label": "Close side panel",
        type: "button" }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Cancel")),

      connection.type !== 'targetRanged' && /*#__PURE__*/
      _jsx(_ActionButton.default, {
        action: "save",
        onCreate: (reference) => {
          this.props.onCreate(reference);
        } }),


      connection.type === 'targetRanged' && /*#__PURE__*/
      _jsx(_ActionButton.default, { action: "connect", onRangedConnect: this.props.onRangedConnect }))), /*#__PURE__*/




      _jsx("div", { className: "sidepanel-body" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "search-box" }, void 0, /*#__PURE__*/
      _jsx(_SearchForm.default, { connectionType: connection.type })), /*#__PURE__*/

      _jsx(_SearchResults.default, {
        results: searchResults,
        searching: uiState.get('searching'),
        selected: connection.targetDocument,
        onClick: this.props.setTargetDocument }))));




  }}exports.CreateConnectionPanel = CreateConnectionPanel;
















const mapStateToProps = ({ connections, relationTypes }) => ({
  uiState: connections.uiState,
  connection: connections.connection,
  searchResults: connections.searchResults,
  relationTypes });exports.mapStateToProps = mapStateToProps;


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ setRelationType: _actions.setRelationType, setTargetDocument: _actions.setTargetDocument, closePanel: _uiActions.closePanel }, dispatch);
}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CreateConnectionPanel);exports.default = _default;