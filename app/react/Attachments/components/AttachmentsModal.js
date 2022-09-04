"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.AttachmentsModalCmp = exports.AttachmentsModal = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactModal = _interopRequireDefault(require("react-modal"));
var _reactTabsRedux = require("react-tabs-redux");
var _reactDropzone = _interopRequireDefault(require("react-dropzone"));
var _redux = require("redux");
var _reactReduxForm = require("react-redux-form");
var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _WebMediaResourceForm = require("./WebMediaResourceForm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}












const AttachmentsModalCmp = ({
  isOpen,
  entitySharedId,
  storeKey,
  model,
  onClose,
  uploadAttachment: uploadAttachmentProp,
  uploadAttachmentFromUrl: uploadAttachmentFromUrlProp,
  getPercentage }) =>
{
  const inputFileRef = (0, _react.useRef)(null);
  let formDispatch = () => {};

  const handleUploadButtonClicked = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleInputFileChange = async (event) => {
    if (event.target.files) {
      await Promise.all(
      [...event.target.files].map((file) =>
      uploadAttachmentProp(entitySharedId, file, { __reducerKey: storeKey, model })));


    }
  };

  const handleDropFiles = async (accepted) => {
    await Promise.all(
    accepted.map((file) =>
    uploadAttachmentProp(entitySharedId, file, { __reducerKey: storeKey, model })));


  };

  const handleSubmitUrlForm = (formModelData) => {
    uploadAttachmentFromUrlProp(entitySharedId, formModelData, { __reducerKey: storeKey, model });
    formDispatch(_reactReduxForm.actions.reset('urlForm'));
  };

  return /*#__PURE__*/(
    _jsx(_reactModal.default, {
      isOpen: isOpen,
      className: "attachments-modal",
      overlayClassName: "attachments-modal__overlay",
      ariaHideApp: false }, void 0, /*#__PURE__*/

    _jsx("div", { className: "attachments-modal__header" }, void 0, /*#__PURE__*/
    _jsx("h4", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Supporting files")), /*#__PURE__*/


    _jsx("button", {
      type: "button",
      onClick: onClose,
      className: "attachments-modal__close",
      disabled: getPercentage !== undefined }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "times" }), /*#__PURE__*/
    _jsx("span", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Cancel")))), /*#__PURE__*/



    _jsx("div", { className: "attachments-modal__content" }, void 0, /*#__PURE__*/
    _jsx(_reactTabsRedux.Tabs, { renderActiveTabContentOnly: true }, void 0, /*#__PURE__*/
    _jsx("div", { className: "attachments-modal__tabs" }, void 0, /*#__PURE__*/
    _jsx(_reactTabsRedux.TabLink, { to: "uploadComputer", className: "tab-link modal-tab-1", component: "div" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Upload from computer")), /*#__PURE__*/

    _jsx(_reactTabsRedux.TabLink, { to: "uploadWeb", className: "tab-link modal-tab-2", component: "div" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Add from web"))), /*#__PURE__*/



    _jsx("div", { className: "attachments-modal__tabs-content" }, void 0, /*#__PURE__*/
    _jsx(_reactTabsRedux.TabContent, { for: "uploadComputer", className: "tab-content centered" }, void 0, /*#__PURE__*/
    _jsx(_reactDropzone.default, {
      disableClick: true,
      onDrop: handleDropFiles,
      className: "attachments-modal__dropzone",
      multiple: false }, void 0,

    getPercentage === undefined ? /*#__PURE__*/
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx("button", { type: "button", onClick: handleUploadButtonClicked, className: "btn" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "link" }), "\xA0 ", /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Upload and select file")), /*#__PURE__*/

    _react.default.createElement("input", {
      "aria-label": "fileInput",
      type: "file",
      onChange: handleInputFileChange,
      style: { display: 'none' },
      ref: inputFileRef }), /*#__PURE__*/

    _jsx("h4", { className: "attachments-modal__dropzone-title" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Drag and drop file in this window to upload "))) : /*#__PURE__*/



    _jsx("div", { className: "progress attachments-modal-progress" }, void 0, /*#__PURE__*/
    _jsx("div", {
      className: "progress-bar progress-bar-success attachments-modal-progress-bar",
      role: "progressbar",
      style: { width: `${getPercentage}%` } })))), /*#__PURE__*/





    _jsx(_reactTabsRedux.TabContent, { for: "uploadWeb", className: "tab-content centered" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "wrapper-web" }, void 0, /*#__PURE__*/
    _jsx(_WebMediaResourceForm.WebMediaResourceForm, {
      handleSubmit: handleSubmitUrlForm,
      dispatch: (dispatch) => {
        formDispatch = dispatch;
      },
      hasName: true }))))))));








};exports.AttachmentsModalCmp = AttachmentsModalCmp;

const mapDispatchToProps = (dispatch, ownProps) =>
(0, _redux.bindActionCreators)(
{
  uploadAttachment: ownProps.uploadAttachment,
  uploadAttachmentFromUrl: ownProps.uploadAttachmentFromUrl },

dispatch);


const AttachmentsModal = (0, _reactRedux.connect)(null, mapDispatchToProps)(AttachmentsModalCmp);exports.AttachmentsModal = AttachmentsModal;