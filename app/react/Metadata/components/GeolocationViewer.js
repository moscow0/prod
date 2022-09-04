"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _formatcoords = _interopRequireDefault(require("formatcoords"));
var _I18N = require("../../I18N");

var _Map = require("../../Map");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const GeolocationViewer = ({ points, onlyForCards }) => {
  if (onlyForCards) {
    return /*#__PURE__*/(
      _jsx("div", {}, void 0,
      points.
      filter((p) => Boolean(p)).
      map((p, i) => {
        const coords = (0, _formatcoords.default)(p.lat, p.lon);
        return /*#__PURE__*/(
          _jsx("div", {}, i,
          p.label ? `${p.label}: ` : '',
          coords.format('DD MM ss X', { latLonSeparator: ', ', decimalPlaces: 0 })));


      })));


  }

  const markers = [];
  points.
  filter((p) => Boolean(p)).
  forEach(({ lat, lon, label, color }) => {
    markers.push({
      latitude: lat,
      longitude: lon,
      properties: _objectSpread({ info: label }, color ? { color } : {}) });

  });

  const componentProps = markers.length ?
  { latitude: markers[0].latitude, longitude: markers[0].longitude } :
  {};

  return /*#__PURE__*/(
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _react.default.createElement(_Map.Map, _extends({}, componentProps, { height: 370, markers: markers, mapStyleSwitcher: true, showControls: true })), /*#__PURE__*/
    _jsx("div", { className: "print-view-alt" }, void 0, /*#__PURE__*/
    _jsx("p", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Latitude"), ": ", componentProps.latitude), /*#__PURE__*/

    _jsx("p", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Longitude"), ": ", componentProps.longitude))));




};

GeolocationViewer.defaultProps = {
  points: [],
  onlyForCards: true };var _default =







GeolocationViewer;exports.default = _default;