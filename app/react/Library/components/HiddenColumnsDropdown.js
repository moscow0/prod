"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.HideColumnsComponent = exports.HiddenColumnsDropdown = void 0;var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");

var _Forms = require("../../Forms");

var _Multireducer = require("../../Multireducer");
var _HiddenColumnsDropdownItem = require("./HiddenColumnsDropdownItem");




var _libraryActions = require("../actions/libraryActions");




var _useOnClickOutsideElementHook = require("../../utils/useOnClickOutsideElementHook");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






const mapStateToProps = (state) => ({
  columns: state.library.ui.get('tableViewColumns') });

const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)(
{ setTableViewColumnHidden: _libraryActions.setTableViewColumnHidden, setTableViewAllColumnsHidden: _libraryActions.setTableViewAllColumnsHidden },
(0, _Multireducer.wrapDispatch)(dispatch, 'library'));

const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);

const processColumns = (
columnsMap) =>




{
  const columns = columnsMap.toJS().slice(1);
  const hiddenColumns = columns.filter((c) => c.hidden);
  const shownColumns = columns.filter((c) => !c.hidden);
  const selectAllColumn = {
    label: 'Show all',
    selectAll: true,
    indeterminate: hiddenColumns.length !== 0 && shownColumns.length !== 0,
    hidden: shownColumns.length === 0,
    type: 'text' };

  const sortedColumns = [selectAllColumn].concat(
  shownColumns.concat(hiddenColumns).map((c) => _objectSpread(_objectSpread({}, c), {}, { selectAll: false })));

  return { sortedColumns, hiddenColumns };
};

const HideColumnsComponent = ({
  setTableViewAllColumnsHidden: setAllColumnsHidden,
  setTableViewColumnHidden: setColumnHidden,
  columns: columnsMap }) =>
{
  const [open, setOpen] = (0, _react.useState)(false);
  const [clickedOutside, setClickedOutside] = (0, _react.useState)(false);

  const { sortedColumns, hiddenColumns } = processColumns(columnsMap);
  const dropdownContainerRef = (0, _react.useRef)(null);
  const dropdownRef = (0, _react.useRef)(null);

  const onClickOutside = (0, _react.useCallback)((event) => {
    if (
    event.target.className !== 'columns-hint' && (
    !event.target.parentElement || event.target.parentElement.className !== 'columns-hint'))
    {var _dropdownRef$current;
      setClickedOutside(true);
      (_dropdownRef$current = dropdownRef.current) === null || _dropdownRef$current === void 0 ? void 0 : _dropdownRef$current.props.onToggle();
    }
  }, []);

  const handleClick = () => {
    if (open) {
      setOpen(false);
    }
  };

  (0, _useOnClickOutsideElementHook.useOnClickOutsideElement)(dropdownContainerRef, onClickOutside);

  const onSelect = (item) =>
  item.selectAll ?
  setAllColumnsHidden(item.indeterminate ? false : !item.hidden) :
  setColumnHidden(item.name, !item.hidden);

  return /*#__PURE__*/(
    _react.default.createElement("div", { className: "hidden-columns-dropdown", ref: dropdownContainerRef }, /*#__PURE__*/


    _react.default.createElement(_Forms.DropdownList, {
      ref: dropdownRef,
      open: open,
      data: sortedColumns,
      filter: (item, searchTerm) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()),

      itemComponent: _HiddenColumnsDropdownItem.ColumnItem,
      valueComponent: (0, _HiddenColumnsDropdownItem.ValueItem)(hiddenColumns, open, handleClick),
      onSelect: (selected) => {
        onSelect(selected);
      },
      onToggle: () => {
        if (clickedOutside) {var _dropdownRef$current2;
          setOpen(false);
          setClickedOutside(false);
          (_dropdownRef$current2 = dropdownRef.current) === null || _dropdownRef$current2 === void 0 ? void 0 : _dropdownRef$current2.forceUpdate();
          return;
        }
        if (!open) {
          setOpen(true);
        }
      } })));



};exports.HideColumnsComponent = HideColumnsComponent;
const HiddenColumnsDropdown = connector(HideColumnsComponent);exports.HiddenColumnsDropdown = HiddenColumnsDropdown;