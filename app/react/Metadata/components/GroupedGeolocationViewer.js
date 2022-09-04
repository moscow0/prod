"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.GroupedGeolocationViewer = void 0;var _react = _interopRequireDefault(require("react"));
var _GeolocationViewer = _interopRequireDefault(require("./GeolocationViewer"));
var _reactRedux = require("react-redux");
var _reselect = require("reselect");
var _I18N = require("../../I18N");
var _redux = require("redux");

var _tsUtils = require("../../../shared/tsUtils");
var _Pill = require("./Pill");
var actions = _interopRequireWildcard(require("../../Relationships/actions/actions"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






























const templatesMap = (0, _reselect.createSelector)(
(s) => s.templates,
(templates) =>
templates.reduce(
(map, template) => _objectSpread(_objectSpread({},
map), {}, {
  [(0, _tsUtils.ensure)(template === null || template === void 0 ? void 0 : template.get('_id'))]: {
    name: template === null || template === void 0 ? void 0 : template.get('name'),
    color: template === null || template === void 0 ? void 0 : template.get('color') } }),


{}));



function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    selectConnection: actions.selectConnection },

  dispatch);

}

const mapStateToProps = (state) => ({
  templatesInfo: templatesMap(state) });


const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);


const notLabeledOrMultiple = (member) =>
member.value.length === 1 && !member.value[0].label;

const pillColor = (member, templatesInfo, templateId) => {var _templatesInfo$member;return (
    ((_templatesInfo$member = templatesInfo[member.translateContext]) === null || _templatesInfo$member === void 0 ? void 0 : _templatesInfo$member.color) || templatesInfo[templateId].color);};

const getFirstGroupInfo = (
members,
templatesInfo,
templateId) => /*#__PURE__*/

_jsx("dl", {
  className: "pills-container" },
members.map((member) => `${member.translateContext}_${member.name}`).join(','), /*#__PURE__*/

_jsx("dt", {}), /*#__PURE__*/
_jsx("dd", {}, void 0,
members.map((member) => /*#__PURE__*/
_jsx(_Pill.Pill, {

  color: pillColor(member, templatesInfo, templateId) }, `${member.value[0].lat}_${member.value[0].lon}`, /*#__PURE__*/

_jsx(_I18N.Translate, { context: templateId }, void 0, member.label)))));






const getMultiMemberInfo =
(
templatesInfo,
selectConnection,
templateId) =>

(member) => {var _templatesInfo$member2;return /*#__PURE__*/(

    _jsx("dl", { className: "pills-container" }, `${member.translateContext}_${member.name}`, /*#__PURE__*/
    _jsx("dt", {}, void 0, /*#__PURE__*/
    _jsx("span", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { context: templateId }, void 0, member.label),
    ((_templatesInfo$member2 = templatesInfo[member.translateContext]) === null || _templatesInfo$member2 === void 0 ? void 0 : _templatesInfo$member2.name) && /*#__PURE__*/
    _react.default.createElement(_react.default.Fragment, null,
    ' (', /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "linked"), ' ', /*#__PURE__*/
    _jsx(_I18N.Translate, { context: templateId }, void 0,
    templatesInfo[member.translateContext].name),

    ') '))), /*#__PURE__*/




    _jsx("dd", {}, void 0,
    member.value.map((value) => /*#__PURE__*/
    _jsx("div", {

      onClick: () => value.relatedEntity && selectConnection(value.relatedEntity),
      style: { cursor: value.relatedEntity ? 'pointer' : 'default' } }, `${value.lat}_${value.lon}`, /*#__PURE__*/

    _jsx(_Pill.Pill, {

      color: pillColor(member, templatesInfo, templateId) }, `${value.lat}_${value.lon}`, /*#__PURE__*/

    _jsx(_I18N.Translate, { context: member.translateContext }, void 0, value.label || '')))))));};







const computeRenderMemberGroups = (
members,
templatesInfo,
selectConnection,
templateId) =>
{
  const firstGroup = [];
  const restOfGroups = [];

  members.forEach((member) => {
    if (notLabeledOrMultiple(member)) {
      firstGroup.push(member);
    } else {
      restOfGroups.push(member);
    }
  });

  return [
  firstGroup.length ? getFirstGroupInfo(firstGroup, templatesInfo, templateId) : null].
  concat(restOfGroups.map(getMultiMemberInfo(templatesInfo, selectConnection, templateId)));
};

// eslint-disable-next-line react/no-multi-comp
const GroupedGeolocationViewerComponent = (props) => {
  const markers = props.members.reduce((flat, member) => {
    if (notLabeledOrMultiple(member)) {
      return flat.concat([_objectSpread(_objectSpread({},

      member.value[0]), {}, {
        label: member.label,
        color: pillColor(member, props.templatesInfo, props.templateId) })]);


    }

    return flat.concat(
    member.value.map((v) => _objectSpread(_objectSpread({},
    v), {}, {
      color: pillColor(member, props.templatesInfo, props.templateId) })));


  }, []);

  return /*#__PURE__*/(
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx(_GeolocationViewer.default, { points: markers, onlyForCards: false }),
    computeRenderMemberGroups(
    props.members,
    props.templatesInfo,
    props.selectConnection,
    props.templateId)));



};

const GroupedGeolocationViewer = connector(GroupedGeolocationViewerComponent);exports.GroupedGeolocationViewer = GroupedGeolocationViewer;