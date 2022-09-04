"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.LeftRelationship = void 0;exports.mapStateToProps = mapStateToProps;var _redux = require("redux");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _immutable = require("immutable");
var _UI = require("../../UI");
var _Doc = _interopRequireDefault(require("../../Library/components/Doc"));
var _DropdownList = _interopRequireDefault(require("../../Forms/components/DropdownList"));
var actions = _interopRequireWildcard(require("../actions/actions"));
var _HubRelationshipMetadata = _interopRequireDefault(require("./HubRelationshipMetadata"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class LeftRelationship extends _react.Component {
  static renderFigure() {
    return /*#__PURE__*/(
      _jsx("div", { className: "hubRelationship" }, "figure", /*#__PURE__*/
      _jsx("figure", {})));


  }

  constructor(props) {
    super(props);
    this.toggelRemoveLeftRelationship = this.props.toggelRemoveLeftRelationship.bind(
    null,
    props.index);

    this.onClick = this.onClick.bind(this);
  }

  onClick(_e, entity) {
    this.props.selectConnection(entity);
  }

  renderTrashButton(hub) {
    return (
      this.props.editing && /*#__PURE__*/
      _jsx("div", { className: "removeHub" }, "toggelRemoveLeftRelationship", /*#__PURE__*/
      _jsx("button", { onClick: this.toggelRemoveLeftRelationship, className: "relationships-icon" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: !hub.get('deleted') ? 'trash-alt' : 'undo' }))));




  }

  renderRelationship() {
    const { parentEntity, hub, search, editing, relationTypes, index } = this.props;
    const relationship = hub.get('leftRelationship');
    const targetReference = relationship.get('range') ? relationship : null;
    return /*#__PURE__*/(
      _jsx("div", {

        className: `leftRelationshipType ${hub.get('deleted') ? 'deleted' : ''}` }, "leftRelationshipType",

      !editing && hub.getIn(['leftRelationship', 'template']) && /*#__PURE__*/
      _jsx("div", { className: "rw-dropdown-list rw-widget" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "rw-widget-input rw-widget-picker rw-widget-container no-edit" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "rw-input rw-dropdown-list-input no-edit" }, void 0,

      relationTypes.find((r) => r._id === hub.getIn(['leftRelationship', 'template'])).
      name))),





      editing && /*#__PURE__*/
      _jsx(_DropdownList.default, {
        valueField: "_id",
        textField: "name",
        data: relationTypes,
        value: hub.getIn(['leftRelationship', 'template']),
        filter: "contains",
        onChange: this.props.updateLeftRelationshipType.bind(null, index) }), /*#__PURE__*/


      _jsx("div", {
        className: `leftDocument ${
        !hub.getIn(['leftRelationship', 'template']) && !editing ?
        'docWithoutRelationshipType' :
        ''
        }` }, void 0, /*#__PURE__*/

      _jsx(_Doc.default, {
        className: "item-collapsed",
        doc: parentEntity,
        searchParams: search,
        onClick: this.onClick,
        targetReference: targetReference })), /*#__PURE__*/


      _jsx(_HubRelationshipMetadata.default, { relationship: hub.get('leftRelationship') })));


  }

  render() {
    const { hub, index, parentEntity } = this.props;
    if (!parentEntity.get('sharedId')) {
      return false;
    }
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null,
      this.renderTrashButton(hub, index),
      this.renderRelationship(),
      LeftRelationship.renderFigure()));


  }}exports.LeftRelationship = LeftRelationship;














function mapStateToProps(state) {
  const { relationships } = state;
  return {
    parentEntity: relationships.list.entity,
    search: relationships.list.sort,
    editing: relationships.hubActions.get('editing'),
    relationTypes: actions.selectRelationTypes(state) };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    selectConnection: actions.selectConnection,
    updateLeftRelationshipType: actions.updateLeftRelationshipType,
    toggelRemoveLeftRelationship: actions.toggelRemoveLeftRelationship },

  dispatch);

}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LeftRelationship);exports.default = _default;