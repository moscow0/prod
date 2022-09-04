"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.GridChart = void 0;var _react = _interopRequireWildcard(require("react"));
var _useContainerWidthHook = require("./useContainerWidthHook");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}
















const getTotalValue = (data) =>
data.reduce((subtotal, components) => subtotal + components.value, 0);

const buildMainBar = (data, ratio) => {
  const results = [];
  data.forEach((r) => {
    const slotsForColor = Math.round(r.value / ratio);
    for (let index = 0; index < slotsForColor; index += 1) {
      results.push(r.color);
    }
  });
  return results;
};

const buildOverlayingBar = (
overlapedData,
mainChart,
slots,
ratio) =>
{
  const results = [];
  const slotsForColor = Math.round(overlapedData.value / ratio);
  for (let index = 0; index < slotsForColor; index += 1) {
    results.push(overlapedData.color);
  }
  for (let index = slotsForColor; index < slots; index += 1) {
    results.push(mainChart[index]);
  }
  return results;
};

const addPaddings = (chartData, slots) => {
  const padding = [];

  if (chartData.length > slots) {
    return chartData.slice(0, slots);
  }

  for (let index = chartData.length; index < slots; index += 1) {
    padding.push(chartData[chartData.length - 1]);
  }
  return chartData.concat(padding);
};

const extractOverlying = (data) => {
  const main = [...data];
  const overlayingIndex = data.findIndex((c) => c.overlaying);

  if (overlayingIndex >= 0) {
    const [overlaying] = main.splice(overlayingIndex, 1);
    return { main, overlaying };
  }

  return { main };
};

const buildChartData = (columns, data) => {
  const { main, overlaying } = extractOverlying(data);
  const totalValue = getTotalValue(main);
  const ratio = totalValue / columns;
  const mainChart = buildMainBar(main, ratio);
  const paddedMain = addPaddings(mainChart, columns);

  if (!overlaying) {
    return [paddedMain, paddedMain];
  }

  const overChart = buildOverlayingBar(overlaying, paddedMain, columns, ratio);
  const paddedOver = addPaddings(overChart, columns);
  return [paddedMain, paddedOver];
};

const getColumnsQuantity = (width, squareSide, spaceBetweenSquares) =>
width ? Math.floor((width - spaceBetweenSquares) / (squareSide + spaceBetweenSquares)) : 0;

const GridChart = ({ data, className, squareSide, spaceBetweenSquares }) => {
  const side = squareSide || 14;
  const space = spaceBetweenSquares || 2;

  const ref = (0, _react.useRef)(null);
  const containerWidth = (0, _useContainerWidthHook.useContainerWidth)(ref);
  const columns = getColumnsQuantity(containerWidth, side, space);
  const entries = (0, _react.useMemo)(() => buildChartData(columns, data), [columns, data]);
  const columnKeys = [...Array(columns).keys()];
  const rowKeys = [0, 1];

  return /*#__PURE__*/(
    _react.default.createElement("div", { ref: ref, className: className, style: { width: '100%' } },
    columns ? /*#__PURE__*/
    _jsx("ul", { className: "grid-chart", style: { height: 2 * side + 1 * space } }, void 0,
    columnKeys.map((col) =>
    rowKeys.map((row) => /*#__PURE__*/
    _jsx("li", { style: { backgroundColor: entries[row][col] } }, `${col}-${row}`)))) :



    null));


};exports.GridChart = GridChart;