"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.CustomUploads = void 0;var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactDropzone = _interopRequireDefault(require("react-dropzone"));
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));

var _Layout = require("../../Layout");
var _BasicReducer = require("../../BasicReducer");
var _I18N = require("../../I18N");
var _RouteHandler = _interopRequireDefault(require("../../App/RouteHandler"));
var _api = _interopRequireDefault(require("../../utils/api"));
var _UI = require("../../UI");

var _uploadsActions = require("../../Uploads/actions/uploadsActions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class CustomUploads extends _RouteHandler.default {
  static async requestState(requestParams) {
    const customUploads = await _api.default.get('files', requestParams.add({ type: 'custom' }));
    return [_BasicReducer.actions.set('customUploads', customUploads.json)];
  }

  constructor(props, context) {
    super(props, context);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    files.forEach((file) => {
      this.props.upload(file);
    });
  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content without-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Custom Uploads")), /*#__PURE__*/

      _jsx("div", { className: "panel-body custom-uploads" }, void 0, /*#__PURE__*/
      _jsx(_reactDropzone.default, { className: "upload-box", onDrop: this.onDrop }, void 0, /*#__PURE__*/
      _jsx("div", { className: "upload-box_wrapper" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "upload" }), /*#__PURE__*/
      _jsx("button", { className: "upload-box_link", type: "button" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Browse files to upload")), /*#__PURE__*/

      _jsx("span", {}, void 0, "\xA0", /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "or drop your files here."))),


      this.props.progress && /*#__PURE__*/
      _jsx("div", { className: "uploading" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "spinner", spin: true }), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Uploading ..."))), /*#__PURE__*/



      _jsx("ul", {}, void 0,
      this.props.customUploads.map((upload) => /*#__PURE__*/
      _jsx("li", {}, upload.get('filename'), /*#__PURE__*/
      _jsx(_Layout.Thumbnail, { file: `/assets/${upload.get('filename')}` }), /*#__PURE__*/
      _jsx("div", { className: "info" }, void 0, /*#__PURE__*/
      _jsx("span", { "no-translate": true }, void 0, "URL:"), /*#__PURE__*/
      _jsx("span", { className: "thumbnail-url" }, void 0, `/assets/${upload.get('filename')}`), /*#__PURE__*/
      _jsx(_Layout.ConfirmButton, { action: () => this.props.deleteCustomUpload(upload.get('_id')) }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Delete"))))))))));









  }}exports.CustomUploads = CustomUploads;


CustomUploads.defaultProps = {
  progress: false };


CustomUploads.propTypes = {
  progress: _propTypes.default.bool,
  customUploads: _propTypes.default.instanceOf(_immutable.default.List).isRequired,
  upload: _propTypes.default.func.isRequired,
  deleteCustomUpload: _propTypes.default.func.isRequired };


const mapStateToProps = ({ customUploads, progress }) => ({
  customUploads,
  progress: !!progress.filter((_v, key) => key.match(/customUpload/)).size });exports.mapStateToProps = mapStateToProps;


const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)({ upload: _uploadsActions.uploadCustom, deleteCustomUpload: _uploadsActions.deleteCustomUpload }, dispatch);var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CustomUploads);exports.default = _default;