"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.ImportPanel = void 0;var _reactRedux = require("react-redux");
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");

var _I18N = require("../../I18N");
var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _UI = require("../../UI");
var _reactReduxForm = require("react-redux-form");
var _uploadsActions = require("../actions/uploadsActions");
var _ImportProgress = _interopRequireDefault(require("./ImportProgress"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ImportPanel extends _react.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  handleSubmit(values) {
    this.props.importData(values.file, values.template);
  }

  close() {
    this.props.closeImportPanel();
  }

  renderForm() {
    const { templates } = this.props;
    const template = templates.find((templ) => templ.get('default')).get('_id');
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: "alert alert-info" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "info-circle", size: "2x" }), /*#__PURE__*/
      _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Upload a ZIP or CSV file."), "\xA0", /*#__PURE__*/
      _jsx("a", {
        rel: "noopener noreferrer",
        href: "https://github.com/huridocs/uwazi/wiki/Import-CSV",
        target: "_blank" }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Import instructions")))), /*#__PURE__*/



      _jsx(_reactReduxForm.LocalForm, { onSubmit: this.handleSubmit, id: "import", initialState: { template } }, void 0, /*#__PURE__*/
      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "search__filter" }, void 0, /*#__PURE__*/
      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx("label", { htmlFor: "file" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "File"))), /*#__PURE__*/


      _jsx("li", { className: "wide" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Control.file, { id: "file", model: ".file", accept: ".zip,.csv" })))), /*#__PURE__*/



      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "search__filter" }, void 0, /*#__PURE__*/
      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx("label", { htmlFor: "template" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Template"))), /*#__PURE__*/


      _jsx("li", { className: "wide" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Control.select, { id: "template", model: ".template" }, void 0,
      templates.map((t) => /*#__PURE__*/
      _jsx("option", { value: t.get('_id') }, t.get('_id'),
      t.get('name'))))))), /*#__PURE__*/






      _jsx("div", { className: "form-group" })), /*#__PURE__*/

      _jsx("div", { className: "sidepanel-footer" }, void 0, /*#__PURE__*/
      _jsx("button", { form: "import", type: "submit", className: "btn btn-primary", id: "import-csv" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "upload" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Import"))))));





  }

  renderUploadProgress() {
    const { uploadProgress } = this.props;
    return /*#__PURE__*/(
      _jsx("div", { className: "alert alert-info" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "info-circle", size: "2x" }), /*#__PURE__*/
      _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Uploading file"), " ", uploadProgress, "%")));



  }

  renderContents() {
    const { uploadProgress, importStart, importProgress } = this.props;
    if (uploadProgress) {
      return this.renderUploadProgress();
    }

    if (importStart || importProgress) {
      return /*#__PURE__*/_jsx(_ImportProgress.default, {});
    }
    return this.renderForm();
  }

  render() {
    const { open } = this.props;
    return /*#__PURE__*/(
      _jsx(_SidePanel.default, { open: open, className: "metadata-sidepanel" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", className: "closeSidepanel close-modal", onClick: this.close }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "times" }))),


      this.renderContents()));


  }}exports.ImportPanel = ImportPanel;


ImportPanel.defaultProps = {
  open: false,
  uploadProgress: 0,
  importStart: false,
  importProgress: 0 };












const mapStateToProps = (state) => ({
  open: state.importEntities.showImportPanel,
  templates: state.templates,
  uploadProgress: state.importEntities.importUploadProgress,
  importStart: state.importEntities.importStart,
  importProgress: state.importEntities.importProgress });exports.mapStateToProps = mapStateToProps;


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ closeImportPanel: _uploadsActions.closeImportPanel, importData: _uploadsActions.importData }, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImportPanel);exports.default = _default;