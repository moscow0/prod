"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TableRow = void 0;var _react = _interopRequireWildcard(require("react"));
var _immutable = _interopRequireDefault(require("immutable"));

var _reactRedux = require("react-redux");



var _formater = _interopRequireDefault(require("../../Metadata/helpers/formater"));
var _TableCell = require("./TableCell");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}














const defaultProps = {
  templates: _immutable.default.fromJS([]),
  thesauris: _immutable.default.fromJS([]),
  zoomLevel: 2 };


const getColumnValue = (
formattedEntity,
columnValues,
column) =>
{
  let columnValue;
  const columnName = column.name;
  if (!column.isCommonProperty || columnName === 'creationDate' || columnName === 'editDate') {
    columnValue = columnValues.get(columnName);
  } else {
    const commonPropValue =
    columnName === 'templateName' ? formattedEntity.documentType : formattedEntity[columnName];
    columnValue = column;
    columnValue.value = commonPropValue;
  }
  return columnValue;
};

class TableRowComponent extends _react.Component {constructor(...args) {super(...args);_defineProperty(this, "onRowClick",


    (e) => {
      if (this.props.clickOnDocument) {
        this.props.clickOnDocument(e, this.props.entity, this.props.selected);
      }
    });_defineProperty(this, "renderCell",

    (
    index,
    selected,
    columnValue) =>
    {
      if (!index) {
        return /*#__PURE__*/(
          _jsx("div", {}, void 0,
          !index && /*#__PURE__*/
          _jsx("input", {
            type: "checkbox",
            onChange: () => {},
            checked: selected,
            onClick: this.onRowClick }), /*#__PURE__*/


          _jsx(_TableCell.TableCell, { content: columnValue, zoomLevel: this.props.zoomLevel })));


      }

      return /*#__PURE__*/_jsx(_TableCell.TableCell, { content: columnValue, zoomLevel: this.props.zoomLevel });
    });}

  render() {
    const { entity, templates, thesauris, columns, selected } = this.props;
    const formattedEntity = _formater.default.prepareMetadata(entity.toJS(), templates, thesauris, null, {
      sortedProperties: ['editDate', 'creationDate'] });

    const columnValues = new Map();
    formattedEntity.metadata.forEach((prop) => {
      columnValues.set(prop.name, prop);
    });
    return /*#__PURE__*/(
      _jsx("tr", { className: `template-${formattedEntity.template} ${selected ? 'selected' : ''}` }, void 0,
      columns.map((column, index) => {
        const columnValue = getColumnValue(formattedEntity, columnValues, column);
        const columnKey = formattedEntity._id + column.name;
        return /*#__PURE__*/(
          _jsx("td", { className: !index ? 'sticky-col' : '' }, `column_${columnKey}`,
          this.renderCell(index, selected, columnValue)));


      })));


  }}_defineProperty(TableRowComponent, "defaultProps", defaultProps);


function mapStateToProps(state, ownProps) {
  const selected =
  state[ownProps.storeKey].ui.
  get('selectedDocuments').
  find(
  (doc) =>
  (doc === null || doc === void 0 ? void 0 : doc.get('_id')) === ownProps.entity.get('_id')) !==
  undefined;
  return {
    selected,
    templates: state.templates,
    thesauris: state.thesauris,
    zoomLevel: state[ownProps.storeKey].ui.get('zoomLevel') };

}

const TableRow = (0, _reactRedux.connect)(mapStateToProps)(TableRowComponent);exports.TableRow = TableRow;