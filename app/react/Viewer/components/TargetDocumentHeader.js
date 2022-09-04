"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.TargetDocumentHeader = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _I18N = require("../../I18N");

var _UI = require("../../UI");
var _referencesActions = require("../actions/referencesActions");
var _documentActions = require("../actions/documentActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class TargetDocumentHeader extends _react.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save() {
    const { reference, connection } = this.props;
    const { targetRange, targetFile } = reference;
    return this.props.saveTargetRangedReference(connection.toJS(), targetRange, targetFile, (ref) => {
      this.props.addReference(ref, true);
    });
  }

  render() {
    const { targetDocument, reference } = this.props;
    const { targetRange } = reference;

    let className = 'btn btn-default hidden';

    if (targetDocument && targetRange) {
      className = 'btn btn-success';
    }

    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: "relationship-steps is-fixed" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: this.props.cancelTargetDocument,
        className: "btn btn-default" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "arrow-left" }), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Back")), /*#__PURE__*/

      _jsx("h2", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Select target paragraph"), /*#__PURE__*/
      _jsx("small", {}, void 0, "3"))), /*#__PURE__*/


      _jsx("div", { className: "ContextMenu ContextMenu-center" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", onClick: this.save, className: className }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "save" }), /*#__PURE__*/
      _jsx("span", { className: "ContextMenu-tooltip" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Save"))))));





  }}exports.TargetDocumentHeader = TargetDocumentHeader;











function mapStateToProps({ documentViewer, connections }) {
  return {
    connection: connections.connection,
    reference: documentViewer.uiState.toJS().reference,
    targetDocument: documentViewer.targetDoc.get('_id') };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    saveTargetRangedReference: _referencesActions.saveTargetRangedReference,
    cancelTargetDocument: _documentActions.cancelTargetDocument,
    addReference: _referencesActions.addReference },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TargetDocumentHeader);exports.default = _default;