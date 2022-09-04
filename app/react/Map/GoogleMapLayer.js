"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getGoogleLayer = void 0;var _leaflet = _interopRequireDefault(require("leaflet"));
require("leaflet.gridlayer.googlemutant");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const getGoogleLayer = (type) =>
_leaflet.default.gridLayer.googleMutant({
  type,
  minZoom: 1,
  maxZoom: 20,
  zIndex: 0 });exports.getGoogleLayer = getGoogleLayer;