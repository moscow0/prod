"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getMapProvider = void 0;var _leaflet = _interopRequireDefault(require("leaflet"));
var _I18N = require("../I18N");
var _GoogleMapLayer = require("./GoogleMapLayer");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const DEFAULT_MAPBOX_TOKEN =
'pk.eyJ1Ijoibnd5dSIsImEiOiJjazlta3liaWowMHBkM2pwaHFiaG0wcDBqIn0.47wbPKb2A4u3iCt34qrSRw';

const mapBoxStyles = {
  Streets: 'mapbox/streets-v11',
  Satellite: 'mapbox/satellite-v9',
  Hybrid: 'mapbox/satellite-streets-v11' };


const GoogleMapStyles = {
  Streets: 'roadmap',
  Satellite: 'satellite',
  Hybrid: 'hybrid' };


const getGoogleLayers = () =>
Object.keys(GoogleMapStyles).reduce(
(layers, styleId) => _objectSpread(_objectSpread({},
layers), {}, {
  [styleId]: (0, _GoogleMapLayer.getGoogleLayer)(GoogleMapStyles[styleId]) }),

{});


const getMapboxLayers = (accessToken) => {
  const mapboxUrl =
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';

  return Object.keys(mapBoxStyles).reduce((layers, styleId) => {
    const styleLabel = (0, _I18N.t)('System', styleId, null, false);
    return _objectSpread(_objectSpread({},
    layers), {}, {
      [styleLabel]: _leaflet.default.tileLayer(mapboxUrl, {
        id: mapBoxStyles[styleId],
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken || DEFAULT_MAPBOX_TOKEN,
        zIndex: 0 }) });


  }, {});
};

const mapFunction = {
  google: getGoogleLayers,
  mapbox: getMapboxLayers };

const getMapProvider = (provider, mapApiKey) => {
  const mapLayers = mapFunction[provider](mapApiKey);
  return { layers: Object.values(mapLayers), baseMaps: mapLayers };
};exports.getMapProvider = getMapProvider;