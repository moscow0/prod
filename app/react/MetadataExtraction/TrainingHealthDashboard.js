"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TrainingHealthDashboard = void 0;var _I18N = require("../I18N");
var _react = _interopRequireDefault(require("react"));

var _GridChart = require("./GridChart");
var _TrainingHealthLegend = require("./TrainingHealthLegend");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}





const mapStats = (data) => [
{
  color: '#5073CF',
  value: data.labeled,
  label: { text: /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Training") } },

{
  color: '#4CAE4C',
  value: data.nonLabeledMatching,
  label: { text: /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Matching") } },

{
  color: '#ECA41A',
  value: data.nonLabeledNotMatching,
  label: { text: /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Non-matching") } },

{
  color: '#E8E7EC',
  value: data.emptyOrObsolete,
  label: { text: /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Empty / Obsolete"), color: 'black' } }];



const TrainingHealthDashboard = ({ stats }) => {
  if (!stats) return null;

  const data = mapStats(stats.counts);

  return /*#__PURE__*/(
    _jsx("div", { className: "training-dashboard" }, void 0, /*#__PURE__*/
    _jsx(_TrainingHealthLegend.TrainingHealthLegend, { data: data, total: stats.counts.all, accuracy: stats.accuracy }), /*#__PURE__*/
    _jsx(_GridChart.GridChart, { className: "training-dashboard-chart", data: data })));


};exports.TrainingHealthDashboard = TrainingHealthDashboard;