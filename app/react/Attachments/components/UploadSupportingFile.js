"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapDispatchToProps = exports.default = void 0;exports.mapStateToProps = mapStateToProps;var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _supportingFilesActions = require("../../Metadata/actions/supportingFilesActions");
var _actions = require("../actions/actions");
var _AttachmentsModal = require("./AttachmentsModal");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}











function mapStateToProps({ attachments }) {
  return {
    progress: attachments.progress };

}

const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)({ attachmentCompleted: _supportingFilesActions.attachmentCompleted }, dispatch);exports.mapDispatchToProps = mapDispatchToProps;

const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);

const UploadSupportingFile = (props) => {
  const { entitySharedId, storeKey, progress, model = '' } = props;
  const [modalOpen, setModalOpen] = (0, _react.useState)(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    props.attachmentCompleted(entitySharedId);
  };

  const getPercentage = progress.get(entitySharedId);

  (0, _react.useEffect)(() => {
    if (getPercentage === 100) {
      closeModal();
    }
  }, [progress]);

  return /*#__PURE__*/(
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx("button", { type: "button", onClick: openModal, className: "btn attachments-modal-trigger" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "plus" }), "\xA0", /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Add file")), /*#__PURE__*/


    _jsx(_AttachmentsModal.AttachmentsModal, {
      isOpen: modalOpen,
      onClose: closeModal,
      entitySharedId: entitySharedId,
      storeKey: storeKey,
      getPercentage: getPercentage,
      model: model,
      uploadAttachment: props.uploadAttachment || _actions.uploadAttachment,
      uploadAttachmentFromUrl: props.uploadAttachmentFromUrl || _actions.uploadAttachmentFromUrl })));



};var _default =


connector(UploadSupportingFile);exports.default = _default;