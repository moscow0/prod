"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.selectquickLabelThesaurus = exports.mapStateToProps = exports.QuickLabelHeaderBase = exports.QuickLabelHeader = void 0;var _I18N = require("../../I18N");
var _I18NLink = _interopRequireDefault(require("../../I18N/components/I18NLink"));

var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reselect = require("reselect");


var _UI = require("../../UI");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const defaultProps = {
  quickLabelThesaurus: undefined };




class QuickLabelHeaderBase extends _react.Component {


  render() {
    const { quickLabelThesaurus } = this.props;
    const thesaurusName = quickLabelThesaurus ? quickLabelThesaurus.get('name') : '';
    return /*#__PURE__*/(
      _jsx("div", { className: "content-header" }, void 0,
      !thesaurusName && /*#__PURE__*/
      _jsx("div", { className: "content-header-title" }, void 0, /*#__PURE__*/
      _jsx("h1", {}, void 0,
      (0, _I18N.t)('System', 'Ooops... please go'), "\xA0", /*#__PURE__*/

      _jsx(_I18NLink.default, { className: "btn btn-default", to: "/settings/dictionaries" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "arrow-left" }), "\xA0", /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Back to thesauri'))))),




      thesaurusName && /*#__PURE__*/
      _jsx("div", { className: "content-header-title" }, void 0, /*#__PURE__*/
      _jsx(_I18NLink.default, {
        className: "btn btn-default",
        to: `/settings/dictionaries/cockpit/${quickLabelThesaurus === null || quickLabelThesaurus === void 0 ? void 0 : quickLabelThesaurus.get('_id')}` }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "arrow-left" }), "\xA0", /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Back to thesaurus'))), /*#__PURE__*/

      _jsx("h1", {}, void 0, /*#__PURE__*/
      _jsx("span", { className: "large" }, void 0,
      (0, _I18N.t)('System', 'Quick labeling for'), "\xA0", /*#__PURE__*/_jsx("b", {}, void 0, thesaurusName))))));






  }}exports.QuickLabelHeaderBase = QuickLabelHeaderBase;_defineProperty(QuickLabelHeaderBase, "defaultProps", defaultProps);


const selectquickLabelThesaurus = (0, _reselect.createSelector)(
(state) =>
state.thesauris.find(
(thes) => thes.get('_id') === state.library.sidepanel.quickLabelState.get('thesaurus')),

(thes) => thes);exports.selectquickLabelThesaurus = selectquickLabelThesaurus;


const mapStateToProps = (state) => ({
  quickLabelThesaurus: selectquickLabelThesaurus(state) });exports.mapStateToProps = mapStateToProps;


const QuickLabelHeader = (0, _reactRedux.connect)(mapStateToProps)(QuickLabelHeaderBase);exports.QuickLabelHeader = QuickLabelHeader;