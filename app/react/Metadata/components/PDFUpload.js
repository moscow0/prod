"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PDFUpload = void 0;var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactReduxForm = require("react-redux-form");
var _reactRedux = require("react-redux");
var _lodash = require("lodash");
var _UI = require("../../UI");
var _I18N = require("../../I18N");

var _MetadataFormFiles = require("./MetadataFormFiles");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}





const handlePDFUpload =
(event, model) => (dispatch) => {
  const { files } = event.target;
  if (files && files.length > 0) {
    Array.from(files).forEach((file) => {
      const data = { data: URL.createObjectURL(file), originalFile: file };
      dispatch(_reactReduxForm.actions.push(`${model}.documents`, data));
    });
  }
};

const mapStateToProps = (state, ownProps) => {
  const entity = (0, _lodash.get)(state, ownProps.model);
  return {
    entity };

};

const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)({ handlePDFUploadAction: handlePDFUpload }, dispatch);

const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);




const PDFUpload = ({ model, entity, handlePDFUploadAction }) => {
  const inputFileRef = (0, _react.useRef)(null);

  const handleUploadButtonClicked = () => {var _inputFileRef$current;
    (_inputFileRef$current = inputFileRef.current) === null || _inputFileRef$current === void 0 ? void 0 : _inputFileRef$current.click();
  };

  return /*#__PURE__*/(
    _jsx("div", { className: "document-list-parent" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "attachments-list-header editor" }, void 0, /*#__PURE__*/
    _jsx("h2", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Primary Documents")), /*#__PURE__*/

    _jsx("button", { type: "button", onClick: handleUploadButtonClicked, className: "btn" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "plus" }), "\xA0", /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Add PDF"))), /*#__PURE__*/


    _react.default.createElement("input", {
      "aria-label": "pdfInput",
      type: "file",
      onChange: (event) => handlePDFUploadAction(event, model),
      style: { display: 'none' },
      ref: inputFileRef,
      accept: "application/pdf",
      multiple: true }), /*#__PURE__*/

    _jsx(_MetadataFormFiles.MetadataFormFiles, { model: model, type: "document", files: entity.documents })));


};

const container = connector(PDFUpload);exports.PDFUpload = container;