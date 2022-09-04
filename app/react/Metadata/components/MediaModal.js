"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MediaModalType = exports.MediaModal = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactModal = _interopRequireDefault(require("react-modal"));
var _reactPlayer = _interopRequireDefault(require("react-player"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");
var _lodash = require("lodash");
var _I18N = require("../../I18N");
var _UI = require("../../UI");

var _uniqueID = _interopRequireDefault(require("../../../shared/uniqueID"));

var _WebMediaResourceForm = require("../../Attachments/components/WebMediaResourceForm");
var _supportingFilesActions = require("../actions/supportingFilesActions");
var _extensionHelper = require("../../../api/files/extensionHelper");
var _MediaModalFileList = require("./MediaModalFileList");
var _MediaModalUploadFileButton = require("./MediaModalUploadFileButton");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var

MediaModalType;exports.MediaModalType = MediaModalType;(function (MediaModalType) {MediaModalType[MediaModalType["Image"] = 0] = "Image";MediaModalType[MediaModalType["Media"] = 1] = "Media";})(MediaModalType || (exports.MediaModalType = MediaModalType = {}));




const getAcceptedFileTypes = (type) =>
type === MediaModalType.Image ? 'image/*' : 'video/*';













const mapStateToProps = (state, ownProps) => {
  const model = ownProps.formModel;
  return {
    entity: (0, _lodash.get)(state, model) };

};

const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)(
{ localAttachmentAction: _supportingFilesActions.uploadLocalAttachment, rrfChange: _reactReduxForm.actions.change },
dispatch);


const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);




function filterAttachments(
type,
attachments)
{
  const filteredAttachments = attachments.map((a) => {
    const mimetype = a.url && !a.mimetype ? (0, _extensionHelper.mimeTypeFromUrl)(a.url) : a.mimetype;
    return _objectSpread(_objectSpread({}, a), {}, { mimetype });
  });
  switch (type) {
    case MediaModalType.Image:
      return filteredAttachments.filter((a) => a.mimetype && a.mimetype.includes('image'));
    case MediaModalType.Media:
      return filteredAttachments.filter(
      (a) =>
      a.mimetype && (a.mimetype.includes('video') || a.mimetype.includes('audio')) ||
      a.url && _reactPlayer.default.canPlay(a.url));

    default:
      return attachments;}

}

const MediaModalComponent = ({
  isOpen,
  attachments = [],
  selectedUrl,
  entity,
  formModel,
  formField,
  type,
  multipleEdition,
  onClose,
  onChange,
  localAttachmentAction,
  rrfChange }) =>
{
  const filteredAttachments = (0, _react.useMemo)(
  () => filterAttachments(type, attachments),
  [attachments, type]);


  const inputFileRef = (0, _react.useRef)(null);

  const handleAttachmentClick = (url) => () => {
    onChange(url);
    onClose();
  };

  const handleSubmitFromUrl = (formData) => {
    onChange(formData.url);
    onClose();
  };

  const handleFileInPublicForm = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const data = { data: URL.createObjectURL(files[0]), originalFile: files[0] };
      onChange(data);
      onClose();
    }
  };

  const handleUploadButtonClicked = () => {var _inputFileRef$current;
    (_inputFileRef$current = inputFileRef.current) === null || _inputFileRef$current === void 0 ? void 0 : _inputFileRef$current.click();
  };

  const handleInputFileChange = async (event) => {
    const [file] = event.target.files || [];

    if (file) {
      const fileLocalID = (0, _uniqueID.default)();

      localAttachmentAction(
      entity.sharedId || 'NEW_ENTITY',
      file,
      {
        __reducerKey: 'library',
        model: formModel },

      fileLocalID);

      rrfChange(formField, fileLocalID);
      onClose();
    }
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


    _jsx("button", { type: "button", onClick: onClose, className: "attachments-modal__close" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "times" }), /*#__PURE__*/
    _jsx("span", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Close")))), /*#__PURE__*/



    _jsx("div", { className: "attachments-modal__content" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "attachments-modal__tabs-content" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "upload-options" }, void 0,
    !multipleEdition && /*#__PURE__*/
    _jsx(_MediaModalUploadFileButton.MediaModalUploadFileButton, {
      formModel: formModel,
      acceptedFileTypes: getAcceptedFileTypes(type),
      inputFileRef: inputFileRef,
      handleUploadButtonClicked: handleUploadButtonClicked,
      handleFileInPublicForm: handleFileInPublicForm,
      handleInputFileChange: handleInputFileChange }),


    !multipleEdition && /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "or"), /*#__PURE__*/
    _jsx("div", { className: "wrapper-web" }, void 0, /*#__PURE__*/
    _jsx(_WebMediaResourceForm.WebMediaResourceForm, { handleSubmit: handleSubmitFromUrl }))), /*#__PURE__*/


    _jsx("div", {
      className: `tab-content attachments-modal__tabs-content ${
      !filteredAttachments.length ? 'centered' : ''
      }` }, void 0, /*#__PURE__*/

    _jsx(_MediaModalFileList.MediaModalFileList, {
      filteredAttachments: filteredAttachments,
      handleAttachmentClick: handleAttachmentClick,
      selectedUrl: selectedUrl || '' }))))));






};

const container = connector(MediaModalComponent);exports.MediaModal = container;