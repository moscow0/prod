"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.selectTableViewColumns = exports.TableViewer = void 0;var _react = _interopRequireWildcard(require("react"));
var _reselect = require("reselect");

var _reactRedux = require("react-redux");

var _I18N = require("../I18N");
var _TableRows = require("./TableRows");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






class TableViewerComponent extends _react.Component {constructor(...args) {super(...args);_defineProperty(this, "handleScroll",
    (e) => {
      const element = e.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        this.props.loadNextGroupOfEntities();
      }
    });}

  render() {
    const columns = this.props.columns.filter((c) => !c.hidden);
    return /*#__PURE__*/(
      _jsx("div", { className: "tableview-wrapper", onScroll: this.handleScroll }, void 0, /*#__PURE__*/
      _jsx("table", {}, void 0, /*#__PURE__*/
      _jsx("thead", {}, void 0, /*#__PURE__*/
      _jsx("tr", {}, void 0,
      columns.map((column, index) => /*#__PURE__*/
      _jsx("th", { className: !index ? 'sticky-col' : '' }, column.name, /*#__PURE__*/
      _jsx("div", { className: "table-view-cell" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { context: column.translationContext }, void 0, column.label)))))), /*#__PURE__*/





      _jsx("tbody", {}, void 0, /*#__PURE__*/
      _jsx(_TableRows.TableRows, {
        columns: columns,
        clickOnDocument: this.props.clickOnDocument,
        storeKey: this.props.storeKey })))));





  }}


const getTableViewColumnsSelector = (state) => state.ui.get('tableViewColumns');
const selectTableViewColumns = (0, _reselect.createSelector)(getTableViewColumnsSelector, (columns) =>
columns === null || columns === void 0 ? void 0 : columns.toJS());exports.selectTableViewColumns = selectTableViewColumns;


const mapStateToProps = (state, props) => ({
  columns: selectTableViewColumns(state[props.storeKey]) });


const TableViewer = (0, _reactRedux.connect)(mapStateToProps)(TableViewerComponent);exports.TableViewer = TableViewer;