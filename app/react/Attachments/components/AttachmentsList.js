"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _I18N = require("../../I18N");
var _advancedSort = require("../../utils/advancedSort");
var _Auth = require("../../Auth");
var _Attachment = _interopRequireDefault(require("./Attachment"));

var _UploadSupportingFile = _interopRequireDefault(require("./UploadSupportingFile"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class AttachmentsList extends _react.Component {
  static arrangeFiles(files = []) {
    return (0, _advancedSort.advancedSort)(files, { property: 'originalname' });
  }

  render() {
    const label = /*#__PURE__*/
    _jsx("h2", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Supporting files"));



    const { parentId, parentSharedId, readOnly, storeKey, entity } = this.props;
    const forcedReadOnly = readOnly || Boolean(this.props.isTargetDoc);

    let uploadAttachmentButton = null;
    if (!this.props.isTargetDoc) {
      uploadAttachmentButton = /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [entity] }, void 0, /*#__PURE__*/
      _jsx("div", { className: "attachment-add" }, void 0, /*#__PURE__*/
      _jsx(_UploadSupportingFile.default, { entitySharedId: this.props.parentSharedId, storeKey: storeKey })));



    }

    const attachments = AttachmentsList.arrangeFiles(this.props.attachments);
    return /*#__PURE__*/(
      _jsx("div", { className: "attachments-list-parent" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "attachments-list-header" }, void 0,
      attachments.length === 0 ? /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [entity] }, void 0,
      label) : /*#__PURE__*/


      _react.default.createElement(_react.default.Fragment, null, label),

      uploadAttachmentButton), /*#__PURE__*/

      _jsx("div", { className: "attachments-list" }, void 0,
      attachments.map((file, index) => /*#__PURE__*/
      _jsx(_Attachment.default, {

        file: file,
        parentId: parentId,
        readOnly: forcedReadOnly,
        storeKey: storeKey,
        parentSharedId: parentSharedId,
        isSourceDocument: false,
        entity: entity }, index)))));





  }}exports.default = AttachmentsList;


AttachmentsList.defaultProps = {
  attachments: [],
  readOnly: false,
  isTargetDoc: false,
  parentId: null,
  parentSharedId: null,
  storeKey: '',
  entity: null };












AttachmentsList.contextTypes = {
  confirm: _propTypes.default.func };