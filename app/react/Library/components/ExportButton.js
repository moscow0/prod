"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _Multireducer = require("../../Multireducer");
var _exportActions = require("../actions/exportActions");

var _Modal = _interopRequireDefault(require("../../Layout/Modal"));
var _reactReduxForm = require("react-redux-form");

var _ReactReduxForms = require("../../ReactReduxForms");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}











class ExportButton extends _react.Component {


  constructor(props) {
    super(props);
    this.state = {
      modal: false };

    this.export = this.export.bind(this);
    this.showModal = this.showModal.bind(this);
    this.exportWithCaptcha = this.exportWithCaptcha.bind(this);
  }

  export() {
    if (!this.props.processing) {
      this.props.exportDocuments(this.props.storeKey);
    }
  }

  exportWithCaptcha(values) {
    if (!this.props.processing) {
      this.props.exportDocuments(this.props.storeKey, values.captcha);
    }
    this.setState({ modal: false });
  }

  showModal() {
    this.setState({ modal: true });
  }

  render() {
    let btnClassName = 'btn btn-default btn-export';
    btnClassName += this.props.processing ? ' btn-disabled' : '';
    btnClassName += ` ${this.props.className}`;
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: this.props.user.get('_id') ? this.export : this.showModal,
        className: btnClassName }, void 0,

      !this.props.processing ? /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "export-csv", transform: "up-0.1" }) : /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "spinner", spin: true }), /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Export CSV'))),

      this.state.modal && /*#__PURE__*/
      _jsx(_Modal.default, { isOpen: true, type: "export" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.LocalForm, {
        onSubmit: this.exportWithCaptcha,
        validators: { captcha: { required: (val) => val && val.text.length } } }, void 0, /*#__PURE__*/

      _jsx(_ReactReduxForms.FormGroup, { model: ".captcha" }, "captcha", /*#__PURE__*/
      _jsx("h3", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Exporting entities to CSV")), /*#__PURE__*/

      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Please type in letters and numbers from the image to start the export.")), /*#__PURE__*/



      _jsx(_ReactReduxForms.Captcha, { remote: false, model: ".captcha" })), /*#__PURE__*/

      _jsx("div", { className: "buttons" }, void 0, /*#__PURE__*/
      _jsx("input", {
        type: "button",
        className: "btn",
        onClick: () => {
          this.setState({ modal: false });
        },
        value: "Cancel" }), /*#__PURE__*/

      _jsx("input", { type: "submit", className: "btn btn-success", value: "Export" }))))));






  }}_defineProperty(ExportButton, "defaultProps", void 0);


ExportButton.defaultProps = {
  className: '' };


function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)({ exportDocuments: _exportActions.exportDocuments }, (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));
}

function mapStateToProps(state) {
  return {
    processing: state.exportSearchResults.exportSearchResultsProcessing,
    user: state.user };

}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ExportButton);exports.default = _default;