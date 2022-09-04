"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PublishedFilters = void 0;var _react = _interopRequireDefault(require("react"));
var _SelectFilter = _interopRequireDefault(require("./SelectFilter"));
var _FormGroup = _interopRequireDefault(require("../../DocumentForm/components/FormGroup"));

var _Auth = require("../../Auth");
var _I18N = require("../../I18N");
var _UI = require("../../UI");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}






const filteredAggregation = (aggregations, key) => {var _aggregations$all, _aggregations$all$_pu;return (
    (
    ((aggregations === null || aggregations === void 0 ? void 0 : (_aggregations$all = aggregations.all) === null || _aggregations$all === void 0 ? void 0 : (_aggregations$all$_pu = _aggregations$all._published) === null || _aggregations$all$_pu === void 0 ? void 0 : _aggregations$all$_pu.buckets) || []).find((a) => a.key === key) || {
      filtered: { doc_count: 0 } }).

    filtered.doc_count || 0);};

const generateOptions = (aggregations) => [
{
  label: /*#__PURE__*/
  _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
  _jsx(_UI.Icon, { icon: "globe-africa" }), "\xA0", /*#__PURE__*/

  _jsx(_I18N.Translate, {}, void 0, "Published")),


  title: 'Published',
  value: 'published',
  results: filteredAggregation(aggregations, 'true') },

{
  label: /*#__PURE__*/
  _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
  _jsx(_UI.Icon, { icon: "lock" }), "\xA0", /*#__PURE__*/

  _jsx(_I18N.Translate, {}, void 0, "Restricted")),


  title: 'Restricted',
  value: 'restricted',
  results: filteredAggregation(aggregations, 'false') }];



const PublishedFilters = ({ onChange, aggregations }) => {
  const options = generateOptions(aggregations);
  const totalAggs = options.reduce((total, o) => total + o.results, 0);
  if (totalAggs === 0) {
    return null;
  }
  return /*#__PURE__*/(
    _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor', 'collaborator'] }, void 0, /*#__PURE__*/
    _jsx(_FormGroup.default, { className: "admin-filter" }, "publishedStatus", /*#__PURE__*/
    _jsx(_SelectFilter.default, {
      model: ".publishedStatus",
      prefix: "publishedStatus",
      onChange: onChange,
      options: options,
      showBoolSwitch: false }))));




};exports.PublishedFilters = PublishedFilters;