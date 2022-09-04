"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TableRows = void 0;var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");
var _TableRow = require("../Library/components/TableRow");



var _immutable = _interopRequireDefault(require("immutable"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








const defaultProps = {
  documents: _immutable.default.fromJS({ rows: [] }) };


class TableRowsComponent extends _react.Component {


  render() {
    const { columns, clickOnDocument, storeKey } = this.props;

    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null,
      this.props.documents.get('rows').map((entity) => /*#__PURE__*/
      _react.default.createElement(_TableRow.TableRow, {

        entity,
        columns,
        clickOnDocument,
        storeKey,
        key: entity.get('_id') }))));





  }}_defineProperty(TableRowsComponent, "defaultProps", defaultProps);


const mapStateToProps = (state, props) => ({
  documents: state[props.storeKey].documents });


const TableRows = (0, _reactRedux.connect)(mapStateToProps)(TableRowsComponent);exports.TableRows = TableRows;