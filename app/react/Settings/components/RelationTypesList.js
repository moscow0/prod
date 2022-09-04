"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.RelationTypesList = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _I18N = require("../../I18N");
var _relationTypesActions = require("../../RelationTypes/actions/relationTypesActions");



var _RelationTypesAPI = _interopRequireDefault(require("../../RelationTypes/RelationTypesAPI"));
var _RouteHandler = _interopRequireDefault(require("../../App/RouteHandler"));
var _UI = require("../../UI");
var _BasicReducer = require("../../BasicReducer");
var _notificationsActions = require("../../Notifications/actions/notificationsActions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class RelationTypesList extends _RouteHandler.default {
  static async requestState(requestParams) {
    const relationTypes = await _RelationTypesAPI.default.get(requestParams.onlyHeaders());
    return [_BasicReducer.actions.set('relationTypes', relationTypes)];
  }

  deleteRelationType(relationType) {
    return this.props.
    checkRelationTypeCanBeDeleted(relationType).
    then(() => {
      this.context.confirm({
        accept: () => {
          this.props.deleteRelationType(relationType);
        },
        title: /*#__PURE__*/
        _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, "Confirm delete connection type:"), "\xA0", relationType.name),


        message: 'Are you sure you want to delete this connection type?' });

    }).
    catch(() => {
      this.context.confirm({
        accept: () => {},
        noCancel: true,
        title: /*#__PURE__*/
        _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, "Cannot delete connection type:"), "\xA0", relationType.name),


        message: 'This connection type is being used and cannot be deleted.' });

    });
  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, (0, _I18N.t)('System', 'Relationship types')), /*#__PURE__*/
      _jsx("ul", { className: "list-group relation-types" }, void 0,
      this.props.relationTypes.toJS().map((relationType, index) => /*#__PURE__*/
      _jsx("li", { className: "list-group-item" }, index, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: `/settings/connections/edit/${relationType._id}` }, void 0,
      relationType.name), /*#__PURE__*/

      _jsx("div", { className: "list-group-item-actions" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, {
        to: `/settings/connections/edit/${relationType._id}`,
        className: "btn btn-default btn-xs" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "pencil-alt" }), "\xA0", /*#__PURE__*/

      _jsx("span", {}, void 0, (0, _I18N.t)('System', 'Edit'))), /*#__PURE__*/

      _jsx("a", {
        onClick: this.deleteRelationType.bind(this, relationType),
        className: "btn btn-danger btn-xs template-remove" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" }), "\xA0", /*#__PURE__*/

      _jsx("span", {}, void 0, (0, _I18N.t)('System', 'Delete'))))))), /*#__PURE__*/





      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: "/settings/connections/new", className: "btn btn-default" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "plus" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Add connection')))))));





  }}exports.RelationTypesList = RelationTypesList;


RelationTypesList.propTypes = {
  relationTypes: _propTypes.default.object,
  deleteRelationType: _propTypes.default.func,
  notify: _propTypes.default.func,
  checkRelationTypeCanBeDeleted: _propTypes.default.func };


RelationTypesList.contextTypes = {
  confirm: _propTypes.default.func,
  store: _propTypes.default.object };


function mapStateToProps(state) {
  return { relationTypes: state.relationTypes };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  { notify: _notificationsActions.notify, deleteRelationType: _relationTypesActions.deleteRelationType, checkRelationTypeCanBeDeleted: _relationTypesActions.checkRelationTypeCanBeDeleted },
  dispatch);

}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RelationTypesList);exports.default = _default;