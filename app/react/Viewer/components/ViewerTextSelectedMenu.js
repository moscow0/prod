"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ViewerTextSelectedMenu = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");

var _Connections = require("../../Connections");
var _uiActions = require("../actions/uiActions");
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _UI = require("../../UI");
var _I18N = require("../../I18N");

var _documentActions = require("../actions/documentActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ViewerTextSelectedMenu extends _react.Component {
  showPanel(type) {
    this.props.openPanel('viewMetadataPanel');
    this.props.startNewConnection(type, this.props.doc.get('sharedId'));
  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: this.props.active ? 'active' : '' }, void 0, /*#__PURE__*/
      _jsx(_ShowIf.default, { if: this.props.hasRelationTypes }, void 0, /*#__PURE__*/
      _jsx("div", {
        className: "btn btn-primary connect-to-p",
        onClick: this.showPanel.bind(this, 'targetRanged') }, void 0, /*#__PURE__*/

      _jsx("span", { className: "ContextMenu-tooltip" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Connect to a paragraph")), /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "paragraph" }))), /*#__PURE__*/


      _jsx(_ShowIf.default, { if: this.props.hasRelationTypes }, void 0, /*#__PURE__*/
      _jsx("div", {
        className: "btn btn-primary connect-to-d",
        onClick: this.showPanel.bind(this, 'ranged') }, void 0, /*#__PURE__*/

      _jsx("span", { className: "ContextMenu-tooltip" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Connect to a document")), /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "file" }))), /*#__PURE__*/


      _jsx("div", {
        className: "btn btn-primary add-toc",
        onClick: this.props.addToToc.bind(null, this.props.reference.toJS(), this.props.file.toc) }, void 0, /*#__PURE__*/

      _jsx("span", { className: "ContextMenu-tooltip" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Add to table of contents")), /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "font" }))));



  }}exports.ViewerTextSelectedMenu = ViewerTextSelectedMenu;













function mapStateToProps({ documentViewer, relationTypes }) {
  return {
    doc: documentViewer.doc,
    reference: documentViewer.uiState.get('reference'),
    hasRelationTypes: !!relationTypes.size };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    startNewConnection: _Connections.actions.startNewConnection,
    openPanel: _uiActions.openPanel,
    addToToc: _documentActions.addToToc },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ViewerTextSelectedMenu);exports.default = _default;