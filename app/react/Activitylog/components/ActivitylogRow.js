"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _moment = _interopRequireDefault(require("moment"));
var _immutable = require("immutable");

var _UI = require("../../UI");
var _DescriptionWrapper = _interopRequireDefault(require("./DescriptionWrapper"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const label = (method) => {
  switch (method) {
    case 'CREATE':
      return /*#__PURE__*/_jsx("span", { className: "badge btn-color-9" }, void 0, method);
    case 'UPDATE':
      return /*#__PURE__*/_jsx("span", { className: "badge btn-color-6" }, void 0, method);
    case 'DELETE':
      return /*#__PURE__*/_jsx("span", { className: "badge btn-color-2" }, void 0, method);
    case 'RAW':
      return /*#__PURE__*/_jsx("span", { className: "badge btn-color-17" }, void 0, method);
    case 'MIGRATE':
      return /*#__PURE__*/_jsx("span", { className: "badge btn-color-12" }, void 0, method);
    case 'WARNING':
      return /*#__PURE__*/(
        _jsx("span", { className: "badge btn-color-13" }, void 0,
        method, " ", /*#__PURE__*/_jsx(_UI.Icon, { icon: "exclamation-triangle" })));


    default:
      return /*#__PURE__*/_jsx("span", { className: "badge btn-color-17" }, void 0, method);}

};

class ActivitylogRow extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  toggleExpand() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  render() {
    const { entry } = this.props;
    const { expanded } = this.state;

    const time = `${(0, _moment.default)(entry.get('time')).format('L')} ${(0, _moment.default)(entry.get('time')).
    locale('en').
    format('LTS')}`;
    const semanticData = entry.get('semantic').toJS();
    const description = /*#__PURE__*/
    _jsx(_DescriptionWrapper.default, { entry: entry, toggleExpand: this.toggleExpand, expanded: expanded }, void 0, /*#__PURE__*/
    _jsx("span", {}, void 0,
    semanticData.description && /*#__PURE__*/
    _jsx("span", { className: "activitylog-prefix" }, void 0, semanticData.description),

    semanticData.name && /*#__PURE__*/_jsx("span", { className: "activitylog-name" }, void 0, " ", semanticData.name),
    semanticData.extra && /*#__PURE__*/_jsx("span", { className: "activitylog-extra" }, void 0, " ", semanticData.extra)));




    return /*#__PURE__*/(
      _jsx("tr", {
        className: semanticData.action === 'RAW' ? 'activitylog-raw' : 'activitylog-beautified' },
      entry.get('_id'), /*#__PURE__*/

      _jsx("td", {}, void 0, label(semanticData.action)), /*#__PURE__*/
      _jsx("td", { className: !entry.get('username') ? 'color-0' : '' }, void 0,
      entry.get('username') || 'anonymous'), /*#__PURE__*/

      _jsx("td", {}, void 0, description), /*#__PURE__*/
      _jsx("td", { className: "activitylog-time" }, void 0, time)));


  }}


ActivitylogRow.defaultProps = {
  entry: (0, _immutable.Map)() };var _default =






ActivitylogRow;exports.default = _default;