"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ConnectionsList = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _Layout = require("../../Layout");
var _uiActions = require("../actions/uiActions");
var _Connection = _interopRequireDefault(require("./Connection"));
var _sortTextSelections = require("../utils/sortTextSelections");

require("../scss/viewReferencesPanel.scss");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ConnectionsList extends _react.Component {
  static blankStateMessage(title, message) {
    return /*#__PURE__*/(
      _jsx("div", { className: "blank-state" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "sitemap" }), /*#__PURE__*/
      _jsx("h4", {}, void 0, (0, _I18N.t)('System', title)), /*#__PURE__*/
      _jsx("p", {}, void 0, (0, _I18N.t)('System', message))));


  }

  // TODO: remove this method is it's not used anywhere
  // eslint-disable-next-line react/no-unused-class-component-methods
  close() {
    this.props.closePanel();
    this.props.deactivateReference();
  }

  render() {
    const references = this.props.references.
    toJS().
    sort((a, b) => (0, _sortTextSelections.sortTextSelections)(a.reference, b.reference));

    if (this.props.loading) {
      return false;
    }

    if (!this.props.references.size && this.props.referencesSection === 'references') {
      return ConnectionsList.blankStateMessage('No References', 'No References description');
    }

    if (!this.props.references.size) {
      return ConnectionsList.blankStateMessage('No Connections', 'No Connections description');
    }

    return /*#__PURE__*/(
      _jsx("div", { className: "item-group" }, void 0,
      references.length > 299 && /*#__PURE__*/
      _jsx(_Layout.Warning, { inline: true }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Text references limit warning" }, void 0, "Text references are temporarily limited to a maximum of 300. We are currently working on a fix for this issue.")),





      (() =>
      references.map((reference) => /*#__PURE__*/
      _jsx(_Connection.default, { readOnly: this.props.readOnly, reference: reference }, reference._id)))()));



  }}exports.ConnectionsList = ConnectionsList;











function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ closePanel: _uiActions.closePanel, deactivateReference: _uiActions.deactivateReference }, dispatch);
}var _default =

(0, _reactRedux.connect)(null, mapDispatchToProps)(ConnectionsList);exports.default = _default;