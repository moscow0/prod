"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.AssigneeFilterSelectUncontrolled = exports.AssigneeFilter = void 0;var _react = _interopRequireWildcard(require("react"));
var _FormGroup = _interopRequireDefault(require("../../DocumentForm/components/FormGroup"));

var _Auth = require("../../Auth");
var _I18N = require("../../I18N");
var _Forms = require("../../Forms");
var _reactReduxForm = require("react-redux-form");
var _ReactReduxForms = require("../../ReactReduxForms");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}












const generateOptions = (aggregations, level) => {var _aggregations$all, _aggregations$all2;return (
    (aggregations === null || aggregations === void 0 ? void 0 : (_aggregations$all = aggregations.all) === null || _aggregations$all === void 0 ? void 0 : (_aggregations$all2 = _aggregations$all[`_permissions.${level}`]) === null || _aggregations$all2 === void 0 ? void 0 : _aggregations$all2.buckets.
    filter((aggregation) => aggregation.key !== 'any').
    map((aggregation) => _objectSpread({
      label: aggregation.label,
      title: aggregation.label,
      value: aggregation.key,
      results: aggregation.filtered.doc_count },
    aggregation.icon ? { icon: { type: 'Icons', _id: aggregation.icon } } : {}))) ||
    []);};

const AssigneeFilterSelectUncontrolled = ({
  onChange,
  aggregations,
  value = [] }) =>
{
  const readOptions = (0, _react.useMemo)(() => generateOptions(aggregations, 'read'), [aggregations]);
  const writeOptions = (0, _react.useMemo)(() => generateOptions(aggregations, 'write'), [aggregations]);

  const getChangeHandler = (level) => (values) => {
    const newSelected = value.
    filter((v) => v.level !== level).
    concat(values.map((v) => ({ refId: v, level })));

    onChange(newSelected);
  };

  const onReadChangeHandler = (0, _react.useCallback)(getChangeHandler('read'), [value, onChange]);
  const onWriteChangeHandler = (0, _react.useCallback)(getChangeHandler('write'), [value, onChange]);

  const readValues = value.filter((v) => v.level === 'read').map((v) => v.refId);
  const writeValues = value.filter((v) => v.level === 'write').map((v) => v.refId);

  return /*#__PURE__*/(
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx("li", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Shared as viewer")), /*#__PURE__*/

    _jsx("li", { className: "wide" }, void 0, /*#__PURE__*/
    _jsx(_Forms.MultiSelect, {
      prefix: "permissions.read",
      onChange: onReadChangeHandler,
      options: readOptions,
      value: readValues })), /*#__PURE__*/


    _jsx("li", { className: "spaced" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Shared as editor")), /*#__PURE__*/

    _jsx("li", { className: "wide" }, void 0, /*#__PURE__*/
    _jsx(_Forms.MultiSelect, {
      prefix: "permissions.write",
      onChange: onWriteChangeHandler,
      options: writeOptions,
      value: writeValues }))));




};

// eslint-disable-next-line react/no-multi-comp
exports.AssigneeFilterSelectUncontrolled = AssigneeFilterSelectUncontrolled;const AssigneeFilterSelect = ({
  model,
  prefix,
  onChange,
  aggregations }) => /*#__PURE__*/

// eslint-disable-next-line react/jsx-pascal-case
_jsx(_reactReduxForm.Control.select, {
  component: AssigneeFilterSelectUncontrolled,
  model: model,
  prefix: prefix,
  onChange: onChange
  // @ts-ignore
  , aggregations: aggregations });



// eslint-disable-next-line react/no-multi-comp
const AssigneeFilter = ({ onChange, aggregations }) => /*#__PURE__*/
_jsx(_Auth.NeedAuthorization, {}, void 0, /*#__PURE__*/
_jsx(_FormGroup.default, { className: "admin-filter" }, "permissions", /*#__PURE__*/
_jsx("ul", { className: "search__filter is-active" }, void 0, /*#__PURE__*/
_jsx("li", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Permissions"), /*#__PURE__*/
_jsx(_ReactReduxForms.Switcher, {
  model: ".customFilters['permissions'].and",
  prefix: "permissions",
  onChange: onChange })), /*#__PURE__*/


_jsx(AssigneeFilterSelect, {
  model: ".customFilters['permissions'].values",
  prefix: "permissions",
  onChange: onChange,
  aggregations: aggregations }))));exports.AssigneeFilter = AssigneeFilter;