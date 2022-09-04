"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.RemovePropertyConfirm = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _Modal = _interopRequireDefault(require("../../Layout/Modal"));
var _I18N = require("../../I18N");
var _templateActions = require("../actions/templateActions");
var _modalActions = require("../../Modals/actions/modalActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class RemovePropertyConfirm extends _react.Component {
  confirm() {
    this.props.hideModal('RemovePropertyModal');
    this.props.removeProperty(this.props.propertyBeingDeleted);
  }

  render() {
    return /*#__PURE__*/(
      _jsx(_Modal.default, { isOpen: this.props.isOpen || false, type: "danger", zIndex: 99 }, void 0, /*#__PURE__*/
      _jsx(_Modal.default.Body, {}, void 0, /*#__PURE__*/
      _jsx("h4", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Confirm deletion")), /*#__PURE__*/

      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Property delete warning" }, void 0, "Deleting a template property will delete this metadata information on all documents using this template.")), /*#__PURE__*/




      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Change will take effect after saving the template"))), /*#__PURE__*/



      _jsx(_Modal.default.Footer, {}, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "btn btn-default cancel-button",
        onClick: () => this.props.hideModal('RemovePropertyModal') }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Cancel")), /*#__PURE__*/

      _jsx("button", {
        type: "button",
        className: "btn btn-danger confirm-button",
        onClick: () => this.confirm() }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Delete Property")))));




  }}exports.RemovePropertyConfirm = RemovePropertyConfirm;









const mapStateToProps = (state) => {
  const propertyBeingDeleted = state.modals.toJS().RemovePropertyModal;
  return {
    propertyBeingDeleted,
    isOpen: typeof propertyBeingDeleted === 'number' };

};

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ hideModal: _modalActions.hideModal, removeProperty: _templateActions.removeProperty }, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RemovePropertyConfirm);exports.default = _default;