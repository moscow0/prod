"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.UploadAttachment = void 0;exports.mapDispatchToProps = mapDispatchToProps;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _t = _interopRequireDefault(require("../../I18N/t"));
var _UI = require("../../UI");

var _actions = require("../actions/actions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class UploadAttachment extends _react.Component {
  onChangeSingle(e) {
    const file = e.target.files[0];
    this.props.uploadAttachment(this.props.entity, file, { __reducerKey: this.props.storeKey });
  }

  onChangeAll(e) {
    const file = e.target.files[0];
    this.props.uploadAttachment(
    this.props.entity,
    file,
    { __reducerKey: this.props.storeKey },
    {
      allLanguages: true });


  }

  renderUploadButton() {
    let uploadToAll = null;

    if (this.props.languages.size > 1) {
      uploadToAll = /*#__PURE__*/
      _jsx("label", { htmlFor: "upload-attachment-all-input", className: "btn btn-success btn-xs add" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "link" }), " ", (0, _t.default)('System', 'Add to all languages')), /*#__PURE__*/

      _jsx("input", {
        onChange: this.onChangeAll.bind(this),
        type: "file",
        id: "upload-attachment-all-input" }));



    }

    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("label", { htmlFor: "upload-attachment-input", className: "btn btn-success btn-xs add" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "paperclip" }), " ", (0, _t.default)('System', 'Add file')), /*#__PURE__*/

      _jsx("input", {
        onChange: this.onChangeSingle.bind(this),
        type: "file",
        id: "upload-attachment-input" })),


      uploadToAll));


  }

  renderProgress(progress) {
    return /*#__PURE__*/(
      _jsx("div", { className: "btn btn-default btn-disabled" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _t.default)('System', 'Uploading')), /*#__PURE__*/
      _jsx("span", {}, void 0, "\xA0\xA0", progress, "%")));


  }

  render() {
    const progress = this.props.progress.get(this.props.entity);
    return progress ? this.renderProgress(progress) : this.renderUploadButton();
  }}exports.UploadAttachment = UploadAttachment;










function mapStateToProps({ attachments, settings }) {
  return {
    progress: attachments.progress,
    languages: settings.collection.get('languages') };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ uploadAttachment: _actions.uploadAttachment }, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UploadAttachment);exports.default = _default;