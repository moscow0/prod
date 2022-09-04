"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PermissionsFilterUncontrolled = exports.PermissionsFilter = void 0;var _react = _interopRequireWildcard(require("react"));
var _FormGroup = _interopRequireDefault(require("../../DocumentForm/components/FormGroup"));
var _Forms = require("../../Forms");

var _Auth = require("../../Auth");
var _I18N = require("../../I18N");
var _reactReduxForm = require("react-redux-form");
var _reactRedux = require("react-redux");


var _immutable = _interopRequireDefault(require("immutable"));
var _FiltrablePermissionsLevels = require("./FiltrablePermissionsLevels");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}











const filteredAggregation = (aggregations, key) => {var _aggregations$all, _aggregations$all$_pe;
  const bucket = ((aggregations === null || aggregations === void 0 ? void 0 : (_aggregations$all = aggregations.all) === null || _aggregations$all === void 0 ? void 0 : (_aggregations$all$_pe = _aggregations$all['_permissions.self']) === null || _aggregations$all$_pe === void 0 ? void 0 : _aggregations$all$_pe.buckets) || []).find(
  (a) => a.key === key) ||
  {
    filtered: { doc_count: 0 } };

  return bucket.filtered.doc_count;
};

const generateOptions = (aggregations) => [
{
  label: /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Can edit"),
  title: 'Can edit',
  value: 'write',
  icon: { type: 'Icons', _id: 'pencil-alt' },
  results: filteredAggregation(aggregations, 'write') },

{
  label: /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Can view"),
  title: 'Can view',
  value: 'read',
  icon: { type: 'Icons', _id: 'file' },
  results: filteredAggregation(aggregations, 'read') }];



const PermissionsFilterUncontrolled = (0, _reactRedux.connect)(
({ user }) => ({
  user }))(


({
  value = _immutable.default.fromJS([]),
  onChange,
  aggregations,
  user }) =>
{
  const refIds = (0, _react.useMemo)(
  () => {var _user$toJS$groups;return [user.get('_id'), ...(((_user$toJS$groups = user.toJS().groups) === null || _user$toJS$groups === void 0 ? void 0 : _user$toJS$groups.map((g) => g._id)) || [])];},
  [user]);


  const onChangeHandler = (newValues) => {
    onChange(
    newValues.reduce(
    (filters, level) =>
    filters.concat(
    refIds.map((refId) => ({
      refId,
      level }))),


    []));


  };

  const mappedValue = (0, _react.useMemo)(
  () =>
  _FiltrablePermissionsLevels.filtrableLevels.filter((level) =>
  refIds.every((id) => value.find((v) => v.refId === id && v.level === level))),

  [refIds, value]);


  const options = generateOptions(aggregations);

  return /*#__PURE__*/(
    _jsx(_FormGroup.default, { className: "admin-filter" }, "permissions.level", /*#__PURE__*/
    _jsx(_Forms.MultiSelect, {
      prefix: "permissions.level",
      onChange: onChangeHandler,
      options: options,
      value: mappedValue })));



});


// eslint-disable-next-line react/no-multi-comp
exports.PermissionsFilterUncontrolled = PermissionsFilterUncontrolled;const PermissionsFilterMultiselect = ({
  model,
  prefix,
  onChange,
  aggregations }) => /*#__PURE__*/

// eslint-disable-next-line react/jsx-pascal-case
_jsx(_reactReduxForm.Control.select, {
  component: PermissionsFilterUncontrolled,
  model: `${model}.values`,
  prefix: prefix,
  onChange: onChange
  // @ts-ignore
  , aggregations: aggregations });



// eslint-disable-next-line react/no-multi-comp
const PermissionsFilter = ({ onChange, aggregations }) => {
  const options = generateOptions(aggregations);
  const totalAggs = options.reduce((total, o) => total + o.results, 0);
  if (totalAggs === 0) {
    return null;
  }
  return /*#__PURE__*/(
    _jsx(_Auth.NeedAuthorization, { roles: ['editor', 'collaborator'] }, void 0, /*#__PURE__*/
    _jsx(_FormGroup.default, { className: "admin-filter" }, "permissions.level", /*#__PURE__*/
    _jsx("ul", { className: "search__filter is-active" }, void 0, /*#__PURE__*/
    _jsx("li", { className: "wide" }, void 0, /*#__PURE__*/
    _jsx(PermissionsFilterMultiselect, {
      model: ".customFilters['permissions']",
      prefix: "permissions",
      onChange: onChange,
      aggregations: aggregations }))))));






};exports.PermissionsFilter = PermissionsFilter;