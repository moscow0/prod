"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MediaModalUploadFileButton = void 0;var _UI = require("../../UI");
var _react = _interopRequireDefault(require("react"));
var _reactReduxForm = require("react-redux-form");
var _I18N = require("../../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}










const MediaModalUploadFileButton = ({
  formModel,
  acceptedFileTypes,
  inputFileRef,
  handleFileInPublicForm,
  handleUploadButtonClicked,
  handleInputFileChange }) =>
{
  const inputComponent = (fileFieldAction) => /*#__PURE__*/
  _jsx("div", { className: "upload-button" }, void 0, /*#__PURE__*/
  _jsx("button", { type: "button", onClick: handleUploadButtonClicked, className: "btn" }, void 0, /*#__PURE__*/
  _jsx(_UI.Icon, { icon: "cloud-upload-alt" }), "\xA0 ", /*#__PURE__*/
  _jsx(_I18N.Translate, {}, void 0, "Select from computer")), /*#__PURE__*/

  _react.default.createElement("input", {
    "aria-label": "fileInput",
    type: "file",
    onChange: fileFieldAction,
    style: { display: 'none' },
    ref: inputFileRef,
    accept: acceptedFileTypes }));




  if (formModel === 'publicform') {
    return /*#__PURE__*/(
      _jsx(_reactReduxForm.Field, {
        "aria-label": "fileInput",
        model: ".file",
        component: () => inputComponent(handleFileInPublicForm),
        type: "file" }));


  }

  return inputComponent(handleInputFileChange);
};exports.MediaModalUploadFileButton = MediaModalUploadFileButton;