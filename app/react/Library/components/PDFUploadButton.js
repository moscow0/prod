"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PDFUploadButton = void 0;var _I18N = require("../../I18N");
var _Multireducer = require("../../Multireducer");
var _UI = require("../../UI");
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");


var _uploadsActions = require("../../Uploads/actions/uploadsActions");




var _libraryActions = require("../actions/libraryActions");
var _reactRedux = require("react-redux");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const extractTitle = (file) => {
  const title = file.name.
  replace(/\.[^/.]+$/, '').
  replace(/_/g, ' ').
  replace(/-/g, ' ').
  replace(/ {2}/g, ' ');

  return title.charAt(0).toUpperCase() + title.slice(1);
};













const onChangePDFs =
({ createDocument, uploadDocument, unselectAllDocuments }) =>
(e) => {
  const { files } = e.target;
  const count = (files === null || files === void 0 ? void 0 : files.length) || 0;

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < count; index++) {
    const file = files[index];
    const doc = { title: extractTitle(file) };
    createDocument(doc).
    then((newDoc) => {
      uploadDocument(newDoc.sharedId, file);
    }).
    catch(() => {});
  }

  unselectAllDocuments();
};

const PDFUploadButtonComponent = ({
  createDocument,
  uploadDocument,
  unselectAllDocuments }) =>
{
  const onChangeHandler = (0, _react.useMemo)(
  () =>
  onChangePDFs({
    createDocument,
    uploadDocument,
    unselectAllDocuments }),

  [createDocument, uploadDocument, unselectAllDocuments]);


  return /*#__PURE__*/(
    _jsx("label", { htmlFor: "pdf-upload-button", className: "btn btn-default" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "cloud-upload-alt" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Upload PDF(s) to create")), /*#__PURE__*/

    _jsx("input", {
      type: "file",
      id: "pdf-upload-button",
      style: { display: 'none' },
      accept: "application/pdf",
      multiple: true,
      onChange: onChangeHandler })));



};

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)(
  {
    uploadDocument: _uploadsActions.uploadDocument,
    unselectAllDocuments: _libraryActions.unselectAllDocuments,
    createDocument: _uploadsActions.createDocument },

  (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));

}

const PDFUploadButton = (0, _reactRedux.connect)(
null,
mapDispatchToProps)(
PDFUploadButtonComponent);exports.PDFUploadButton = PDFUploadButton;