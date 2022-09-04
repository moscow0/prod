"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _lodash = require("lodash");
var _I18N = require("../../I18N");
var _UI = require("../../UI");

var _fileUploadUtils = require("../../../shared/fileUploadUtils");
var _MediaModal = require("../../Metadata/components/MediaModal");
var _MarkdownMedia = _interopRequireDefault(require("../../Markdown/components/MarkdownMedia"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









const getValue = (value) =>
(0, _lodash.isObject)(value) && value.data ? value.data : value;

const prepareValue = (
value,
localAttachments) =>
{
  const valueString = getValue(value);
  const values = {
    originalValue: valueString,
    fileURL: valueString,
    type: '' };


  if (/^[a-zA-Z\d_]*$/.test(values.originalValue)) {
    values.type = 'uploadId';
  }

  if (/^https?:\/\//.test(values.originalValue)) {
    values.type = 'webUrl';
  }

  const supportingFile = localAttachments.find(
  (file) => values.originalValue === (file.url || file.fileLocalID || `/api/files/${file.filename}`));


  if (values.type === 'uploadId' && supportingFile) {
    values.fileURL = (0, _fileUploadUtils.prepareHTMLMediaView)(supportingFile);
  }

  return _objectSpread(_objectSpread({}, values), {}, { supportingFile });
};

const MediaField = (props) => {
  const {
    value,
    onChange,
    type,
    localAttachments = [],
    formModel,
    name: formField,
    multipleEdition } =
  props;
  const [openModal, setOpenModal] = (0, _react.useState)(false);

  const handleCloseMediaModal = () => {
    setOpenModal(false);
  };

  const handleImageRemove = () => {
    onChange(null);
  };

  const file = prepareValue(value, localAttachments);

  (0, _react.useEffect)(() => {
    if (file.originalValue && !file.supportingFile && file.type === 'uploadId') {
      handleImageRemove();
    }
  }, [localAttachments]);

  (0, _react.useEffect)(
  () => () => {var _file$supportingFile;
    if ((_file$supportingFile = file.supportingFile) !== null && _file$supportingFile !== void 0 && _file$supportingFile.serializedFile && file.fileURL) {
      URL.revokeObjectURL(file.fileURL);
    }
  },
  []);


  return /*#__PURE__*/(
    _jsx("div", { className: "search__filter--selected__media" }, void 0,
    file.fileURL && (
    type === _MediaModal.MediaModalType.Image ? /*#__PURE__*/
    _jsx("img", { src: file.fileURL, alt: "" }) : /*#__PURE__*/

    _jsx(_MarkdownMedia.default, { config: file.fileURL })), /*#__PURE__*/


    _jsx("div", { className: "search__filter--selected__media-toolbar" }, void 0, /*#__PURE__*/
    _jsx("button", { type: "button", onClick: () => setOpenModal(true), className: "btn" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "plus" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, value ? 'Update' : 'Add file')),


    file.originalValue && /*#__PURE__*/
    _jsx("button", { type: "button", onClick: handleImageRemove, className: "btn" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "unlink" }), "\xA0 ", /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Unlink"))), /*#__PURE__*/




    _jsx(_MediaModal.MediaModal, {
      isOpen: openModal,
      onClose: handleCloseMediaModal,
      onChange: onChange,
      selectedUrl: file.originalValue,
      attachments: localAttachments,
      type: type,
      formModel: formModel,
      formField: formField,
      multipleEdition: multipleEdition })));



};var _default =

MediaField;exports.default = _default;