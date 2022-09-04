"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.File = exports.ConnectedFile = void 0;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _I18N = require("../../I18N");
var _languagesList = require("../../../shared/languagesList");
var _tsUtils = require("../../../shared/tsUtils");
var _UI = require("../../UI");

var _config = require("../../config.js");
var _reactReduxForm = require("react-redux-form");

var _actions = require("../actions/actions");
var _Multireducer = require("../../Multireducer");
var _tocGeneration = require("../../ToggledFeatures/tocGeneration");
var _Auth = require("../../Auth");

var _ViewDocumentLink = require("./ViewDocumentLink");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}












class File extends _react.Component {






  constructor(props) {
    super(props);
    this.state = {
      editing: false };

    this.edit = this.edit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.delete = this.delete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  edit() {
    this.setState({ editing: true });
  }

  cancel() {
    this.setState({ editing: false });
  }

  delete() {
    this.context.confirm({
      accept: () => {
        this.props.deleteFile(this.props.file, this.props.entity);
        this.setState({ editing: false });
      },
      title: 'Confirm delete file',
      message: 'Are you sure you want to delete this file?' });

  }

  handleSubmit(file) {
    this.props.updateFile(file, this.props.entity);
    this.setState({ editing: false });
  }

  renderDeleteButton() {
    return /*#__PURE__*/(
      _jsx("button", { type: "button", className: "btn btn-outline-danger", value: "Delete", onClick: this.delete }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "trash-alt" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Delete")));


  }

  renderFailed() {
    return /*#__PURE__*/(
      _jsx("div", { className: "file-failed" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "times" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Conversion failed"), /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [this.props.entity] }, void 0,
      this.renderDeleteButton())));



  }

  renderReady() {
    const { language, filename = '' } = this.props.file;
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("span", { className: "badge" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, language ? (0, _languagesList.language)(language) || '' : '')), /*#__PURE__*/

      _jsx(_tocGeneration.TocGeneratedLabel, { file: this.props.file }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "ML TOC"))), /*#__PURE__*/


      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("a", {
        href: `${_config.APIURL}files/${filename}`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "file-download btn btn-outline-secondary" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "cloud-download-alt" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Download")), /*#__PURE__*/

      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [this.props.entity] }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", className: "file-edit btn btn-outline-success", onClick: this.edit }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "pencil-alt" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Edit"))), /*#__PURE__*/


      _jsx(_ViewDocumentLink.ViewDocumentLink, { filename: filename, entity: this.props.entity }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "View")))));




  }

  renderView() {
    const { originalname, status } = !(0, _tsUtils.isBlobFile)(this.props.file) ?
    this.props.file :
    { originalname: this.props.file.originalFile.name, status: 'ready' };
    return /*#__PURE__*/(
      _jsx("div", { className: "file" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "file-originalname" }, void 0, originalname),
      status === 'ready' && this.renderReady(),
      status === 'failed' && this.renderFailed(),
      status === 'processing' && /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "clock" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Processing"))));




  }

  renderEditing() {
    const mapProps = {
      className: ({ fieldValue }) =>
      fieldValue.submitFailed && !fieldValue.valid ? 'form-control has-error' : 'form-control' };

    return /*#__PURE__*/(
      _jsx(_reactReduxForm.LocalForm, { onSubmit: this.handleSubmit, initialState: this.props.file, className: "file-form" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "form-group row" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "col-sm-12" }, void 0, /*#__PURE__*/
      _jsx("label", { htmlFor: "originalname" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Document Title"), "\xA0*"), /*#__PURE__*/

      _jsx(_reactReduxForm.Control.text, {
        validators: { required: (val) => Boolean(val && val.length) },
        className: "form-control",
        model: ".originalname",
        id: "originalname",
        mapProps: mapProps })), /*#__PURE__*/


      _jsx("div", { className: "col-sm-3" }, void 0, /*#__PURE__*/
      _jsx("label", { htmlFor: "language" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Language"))), /*#__PURE__*/


      _jsx("div", { className: "col-sm-9" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Control.select, { className: "form-control", model: ".language", id: "language" }, void 0,
      _languagesList.availableLanguages.map((language) => /*#__PURE__*/
      _jsx("option", { value: language.ISO639_3 }, language.ISO639_3,
      language.localized_label, " (", language.label, ")")), /*#__PURE__*/


      _jsx("option", { value: "other" }, void 0, (0, _I18N.t)('System', 'other', 'other', false)))), /*#__PURE__*/


      _jsx("div", { className: "col-sm-4" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "submit", className: "btn btn-outline-success" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "save" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Save"))), /*#__PURE__*/


      _jsx("div", { className: "col-sm-4" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "btn btn-outline-secondary",
        value: "Cancel",
        onClick: this.cancel }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Cancel"))), /*#__PURE__*/


      _jsx("div", { className: "col-sm-4" }, void 0, this.renderDeleteButton()))));



  }

  render() {
    return this.state.editing ? this.renderEditing() : this.renderView();
  }}exports.File = File;_defineProperty(File, "defaultProps", { updateFile: () => {}, deleteFile: () => {} });_defineProperty(File, "contextTypes", { confirm: _propTypes.default.func });


const mapDispatchToProps = (dispatch, props) =>
(0, _redux.bindActionCreators)({ updateFile: _actions.updateFile, deleteFile: _actions.deleteFile }, (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));



const ConnectedFile = (0, _reactRedux.connect)(null, mapDispatchToProps)(File);exports.ConnectedFile = ConnectedFile;