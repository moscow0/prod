"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Map = void 0;var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _jsApiLoader = require("@googlemaps/js-api-loader");

var _index = require("./index");
var _ErrorBoundary = require("../App/ErrorHandling/ErrorBoundary");const _excluded = ["collectionSettings", "templates"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}












const mapStateToProps = ({ settings, templates }) => ({
  collectionSettings: settings.collection,
  templates });


const connector = (0, _reactRedux.connect)(mapStateToProps);




const MapComponent = (_ref) => {var _collectionSettings$g;let { collectionSettings, templates } = _ref,props = _objectWithoutProperties(_ref, _excluded);
  const startingPoint = collectionSettings === null || collectionSettings === void 0 ? void 0 : (_collectionSettings$g = collectionSettings.get('mapStartingPoint')) === null || _collectionSettings$g === void 0 ? void 0 : _collectionSettings$g.toJS();
  const tilesProvider = (collectionSettings === null || collectionSettings === void 0 ? void 0 : collectionSettings.get('tilesProvider')) || 'mapbox';
  const mapApiKey = collectionSettings === null || collectionSettings === void 0 ? void 0 : collectionSettings.get('mapApiKey');

  if (tilesProvider === 'google' && mapApiKey) {
    const loader = new _jsApiLoader.Loader({
      apiKey: mapApiKey,
      retries: 0 });

    loader.
    load().
    then(() => {}).
    catch(() => {});
  }

  const templatesInfo = templates.reduce(
  (info, t) => _objectSpread(_objectSpread({},
  info),
  t ?
  {
    [t.get('_id')]: {
      color: t.get('color'),
      name: t.get('name') } } :


  {}),

  {});

  const mapProps = _objectSpread(_objectSpread({}, props), {}, { startingPoint, tilesProvider, mapApiKey, templatesInfo });
  return /*#__PURE__*/(
    _jsx(_ErrorBoundary.ErrorBoundary, {}, void 0, /*#__PURE__*/
    _react.default.createElement(_index.LMap, mapProps)));


};

const container = connector(MapComponent);exports.Map = container;