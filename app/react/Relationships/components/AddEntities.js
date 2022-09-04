"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.AddEntities = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _immutable = _interopRequireDefault(require("immutable"));

var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _SearchResults = _interopRequireDefault(require("../../Connections/components/SearchResults"));
var _actions = require("../../Metadata/actions/actions");
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _uiActions = require("../actions/uiActions");
var _SearchEntitiesForm = _interopRequireDefault(require("./SearchEntitiesForm"));
var actions = _interopRequireWildcard(require("../actions/actions"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class AddEntities extends _react.Component {
  constructor(props) {
    super(props);
    this.addEntity = this.addEntity.bind(this);
    this.newEntity = this.newEntity.bind(this);
  }

  addEntity(_sharedId, entity) {
    this.props.addEntity(this.props.hubIndex, this.props.rightRelationshipIndex, entity);
  }

  newEntity() {
    this.props.selectConnection({ metadata: {} });
    this.props.loadInReduxForm(
    'relationships.metadata',
    { metadata: {} },
    this.props.templates.toJS());

    this.props.closePanel();
  }

  render() {
    const { uiState, searchResults } = this.props;
    const open = Boolean(this.props.uiState.get('open'));

    return /*#__PURE__*/(
      _jsx(_SidePanel.default, { open: open, className: "create-reference" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
      _jsx("h1", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Add entities / documents")), /*#__PURE__*/

      _jsx("button", {
        type: "button",
        className: "closeSidepanel close-modal",
        onClick: this.props.closePanel }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" }))), /*#__PURE__*/



      _jsx("div", { className: "sidepanel-body" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "search-box" }, void 0, /*#__PURE__*/
      _jsx(_SearchEntitiesForm.default, {})), /*#__PURE__*/

      _jsx(_SearchResults.default, {
        results: searchResults,
        searching: uiState.get('searching'),
        onClick: this.addEntity })), /*#__PURE__*/


      _jsx("div", { className: "sidepanel-footer" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", className: "btn btn-success", onClick: this.newEntity }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "plus" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Create Entity"))))));





  }}exports.AddEntities = AddEntities;














const mapStateToProps = ({ relationships, templates }) => ({
  uiState: relationships.uiState,
  searchResults: relationships.searchResults,
  hubIndex: relationships.hubActions.getIn(['addTo', 'hubIndex']),
  rightRelationshipIndex: relationships.hubActions.getIn(['addTo', 'rightRelationshipIndex']),
  templates });exports.mapStateToProps = mapStateToProps;


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    addEntity: actions.addEntity,
    closePanel: _uiActions.closePanel,
    loadInReduxForm: _actions.loadInReduxForm,
    selectConnection: actions.selectConnection },

  dispatch);

}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AddEntities);exports.default = _default;