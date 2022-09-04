"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.preventDefaultEvent = exports.parseMarkerPoint = exports.getClusterMarker = exports.checkMapInitialization = exports.DataMarker = void 0;var _leaflet = _interopRequireWildcard(require("leaflet"));
var _faMapMarker = require("@fortawesome/free-solid-svg-icons/faMapMarker");
var _I18N = require("../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


































const DEFAULT_COLOR = '#d9534e';

class DataMarker extends _leaflet.default.Marker {


  constructor(
  latLngExpression,
  properties,
  options)
  {
    super(latLngExpression, options);_defineProperty(this, "properties", void 0);
    this.properties = properties;
  }}exports.DataMarker = DataMarker;


const pointMarkerIcon = (color) =>
_leaflet.default.divIcon({
  html: `
<svg viewBox="0 0 384 512" fill="${color || DEFAULT_COLOR}"><path d="${_faMapMarker.svgPathData}"/></svg>`,
  className: '',
  iconSize: [24, 40],
  iconAnchor: [12, 40] });


const circleIcon = (color) =>
_leaflet.default.divIcon({
  html: `
<svg height="100" width="100">
  <circle cx="10" cy="10" r="10" stroke="white" stroke-width="1" fill="${color || DEFAULT_COLOR}"/>
</svg>`,
  className: '',
  iconSize: [20, 36],
  iconAnchor: [12, 12] });


const getMarkerIcon = ({ properties }) => {var _properties$templateI;
  const libraryMarker = properties.libraryMap || false;
  const color = properties.color || ((_properties$templateI = properties.templateInfo) === null || _properties$templateI === void 0 ? void 0 : _properties$templateI.color) || DEFAULT_COLOR;
  return !libraryMarker ? pointMarkerIcon(color) : circleIcon(color);
};

const getMarkerTooltip = (marker) => {var _marker$properties$te, _marker$properties$en, _marker$properties$en2, _marker$properties$en3, _marker$properties$en4, _marker$properties$te2;
  const templateColor = ((_marker$properties$te = marker.properties.templateInfo) === null || _marker$properties$te === void 0 ? void 0 : _marker$properties$te.color) || DEFAULT_COLOR;
  const label = (0, _I18N.t)((_marker$properties$en = marker.properties.entity) === null || _marker$properties$en === void 0 ? void 0 : _marker$properties$en.template, marker.properties.label, null, false);
  const title = (0, _I18N.t)((_marker$properties$en2 = marker.properties.entity) === null || _marker$properties$en2 === void 0 ? void 0 : _marker$properties$en2.sharedId, (_marker$properties$en3 = marker.properties.entity) === null || _marker$properties$en3 === void 0 ? void 0 : _marker$properties$en3.title, null, false);
  const templateName = (0, _I18N.t)((_marker$properties$en4 =
  marker.properties.entity) === null || _marker$properties$en4 === void 0 ? void 0 : _marker$properties$en4.template, (_marker$properties$te2 =
  marker.properties.templateInfo) === null || _marker$properties$te2 === void 0 ? void 0 : _marker$properties$te2.name,
  null,
  false);


  const markerLabel = marker.properties.inherited ? label : marker.properties.info;

  return `<div class="popup-container">
            <span class="btn-color" style="background-color: ${templateColor}">
              <span class="translation">${templateName}</span>
            </span>&nbsp;
            <span class="popup-name">${title}</span>
            &nbsp;(<span class="popup-metadata-property">${label}</span>)
            <div class="marker-info">
                <Icon className="tag-icon" icon="tag" />
                ${markerLabel}
            </div>
          </div>
        </div>
      `;
};

const getClusterMarker = (markerPoint) => {var _marker$properties;
  const icon = getMarkerIcon(markerPoint);
  const marker = new DataMarker(
  [markerPoint.latlng.lat, markerPoint.latlng.lng],
  markerPoint.properties,
  { icon });

  if (markerPoint.properties.libraryMap && markerPoint.properties.templateInfo) {
    marker.bindTooltip(getMarkerTooltip(markerPoint));
  } else if ((_marker$properties = marker.properties) !== null && _marker$properties !== void 0 && _marker$properties.info) {var _marker$properties$en5, _marker$properties2;
    const tooltip = (0, _I18N.t)((_marker$properties$en5 = marker.properties.entity) === null || _marker$properties$en5 === void 0 ? void 0 : _marker$properties$en5.template, (_marker$properties2 = marker.properties) === null || _marker$properties2 === void 0 ? void 0 : _marker$properties2.info, null, false);
    marker.bindTooltip(tooltip);
  }
  return marker;
};exports.getClusterMarker = getClusterMarker;

const parseMarkerPoint = (
pointMarker,
templates,
libraryMap = false) =>
{var _pointMarker$properti, _pointMarker$properti2, _pointMarker$properti3;
  const templateInfo = (_pointMarker$properti = pointMarker.properties) !== null && _pointMarker$properti !== void 0 && _pointMarker$properti.entity ?
  templates[pointMarker.properties.entity.template] :
  undefined;

  return {
    latlng: (0, _leaflet.latLng)(pointMarker.latitude, pointMarker.longitude),
    properties: _objectSpread(_objectSpread({},
    pointMarker.properties), {}, {
      label: pointMarker.label || ((_pointMarker$properti2 = pointMarker.properties) === null || _pointMarker$properti2 === void 0 ? void 0 : _pointMarker$properti2.info),
      entity: (_pointMarker$properti3 = pointMarker.properties) === null || _pointMarker$properti3 === void 0 ? void 0 : _pointMarker$properti3.entity,
      templateInfo,
      libraryMap }) };


};exports.parseMarkerPoint = parseMarkerPoint;

const checkMapInitialization = (map, containerId) => {
  if (!map) {
    const container = _leaflet.default.DomUtil.get(containerId);
    if (container != null) {
      // @ts-ignore
      container._leaflet_id = null;
    }
  }
};exports.checkMapInitialization = checkMapInitialization;

const preventDefaultEvent = (event) => {
  // @ts-ignore
  event.preventDefault();
};exports.preventDefaultEvent = preventDefaultEvent;