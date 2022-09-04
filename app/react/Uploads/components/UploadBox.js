"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.UploadBox = void 0;exports.mapStateToProps = mapStateToProps;var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactDropzone = _interopRequireDefault(require("react-dropzone"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _I18N = require("../../I18N");

var _UI = require("../../UI");
var _libraryActions = require("../../Library/actions/libraryActions");
var _uploadsActions = require("../actions/uploadsActions");
var _Multireducer = require("../../Multireducer");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const extractTitle = (file) => {
  const title = file.name.
  replace(/\.[^/.]+$/, '').
  replace(/_/g, ' ').
  replace(/-/g, ' ').
  replace(/ {2}/g, ' ');

  return title.charAt(0).toUpperCase() + title.slice(1);
};

class UploadBox extends _react.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    files.forEach((file) => {
      const doc = { title: extractTitle(file) };
      this.props.createDocument(doc).then((newDoc) => {
        this.props.uploadDocument(newDoc.sharedId, file);
      });
    });
    this.props.unselectAllDocuments();
  }

  render() {
    return /*#__PURE__*/(
      _jsx(_reactDropzone.default, {
        className: "upload-box force-ltr",
        style: {},
        onDrop: this.onDrop,
        accept: "application/pdf" }, void 0, /*#__PURE__*/

      _jsx("div", { className: "upload-box_wrapper" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "upload" }), /*#__PURE__*/
      _jsx("button", { type: "button", className: "upload-box_link" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Browse your PDFs to upload")), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "or drop your files here.")), /*#__PURE__*/

      _jsx("div", { className: "protip" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "lightbulb" }), /*#__PURE__*/
      _jsx("b", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "ProTip!")), /*#__PURE__*/

      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "For better performance, upload your files in batches of 50 or less.")))));






  }}exports.UploadBox = UploadBox;








function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    uploadDocument: _uploadsActions.uploadDocument,
    unselectAllDocuments: _libraryActions.unselectAllDocuments,
    createDocument: _uploadsActions.createDocument },

  (0, _Multireducer.wrapDispatch)(dispatch, 'uploads'));

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UploadBox);exports.default = _default;