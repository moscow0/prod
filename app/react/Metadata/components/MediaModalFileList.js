"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MediaModalFileList = void 0;var _react = _interopRequireDefault(require("react"));
var _filesize = _interopRequireDefault(require("filesize"));
var _I18N = require("../../I18N");

var _Attachments = require("../../Attachments");

var _fileUploadUtils = require("../../../shared/fileUploadUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}







const MediaModalFileList = ({
  filteredAttachments,
  handleAttachmentClick,
  selectedUrl }) =>

filteredAttachments.length > 0 ? /*#__PURE__*/
_jsx("div", { className: "media-grid container" }, void 0, /*#__PURE__*/
_jsx("div", { className: "row" }, void 0,
filteredAttachments.map((attachment) => {
  const attachmentUrl =
  attachment.url || attachment.fileLocalID || `/api/files/${attachment.filename}`;

  const fileSize =
  (0, _fileUploadUtils.isSerializedFile)(attachment) && attachment.serializedFile ?
  attachment.serializedFile.length :
  attachment.size;

  const sizeLabel = fileSize ? (0, _filesize.default)(fileSize) : '_';

  return /*#__PURE__*/(
    _jsx("div", {
      className: "media-grid-item",

      onClick: handleAttachmentClick(attachmentUrl) }, `attachment_${attachment._id}`, /*#__PURE__*/

    _jsx("div", {
      className: `${'media-grid-card'} ${attachmentUrl === selectedUrl ? 'active' : ''}` }, void 0, /*#__PURE__*/

    _jsx("div", { className: "media-grid-card-header" }, void 0, /*#__PURE__*/
    _jsx("h5", {}, void 0, attachment.originalname), /*#__PURE__*/
    _jsx("span", { style: !fileSize ? { color: '#FFFFFF' } : {} }, void 0, sizeLabel)), /*#__PURE__*/

    _jsx("div", { className: "media-grid-card-content" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "media" }, void 0, /*#__PURE__*/
    _jsx(_Attachments.RenderAttachment, { attachment: attachment }))))));





}))) : /*#__PURE__*/



_jsx("h4", { className: "empty-attachments-message" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "No attachments"));exports.MediaModalFileList = MediaModalFileList;