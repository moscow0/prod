"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.mapDispatchToProps = mapDispatchToProps;exports.mapStateToProps = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = _interopRequireDefault(require("immutable"));
var _Metadata = require("../../Metadata");
var _reactReduxForm = require("react-redux-form");
var _ReactReduxForms = require("../../ReactReduxForms");
var _I18N = require("../../I18N");
var _uploadsActions = require("../../Uploads/actions/uploadsActions");
var _redux = require("redux");
var _Forms = require("../../Forms");
var _UI = require("../../UI");
var _Loader = _interopRequireDefault(require("../../components/Elements/Loader"));
require("./scss/public-form.scss");
var _reactDropzone = _interopRequireDefault(require("react-dropzone"));
var _reactDeviceDetect = require("react-device-detect");
var _IDGenerator = require("../../../shared/IDGenerator");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class PublicForm extends _react.Component {
  static renderTitle(template) {
    const titleProperty = template.get('commonProperties').find((p) => p.get('name') === 'title');
    const useGeneratedId = Boolean(titleProperty.get('generatedId'));

    let input = /*#__PURE__*/_jsx(_reactReduxForm.Control.text, { id: "title", className: "form-control", model: ".title" });

    if (useGeneratedId) {
      input = /*#__PURE__*/_react.default.cloneElement(input, { defaultValue: (0, _IDGenerator.generateID)(3, 4, 4) });
    }

    return /*#__PURE__*/(
      _jsx(_Forms.FormGroup, { model: ".title" }, "title", /*#__PURE__*/
      _jsx("ul", { className: "search__filter" }, void 0, /*#__PURE__*/
      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx("label", { htmlFor: "title" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { context: template.get('_id') }, void 0, titleProperty.get('label')), /*#__PURE__*/
      _jsx("span", { className: "required" }, void 0, "*"))), /*#__PURE__*/


      _jsx("li", { className: "wide" }, void 0, input))));



  }

  static renderSubmitState() {
    return /*#__PURE__*/(
      _jsx("div", { className: "public-form submiting" }, void 0, /*#__PURE__*/
      _jsx("h3", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Submiting")), /*#__PURE__*/

      _jsx(_Loader.default, {})));


  }

  constructor(props) {
    super(props);
    this.removeAttachment = this.removeAttachment.bind(this);
    this.fileDropped = this.fileDropped.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validators = _objectSpread({
      captcha: { required: (val) => val && val.text.length } },
    _Metadata.validator.generate(props.template.toJS()));

    const generatedIdTitle = props.template.
    get('commonProperties').
    find((p) => p.get('name') === 'title' && p.get('generatedId') === true);
    this.state = { submiting: false, files: [], generatedIdTitle };
  }

  fileDropped(files) {
    const uploadedFiles = files;
    this.state.files.forEach((file) => uploadedFiles.push(file));
    this.setState({ files: uploadedFiles });
  }

  async removeAttachment(removedFile) {
    await this.setState((prevState) => ({
      files: prevState.files.filter((file) => file !== removedFile) }));

    if (!this.state.files.length) {
      const input = document.querySelector('input[name="publicform.file"]');
      input.value = '';
    }
  }

  attachDispatch(dispatch) {
    this.formDispatch = dispatch;
  }

  resetForm() {
    this.formDispatch(_reactReduxForm.actions.reset('publicform'));
    if (this.state.generatedIdTitle) {
      this.formDispatch(_reactReduxForm.actions.load('publicform', { title: (0, _IDGenerator.generateID)(3, 4, 4) }));
    }
  }

  async handleSubmit(_values) {
    const { submit, remote } = this.props;
    const values = await (0, _Metadata.prepareMetadataAndFiles)(
    _values,
    this.state.files,
    this.props.template.toJS());

    try {
      const submitResult = await submit(values, remote);
      this.setState({ submiting: true });
      await submitResult.promise;
      this.resetForm();
      this.setState({ submiting: false, files: [] });
    } catch (e) {
      this.setState({ submiting: false });
    }
    this.refreshCaptcha();
  }

  renderFileField(id, options) {
    const defaults = { className: 'form-control on-mobile', model: `.${id}` };
    const props = Object.assign(defaults, options);
    return /*#__PURE__*/(
      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "search__filter" }, void 0, /*#__PURE__*/
      _jsx("li", { className: "attachments-list" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, id === 'file' ? 'Document' : 'Attachments'), /*#__PURE__*/
      _jsx(_reactDeviceDetect.BrowserView, {}, void 0, /*#__PURE__*/
      _jsx(_reactDropzone.default, {
        onDrop: this.fileDropped,
        className: "dropzone",
        accept: id === 'file' ? '.pdf' : undefined }, void 0, /*#__PURE__*/

      _jsx("label", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: "text-content" }, void 0, /*#__PURE__*/
      _jsx("div", { id: "icon" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "cloud-upload-alt" })), /*#__PURE__*/

      _jsx("div", { id: "upload-text" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Drop your files here to upload or")), /*#__PURE__*/

      _jsx("div", { id: "upload-button" }, void 0, /*#__PURE__*/
      _jsx("div", { id: "button" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Select files on your device"))))))), /*#__PURE__*/






      _jsx(_reactDeviceDetect.MobileView, {}, void 0, /*#__PURE__*/
      _react.default.createElement(_reactReduxForm.Control.file, _extends({
        id: id },
      props, {
        onChange: (e) => this.fileDropped([...e.target.files]) }))), /*#__PURE__*/


      _jsx("div", { className: "preview-list" }, void 0, /*#__PURE__*/
      _jsx("ul", {}, void 0,
      this.state.files.map((file) => /*#__PURE__*/
      _jsx("li", {}, file.preview, /*#__PURE__*/
      _jsx("div", { className: "preview-title" }, void 0, file.name), /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("span", { onClick: () => this.removeAttachment(file) }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "times" }), "\xA0", /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Remove")))))))))));










  }

  renderCaptcha() {
    return /*#__PURE__*/(
      _jsx(_Forms.FormGroup, { model: ".captcha" }, "captcha", /*#__PURE__*/
      _jsx("ul", { className: "search__filter" }, void 0, /*#__PURE__*/
      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx("label", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Captcha"), /*#__PURE__*/
      _jsx("span", { className: "required" }, void 0, "*"))), /*#__PURE__*/


      _jsx("li", { className: "wide" }, void 0, /*#__PURE__*/
      _jsx(_ReactReduxForms.Captcha, {
        remote: this.props.remote,
        refresh: (refresh) => {
          this.refreshCaptcha = refresh;
        },
        model: ".captcha" })))));





  }

  render() {
    const { template, thesauris, file, attachments } = this.props;
    const { submiting } = this.state;
    return /*#__PURE__*/(
      _jsx(_reactReduxForm.LocalForm, {
        validators: this.validators,
        model: "publicform",
        getDispatch: (dispatch) => this.attachDispatch(dispatch),
        onSubmit: this.handleSubmit }, void 0,

      submiting && PublicForm.renderSubmitState(),
      !submiting && /*#__PURE__*/
      _jsx("div", { className: "public-form" }, void 0,
      PublicForm.renderTitle(template), /*#__PURE__*/
      _jsx(_Metadata.MetadataFormFields, {
        thesauris: thesauris,
        model: "publicform",
        template: template,
        boundChange: (formModel, value) =>
        this.formDispatch(_reactReduxForm.actions.change(formModel, value)) }),


      file ? this.renderFileField('file', { accept: '.pdf' }) : false,
      attachments ? this.renderFileField('attachments', { multiple: 'multiple' }) : false,
      this.renderCaptcha(), /*#__PURE__*/
      _jsx("button", { type: "submit", className: "btn btn-success" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Submit")))));





  }}









const mapStateToProps = (state, props) => ({
  template: state.templates.find((template) => template.get('_id') === props.template),
  thesauris: state.thesauris,
  file: props.file !== undefined,
  remote: props.remote !== undefined,
  attachments: props.attachments !== undefined });exports.mapStateToProps = mapStateToProps;

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ submit: _uploadsActions.publicSubmit }, dispatch);
}var _default =
(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PublicForm);exports.default = _default;