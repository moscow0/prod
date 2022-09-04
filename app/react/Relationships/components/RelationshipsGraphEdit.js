"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.RelationshipsGraphEdit = void 0;exports.mapStateToProps = mapStateToProps;var _redux = require("redux");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _immutable = require("immutable");
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var actions = _interopRequireWildcard(require("../actions/actions"));

var _LeftRelationship = _interopRequireDefault(require("./LeftRelationship"));
var _RightRelationship = _interopRequireDefault(require("./RightRelationship"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class RelationshipsGraphEdit extends _react.Component {
  componentDidMount() {
    this.props.parseResults(this.props.searchResults, this.props.parentEntity, this.props.editing);
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchResults !== prevProps.searchResults) {
      this.props.parseResults(
      this.props.searchResults,
      this.props.parentEntity,
      this.props.editing);

    }
  }

  render() {
    const { hubs, addHub } = this.props;

    return /*#__PURE__*/(
      _jsx("div", { className: "relationships-graph" }, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0,
      hubs.map((hub, index) => /*#__PURE__*/
      _jsx("div", { className: "relationshipsHub" }, index, /*#__PURE__*/
      _jsx(_LeftRelationship.default, { index: index, hub: hub }), /*#__PURE__*/
      _jsx(_RightRelationship.default, { index: index, hub: hub }))),



      this.props.editing && /*#__PURE__*/
      _jsx("div", { className: "relationshipsHub" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "leftRelationshipType " }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", className: "relationships-new", onClick: addHub }, void 0, /*#__PURE__*/
      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "New relationships group")), /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "plus" })))))));







  }}exports.RelationshipsGraphEdit = RelationshipsGraphEdit;











function mapStateToProps(state) {
  const { relationships } = state;
  return {
    parentEntity: relationships.list.entity,
    searchResults: relationships.list.searchResults,
    search: relationships.list.sort,
    hubs: relationships.hubs,
    editing: relationships.hubActions.get('editing') };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    parseResults: actions.parseResults,
    addHub: actions.addHub },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RelationshipsGraphEdit);exports.default = _default;