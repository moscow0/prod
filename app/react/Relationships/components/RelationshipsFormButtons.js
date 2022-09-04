"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.RelationshipsFormButtons = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _Auth = require("../../Auth");
var _I18N = require("../../I18N");
var _UI = require("../../UI");

var actions = _interopRequireWildcard(require("../actions/actions"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class RelationshipsFormButtons extends _react.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
  }

  componentWillUnmount() {
    this.edit(false)();
  }

  edit(value) {
    return () => {
      this.props.edit(value, this.props.searchResults, this.props.parentEntity);
    };
  }

  render() {
    const { editing, saving } = this.props;
    const entityData = this.props.parentEntity.toJS();

    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [entityData] }, void 0,
      !editing && /*#__PURE__*/
      _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: this.edit(true),
        className: "edit-metadata btn btn-default" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "pencil-alt" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Edit'))))), /*#__PURE__*/




      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [entityData] }, void 0,
      editing && /*#__PURE__*/
      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: this.edit(false),
        className: "cancel-edit-metadata btn btn-default btn-extra-padding" }, void 0, /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Cancel'))), /*#__PURE__*/

      _jsx("button", {
        type: "button",
        onClick: this.props.save,
        className: "btn btn-success btn-extra-padding",
        disabled: saving }, void 0,

      saving && /*#__PURE__*/_jsx(_UI.Icon, { icon: "spinner", pulse: true, fixedWidth: true }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Save')))))));






  }}exports.RelationshipsFormButtons = RelationshipsFormButtons;











const mapStateToProps = ({ relationships }) => ({
  editing: relationships.hubActions.get('editing'),
  saving: relationships.hubActions.get('saving'),
  parentEntity: relationships.list.entity,
  searchResults: relationships.list.searchResults });


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    edit: actions.edit,
    save: actions.saveRelationships },

  dispatch);

}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RelationshipsFormButtons);exports.default = _default;