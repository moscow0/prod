"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.OneUpEntityButtonsBase = exports.OneUpEntityButtons = void 0;var _I18N = require("../../I18N");
var _actions = require("../actions/actions");
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _UI = require("../../UI");

var _common = require("../common");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const defaultProps = {
  isPristine: true,
  isLast: false,
  thesaurusName: '',
  switchOneUpEntity: (_delta, _save) => {} };




class OneUpEntityButtonsBase extends _react.Component {


  renderNextButton(isPristine, btnClass) {
    return /*#__PURE__*/(
      _jsx("button", {
        type: "button",
        onClick: () => this.props.switchOneUpEntity(+1, true),
        className: `save-and-next ${!isPristine ? 'btn-success' : ''} ${btnClass}` }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "save-and-next" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Save and go to next'))));


  }

  render() {
    const { isPristine } = this.props;
    const btnClass = isPristine ? 'btn btn-default btn-disabled' : 'btn btn-default';
    return /*#__PURE__*/(
      _jsx("div", { className: "content-footer" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: () => this.props.switchOneUpEntity(0, false),
        className: `cancel-edit-metadata ${!isPristine ? 'btn-danger' : ''} ${btnClass}` }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "undo" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Discard changes'))), /*#__PURE__*/

      _jsx("button", {
        type: "button",
        onClick: () => this.props.switchOneUpEntity(0, true),
        className: `save-metadata ${btnClass}` }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "save" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Save document'))),

      this.renderNextButton(isPristine, btnClass)));


  }}exports.OneUpEntityButtonsBase = OneUpEntityButtonsBase;_defineProperty(OneUpEntityButtonsBase, "defaultProps", defaultProps);


const mapStateToProps = (state) => ({
  isPristine: (0, _common.selectIsPristine)(state) });


const OneUpEntityButtons = (0, _reactRedux.connect)(mapStateToProps, { switchOneUpEntity: _actions.switchOneUpEntity })(
OneUpEntityButtonsBase);exports.OneUpEntityButtons = OneUpEntityButtons;