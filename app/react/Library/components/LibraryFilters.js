"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.LibraryFilters = void 0;exports.mapStateToProps = mapStateToProps;var _I18N = require("../../I18N");
var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _filterActions = require("../actions/filterActions");
var _FiltersForm = _interopRequireDefault(require("./FiltersForm"));
var _Multireducer = require("../../Multireducer");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _UI = require("../../UI");
var _uiActions = require("../../Entities/actions/uiActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class LibraryFilters extends _react.Component {
  reset() {
    this.props.resetFilters(this.props.storeKey);
  }

  render() {
    return /*#__PURE__*/(
      _jsx(_SidePanel.default, { className: "library-filters", mode: this.props.sidePanelMode, open: this.props.open }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-body" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-title" }, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, (0, _I18N.t)('System', 'Filters configuration')), /*#__PURE__*/
      _jsx("div", { className: "filter-buttons" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: `closeSidepanel ${
        this.props.sidePanelMode === 'unpinned-mode' ? '' : 'only-mobile'
        }`,
        onClick: this.props.hideFilters,
        "aria-label": "Close side panel" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" })))), /*#__PURE__*/



      _jsx(_FiltersForm.default, { storeKey: this.props.storeKey })), /*#__PURE__*/

      _jsx("div", { className: "sidepanel-footer" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", className: "btn btn-default", onClick: this.reset.bind(this) }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "times" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Clear Filters"))))));





  }}exports.LibraryFilters = LibraryFilters;


LibraryFilters.defaultProps = {
  open: false,
  storeKey: 'library',
  sidePanelMode: '',
  hideFilters: () => {} };










function mapStateToProps(state, props) {
  const noDocumentSelected = state[props.storeKey].ui.get('selectedDocuments').size === 0;
  const isFilterShown = state[props.storeKey].ui.get('filtersPanel') !== false;
  return {
    open: noDocumentSelected && isFilterShown };

}

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)({ resetFilters: _filterActions.resetFilters, hideFilters: _uiActions.hideFilters }, (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));
}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LibraryFilters);exports.default = _default;