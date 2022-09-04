"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.LibraryFooter = void 0;var _I18N = require("../../I18N");
var _Multireducer = require("../../Multireducer");
var _UI = require("../../UI");
var _react = _interopRequireDefault(require("react"));
var _redux = require("redux");
var _uploadsActions = require("../../Uploads/actions/uploadsActions");



var _reactRedux = require("react-redux");
var _Auth = require("../../Auth");
var _ExportButton = _interopRequireDefault(require("./ExportButton"));
var _PDFUploadButton = require("./PDFUploadButton");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}












const LibraryFooterComponent = ({ storeKey, newEntity, showImportPanel }) => /*#__PURE__*/
_jsx("div", { className: "library-footer with-sidepanel remove-nesting" }, void 0, /*#__PURE__*/
_jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
_jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor', 'collaborator'] }, void 0, /*#__PURE__*/
_jsx("button", {
  className: "btn btn-default btn-footer-hover-success",
  type: "button",
  onClick: () => newEntity(storeKey) }, void 0, /*#__PURE__*/

_jsx(_UI.Icon, { icon: "plus" }), /*#__PURE__*/
_jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Create entity")))), /*#__PURE__*/



_jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor', 'collaborator'] }, void 0, /*#__PURE__*/
_jsx(_PDFUploadButton.PDFUploadButton, { storeKey: storeKey })), /*#__PURE__*/

_jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'] }, void 0, /*#__PURE__*/
_jsx("button", { className: "btn btn-default sm-order-1", type: "button", onClick: showImportPanel }, void 0, /*#__PURE__*/
_jsx(_UI.Icon, { icon: "import-csv", transform: "up-0.2" }), /*#__PURE__*/
_jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Import CSV")))), /*#__PURE__*/



_jsx(_ExportButton.default, { className: "sm-order-1", storeKey: storeKey })));




function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)(
  { newEntity: _uploadsActions.newEntity, showImportPanel: _uploadsActions.showImportPanel },
  (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));

}

const LibraryFooter = (0, _reactRedux.connect)(
null,
mapDispatchToProps)(
LibraryFooterComponent);exports.LibraryFooter = LibraryFooter;