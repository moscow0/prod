"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MetadataFormFiles = void 0;var _react = _interopRequireDefault(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");

var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _getFileExtension = require("../../utils/getFileExtension");
var _uniqueID = _interopRequireDefault(require("../../../shared/uniqueID"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const getFileIcon = (file) => {
  const acceptedThumbnailExtensions = ['png', 'gif', 'jpg', 'jpeg'];
  let thumbnail = /*#__PURE__*/
  _jsx("span", { "no-translate": true }, void 0, /*#__PURE__*/
  _jsx(_UI.Icon, { icon: "file" }), " file");



  if (file.filename && (0, _getFileExtension.getFileExtension)(file.filename) === 'pdf') {
    thumbnail = /*#__PURE__*/
    _jsx("span", { "no-translate": true }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "file-pdf" }), " pdf");


  }

  if (file.url) {
    thumbnail = /*#__PURE__*/
    _jsx("span", {}, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "link" }));


  }

  if (
  !file.serializedFile &&
  file.filename &&
  acceptedThumbnailExtensions.indexOf((0, _getFileExtension.getFileExtension)(file.filename.toLowerCase())) !== -1)
  {
    thumbnail = /*#__PURE__*/_jsx("img", { src: `/api/files/${file.filename}`, alt: file.originalname });
  }
  return thumbnail;
};

const fieldModel = (file, type, index) => {
  if (type === 'attachment') return `.attachments.${index}.originalname`;
  if (file._id) return `.documents.${index}.originalname`;
  return `.documents.${index}.originalFile.name`;
};







const mapDispatchToProps = (dispatch, ownProps) => {
  const { model, type } = ownProps;
  const path = type === 'attachment' ? `${model}.attachments` : `${model}.documents`;
  return (0, _redux.bindActionCreators)(
  {
    removeFile: (index) => _reactReduxForm.actions.remove(path, index) },

  dispatch);

};

const connector = (0, _reactRedux.connect)(null, mapDispatchToProps);




const MetadataFormFiles = ({ files = [], removeFile, type }) => /*#__PURE__*/
_jsx("div", { className: "attachments-list editor" }, void 0,
files.map((file, index) => {
  const attachmentClass = file._id ? 'attachment' : 'attachment new';
  return /*#__PURE__*/(
    _jsx("div", { className: attachmentClass }, file._id || (0, _uniqueID.default)(), /*#__PURE__*/
    _jsx("div", { className: "attachment-thumbnail" }, void 0, getFileIcon(file)), /*#__PURE__*/
    _jsx("div", { className: "attachment-name" }, void 0, /*#__PURE__*/
    _jsx(_reactReduxForm.Field, { model: fieldModel(file, type, index), updateOn: "blur" }, void 0, /*#__PURE__*/
    _jsx("input", { className: "form-control" }))), /*#__PURE__*/


    _jsx("button", {
      type: "button",
      className: "btn delete-supporting-file",
      onClick: () => removeFile(index) }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "trash-alt" }), "\xA0 ", /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Delete file"))));



}));



const container = connector(MetadataFormFiles);exports.MetadataFormFiles = container;