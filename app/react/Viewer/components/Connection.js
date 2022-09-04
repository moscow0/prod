"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Connection = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _immutable = require("immutable");
var _I18N = require("../../I18N");
var _Auth = require("../../Auth");
var _UI = require("../../UI");

var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _referencesActions = require("../actions/referencesActions");
var _uiActions = require("../actions/uiActions");




var _Layout = require("../../Layout");
var _reselect = require("reselect");
var _helpers = _interopRequireDefault(require("../../Documents/helpers"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const selectDoc = (0, _reselect.createSelector)(
(s) => s.documentViewer.targetDoc,
(s) => s.documentViewer.doc,
(targetDoc, doc) =>
targetDoc.get('_id') ?
_helpers.default.performantDocToJSWithoutRelations(targetDoc) :
_helpers.default.performantDocToJSWithoutRelations(doc));


class Connection extends _react.Component {
  clickReference(reference) {
    if (this.props.readOnly) {
      return;
    }
    if (!this.props.targetDoc) {
      this.props.activateReference(reference, this.props.referencesSection);
    }

    if (this.props.targetDoc && typeof reference.reference !== 'undefined') {
      this.props.selectReference(reference);
    }
  }

  deleteReference(reference) {
    this.context.confirm({
      accept: () => {
        this.props.deleteReference(reference);
      },
      title: 'Confirm delete connection',
      message: 'Are you sure you want to delete this connection?' });

  }

  relationType(id) {
    const type = this.props.relationTypes.find((relation) => relation.get('_id') === id);
    if (type) {
      return type.name;
    }
  }

  render() {
    const { reference } = this.props;
    let itemClass = '';
    const disabled = this.props.targetDoc && typeof reference.reference === 'undefined';

    if (this.props.highlighted) {
      itemClass = 'relationship-hover';
    }

    if (this.props.active) {
      itemClass = 'relationship-active';
    }

    if (this.props.active && this.props.targetDoc && this.props.targetRange) {
      itemClass = 'relationship-selected';
    }

    if (this.props.readOnly) {
      itemClass = '';
    }

    const doc = (0, _immutable.fromJS)(reference.associatedRelationship.entityData);
    return /*#__PURE__*/(
      _jsx(_Layout.Item, {
        onMouseEnter: this.props.highlightReference.bind(null, reference._id),
        onMouseLeave: this.props.highlightReference.bind(null, null),
        onClick: this.clickReference.bind(this, reference),
        doc: doc,
        noMetadata: true,
        className: `${itemClass} item-${reference._id} ${disabled ? 'disabled' : ''} ${
        this.props.readOnly ? 'readOnly' : ''
        }`,
        "data-id": reference._id,
        additionalText:
        reference.associatedRelationship.reference ?
        reference.associatedRelationship.reference.text :
        null,

        additionalMetadata: [
        { label: 'Connection type', value: this.relationType(reference.template) }],

        evalPublished: true,
        buttons: /*#__PURE__*/
        _jsx("div", { className: "item-shortcut-group" }, void 0, /*#__PURE__*/
        _jsx(_ShowIf.default, { if: !this.props.targetDoc && !this.props.readOnly }, void 0, /*#__PURE__*/
        _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'] }, void 0, /*#__PURE__*/
        _jsx("a", {
          className: "item-shortcut btn btn-default btn-hover-danger delete",
          onClick: this.deleteReference.bind(this, reference) }, void 0, /*#__PURE__*/

        _jsx(_UI.Icon, { icon: "trash-alt" })))), /*#__PURE__*/




        _jsx(_ShowIf.default, { if: !this.props.targetDoc }, void 0, /*#__PURE__*/
        _jsx(_I18N.I18NLink, {
          to: `/entity/${doc.get('sharedId')}`,
          onClick: (e) => e.stopPropagation(),
          className: "item-shortcut btn btn-default" }, void 0, /*#__PURE__*/

        _jsx(_UI.Icon, { icon: "file" })))) }));






  }}exports.Connection = Connection;


Connection.contextTypes = {
  confirm: _propTypes.default.func };


Connection.defaultProps = {
  targetDoc: false };

















const mapStateToProps = (state, ownProps) => {
  const { documentViewer } = state;
  return {
    highlighted: documentViewer.uiState.get('highlightedReference') === ownProps.reference._id,
    active: documentViewer.uiState.get('activeReference') === ownProps.reference._id,
    targetRange: documentViewer.uiState.get('reference').get('targetRange'),
    targetDoc: !!documentViewer.targetDoc.get('_id'),
    relationTypes: documentViewer.relationTypes,
    doc: selectDoc(state) };

};

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    highlightReference: _uiActions.highlightReference,
    activateReference: _uiActions.activateReference,
    selectReference: _uiActions.selectReference,
    deleteReference: _referencesActions.deleteReference },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Connection);exports.default = _default;