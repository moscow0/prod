"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.LMap = void 0;var _react = _interopRequireWildcard(require("react"));
var _leaflet = _interopRequireDefault(require("leaflet"));
require("leaflet.markercluster");

var _uniqueID = _interopRequireDefault(require("../../shared/uniqueID"));
require("leaflet/dist/leaflet.css");
require("leaflet.markercluster/dist/MarkerCluster.Default.css");
var _MapHelper = require("./MapHelper");








var _TilesProviderFactory = require("./TilesProviderFactory");const _excluded = ["markers", "showControls"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}















const LMap = (_ref) => {let { markers: pointMarkers = [], showControls = true } = _ref,props = _objectWithoutProperties(_ref, _excluded);
  let map;
  let markerGroup;
  const [currentMarkers, setCurrentMarkers] = (0, _react.useState)();
  const [currentTilesProvider, setCurrentTilesProvider] = (0, _react.useState)(props.tilesProvider);
  const containerId = (0, _uniqueID.default)();

  const clickHandler = (markerPoint) => {
    if (!props.onClick) return;
    markerGroup.clearLayers();
    (0, _MapHelper.getClusterMarker)(_objectSpread(_objectSpread({}, markerPoint), {}, { properties: {} })).addTo(markerGroup);
    const event = { lngLat: [markerPoint.latlng.lng, markerPoint.latlng.lat] };
    props.onClick(event);
  };

  const initMarkers = () => {
    const markers = pointMarkers.map((pointMarker) =>
    (0, _MapHelper.parseMarkerPoint)(pointMarker, props.templatesInfo, props.renderPopupInfo));


    markers.forEach((m) => (0, _MapHelper.getClusterMarker)(m).addTo(markerGroup));
    markerGroup.on('clusterclick', (cluster) => {var _props$clickOnCluster;
      (_props$clickOnCluster = props.clickOnCluster) === null || _props$clickOnCluster === void 0 ? void 0 : _props$clickOnCluster.call(props, cluster.layer.getAllChildMarkers());
      (0, _MapHelper.preventDefaultEvent)(cluster);
    });
    markerGroup.on('click', (marker) => {var _props$clickOnMarker;
      (_props$clickOnMarker = props.clickOnMarker) === null || _props$clickOnMarker === void 0 ? void 0 : _props$clickOnMarker.call(props, marker.layer);
    });
    if (pointMarkers.length) {
      map.fitBounds(markerGroup.getBounds(), { maxZoom: 6 });
    }
    markerGroup.addTo(map);
  };

  const initMap = () => {
    const { layers, baseMaps } = (0, _TilesProviderFactory.getMapProvider)(props.tilesProvider, props.mapApiKey);
    const shouldScroll = props.renderPopupInfo || props.onClick !== undefined;
    map = _leaflet.default.map(containerId, {
      center: [props.startingPoint[0].lat, props.startingPoint[0].lon],
      zoom: 6,
      maxZoom: 20,
      minZoom: 2,
      zoomControl: false,
      preferCanvas: true,
      scrollWheelZoom: shouldScroll });


    map.getPanes().mapPane.style.zIndex = '0';
    markerGroup = _leaflet.default.markerClusterGroup();

    if (showControls) {
      _leaflet.default.control.zoom({ position: 'bottomright' }).addTo(map);
      _leaflet.default.control.layers(baseMaps, {}, { position: 'bottomright', autoZIndex: false }).addTo(map);
    }
    layers[0].options.zIndex = 0;
    layers[0].addTo(map);
    initMarkers();
    map.on('click', clickHandler);
  };

  (0, _react.useEffect)(() => {
    const reRender = currentTilesProvider !== props.tilesProvider || !props.onClick;

    if (reRender || currentMarkers === undefined) {
      setCurrentMarkers(pointMarkers);
      setCurrentTilesProvider(props.tilesProvider);
      (0, _MapHelper.checkMapInitialization)(map, containerId);
      initMap();
    }
    return () => {
      if (map && reRender) {
        map.remove();
      }
    };
  }, [pointMarkers, props.tilesProvider, props.mapApiKey]);

  return /*#__PURE__*/(
    _jsx("div", { className: "map-container", "data-testid": "map-container" }, void 0, /*#__PURE__*/
    _jsx("div", {
      id: containerId,
      className: "leafletmap",
      style: { width: '100%', height: props.height } })));



};exports.LMap = LMap;