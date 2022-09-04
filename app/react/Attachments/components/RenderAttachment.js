"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.RenderAttachment = void 0;var _react = _interopRequireDefault(require("react"));

var _reactPlayer = _interopRequireDefault(require("react-player"));

var _MarkdownMedia = _interopRequireDefault(require("../../Markdown/components/MarkdownMedia"));
var _fileUploadUtils = require("../../../shared/fileUploadUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const RenderAttachment = ({ attachment }) => {
  const { mimetype = '' } = attachment;

  const fileURL = (0, _fileUploadUtils.isSerializedFile)(attachment) ? (0, _fileUploadUtils.prepareHTMLMediaView)(attachment) : attachment.url;

  if (mimetype.includes('image')) {
    return fileURL ? /*#__PURE__*/
    _jsx("img", { src: fileURL, alt: attachment.originalname }) : /*#__PURE__*/

    _jsx("img", { src: `/api/files/${attachment.filename}`, alt: attachment.originalname });

  }

  const isVideoAudio = mimetype.includes('video') || mimetype.includes('audio');

  const isFromSupportedSite = attachment.url && _reactPlayer.default.canPlay(attachment.url);

  if (isVideoAudio || isFromSupportedSite) {
    return fileURL ? /*#__PURE__*/
    _jsx(_MarkdownMedia.default, { config: `(${fileURL})` }) : /*#__PURE__*/

    _jsx(_MarkdownMedia.default, { config: `(/api/files/${attachment.filename})` });

  }

  return null;
};exports.RenderAttachment = RenderAttachment;