"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.UploadButton = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _immutable = _interopRequireDefault(require("immutable"));
var _lodash = require("lodash");
var _UI = require("../../UI");
var _uploadsActions = require("../../Uploads/actions/uploadsActions");
var _Multireducer = require("../../Multireducer");
var _socket = require("../../socket");
var _I18N = require("../../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const renderProgress = (progress) => /*#__PURE__*/
_jsx("div", { className: "upload-button btn btn-default btn-disabled" }, void 0, /*#__PURE__*/
_jsx("span", {}, void 0, progress, "%"), "\xA0", /*#__PURE__*/

_jsx(_I18N.Translate, {}, void 0, "Uploading"));



const renderProcessing = () => /*#__PURE__*/
_jsx("div", { className: "upload-button btn btn-default" }, void 0, /*#__PURE__*/
_jsx(_UI.Icon, { icon: "cog", spin: true }), "\xA0", /*#__PURE__*/

_jsx(_I18N.Translate, {}, void 0, "Processing"));



class UploadButton extends _react.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { processing: false, failed: false, completed: false };
    this.conversionStart = this.conversionStart.bind(this);
    this.conversionFailed = this.conversionFailed.bind(this);
    this.documentProcessed = this.documentProcessed.bind(this);

    _socket.socket.on('conversionStart', this.conversionStart);
    _socket.socket.on('conversionFailed', this.conversionFailed);
    _socket.socket.on('documentProcessed', this.documentProcessed);

    this.onChange = this.onChange.bind(this);
  }

  componentWillUnmount() {
    _socket.socket.removeListener('conversionStart', this.conversionStart);
    _socket.socket.removeListener('conversionFailed', this.conversionFailed);
    _socket.socket.removeListener('documentProcessed', this.documentProcessed);
    clearTimeout(this.timeout);
  }

  onChange(e) {
    const file = e.target.files[0];
    this.props.uploadDocument(this.props.entitySharedId, file);
  }

  documentProcessed(docId) {
    if (docId === this.props.entitySharedId) {
      this.setState({ processing: false, failed: false, completed: true }, () => {
        this.timeout = setTimeout(() => {
          this.setState({ processing: false, failed: false, completed: false });
        }, 2000);
      });
    }
  }

  conversionStart(docId) {
    if (docId === this.props.entitySharedId) {
      this.setState({ processing: true, failed: false, completed: false });
    }
  }

  conversionFailed(docId) {
    if (docId === this.props.entitySharedId) {
      this.setState({ processing: false, failed: true, completed: false });
    }
  }

  renderButton(status = '', icon = 'plus', message = 'Add PDF') {
    return /*#__PURE__*/(
      _jsx("label", { htmlFor: "upload-button-input", className: `upload-button btn upload-${status}` }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: icon }), "\xA0", /*#__PURE__*/

      _jsx("input", {
        onChange: this.onChange,
        type: "file",
        accept: "application/pdf",
        id: "upload-button-input" }), "\xA0", /*#__PURE__*/


      _jsx(_I18N.Translate, {}, void 0, message)));


  }

  render() {
    const progress = this.props.progress.get(this.props.entitySharedId);

    switch (true) {
      case this.state.failed:
        return this.renderButton('failed', 'exclamation-triangle', 'An error occured');
      case this.state.processing || progress === 0:
        return renderProcessing();
      case progress > 0 && progress < 100:
        return renderProgress(progress);
      case this.state.completed || progress === 100:
        return this.renderButton('success', 'check', 'Success, Upload another?');

      default:
        return this.renderButton();}

  }}exports.UploadButton = UploadButton;


UploadButton.defaultProps = {
  progress: _immutable.default.fromJS({}),
  storeKey: '',
  entitySharedId: '',
  uploadDocument: () => {} };









UploadButton.contextTypes = {
  confirm: _propTypes.default.func };


const mapStateToProps = ({ metadata, progress }) => ({
  progress: (0, _lodash.isEmpty)(progress) ? metadata.progress : progress });


function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)({ uploadDocument: _uploadsActions.uploadDocument }, (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));
}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UploadButton);exports.default = _default;