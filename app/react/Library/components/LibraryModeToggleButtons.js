"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.encodedSearch = exports.default = exports.LibraryModeToggleButtons = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _libraryActions = require("../actions/libraryActions");
var _uiActions = require("../../Entities/actions/uiActions");
var _redux = require("redux");
var _Multireducer = require("../../Multireducer");
var _reselect = require("reselect");
var _HiddenColumnsDropdown = require("./HiddenColumnsDropdown");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class LibraryModeToggleButtons extends _react.Component {
  render() {
    const {
      zoomLevel,
      zoomOut,
      zoomIn,
      showGeolocation,
      searchUrl,
      storeKey,
      tableViewMode,
      mapViewMode } =
    this.props;
    return /*#__PURE__*/(
      _jsx("div", { className: "list-view-mode" }, void 0,
      tableViewMode && /*#__PURE__*/
      _jsx(_HiddenColumnsDropdown.HiddenColumnsDropdown, { className: "table-view-column-selector", storeKey: storeKey }),

      !mapViewMode && /*#__PURE__*/
      _jsx("div", {
        className: `list-view-mode-zoom list-view-buttons-zoom-${zoomLevel} buttons-group ${
        tableViewMode ? 'unpinned-mode' : ''
        }` }, void 0, /*#__PURE__*/

      _jsx("button", {
        className: "btn btn-default zoom-out",
        onClick: zoomOut,
        type: "button",
        "aria-label": (0, _I18N.t)('System', 'Zoom out library view', null, false) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "search-minus" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Zoom out'))), /*#__PURE__*/

      _jsx("button", {
        className: "btn btn-default zoom-in",
        onClick: zoomIn,
        type: "button",
        "aria-label": (0, _I18N.t)('System', 'Zoom in library view', null, false) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "search-plus" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Zoom in')))), /*#__PURE__*/




      _jsx("div", { className: "list-view-mode-map buttons-group" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, {
        to: `library${searchUrl}`,
        className: "btn btn-default",
        activeClassName: "is-active",
        "aria-label": (0, _I18N.t)('System', 'library list view', null, false) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "th" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Cards view'))), /*#__PURE__*/

      _jsx(_I18N.I18NLink, {
        to: `library/table${searchUrl}`,
        className: "btn btn-default",
        activeClassName: "is-active",
        "aria-label": (0, _I18N.t)('System', 'library table view', null, false) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "align-justify" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Table view'))),

      showGeolocation && /*#__PURE__*/
      _jsx(_I18N.I18NLink, {
        to: `library/map${searchUrl}`,
        className: "btn btn-default",
        activeClassName: "is-active",
        "aria-label": (0, _I18N.t)('System', 'library map view', null, false) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "map-marker" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Map view')))), /*#__PURE__*/



      _jsx("div", {
        className: `buttons-group toggle-button ${!tableViewMode ? 'only-mobile' : 'unpinned'}` }, void 0, /*#__PURE__*/

      _jsx("button", { type: "button", className: "btn btn-default", onClick: this.props.showFilters }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "funnel-filter" }), /*#__PURE__*/
      _jsx("span", { className: "filters-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Show filters")), /*#__PURE__*/

      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Show filters'))))));




  }}exports.LibraryModeToggleButtons = LibraryModeToggleButtons;














LibraryModeToggleButtons.defaultProps = {
  tableViewMode: false,
  mapViewMode: false,
  zoomIn: null,
  zoomOut: null,
  showFilters: () => {} };


const encodedSearch = (0, _reselect.createSelector)(
(state) => state.search,
(state) => state.filters,
(search, filters) => {
  const params = (0, _libraryActions.processFilters)(search, filters.toJS());
  return (0, _libraryActions.encodeSearch)(params);
});exports.encodedSearch = encodedSearch;


function mapStateToProps(state, props) {
  const { templates } = state;
  const showGeolocation = Boolean(
  templates.find((_t) => _t.get('properties').find((p) => p.get('type') === 'geolocation')));


  return {
    searchUrl: encodedSearch(state[props.storeKey]),
    showGeolocation,
    zoomLevel:
    Object.keys(props).indexOf('zoomLevel') !== -1 ?
    props.zoomLevel :
    state[props.storeKey].ui.get('zoomLevel') };

}

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)(
  {
    showFilters: _uiActions.showFilters },

  (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LibraryModeToggleButtons);exports.default = _default;