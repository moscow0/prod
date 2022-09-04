"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.RechartsPie = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _recharts = require("recharts");

var _immutable = _interopRequireDefault(require("immutable"));

var _colorScheme = _interopRequireDefault(require("../utils/colorScheme"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

function ellipsisString(string, maxLength) {
  if (string.length <= maxLength) {
    return string;
  }

  return `${string.substring(0, maxLength - 3)}...`;
}

class RechartsPie extends _react.Component {
  static getDerivedStateFromProps(props) {
    return RechartsPie.mountData(props);
  }

  static mountData(props) {
    let fullData = _immutable.default.fromJS([]);
    if (props.data) {
      fullData = _immutable.default.fromJS(
      props.data.map((item) => ({ name: item.label, value: item.results, enabled: true })));

    }
    return { activeIndex: 0, fullData };
  }

  renderActiveShape(props) {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value } =
    props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 22) * cos;
    const my = cy + (outerRadius + 22) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return /*#__PURE__*/(
      _jsx("g", {}, void 0, /*#__PURE__*/
      _jsx("text", { x: cx, y: cy, dy: 8, textAnchor: "middle", fill: fill }, void 0,
      ellipsisString(payload.name, 14)), /*#__PURE__*/

      _jsx(_recharts.Sector, {
        cx: cx,
        cy: cy,
        innerRadius: innerRadius,
        outerRadius: outerRadius,
        startAngle: startAngle,
        endAngle: endAngle,
        fill: fill,
        stroke: "#fff" }), /*#__PURE__*/

      _jsx(_recharts.Sector, {
        cx: cx,
        cy: cy,
        startAngle: startAngle,
        endAngle: endAngle,
        innerRadius: outerRadius + 6,
        outerRadius: outerRadius + 10,
        fill: fill }), /*#__PURE__*/

      _jsx("path", { d: `M${sx},${sy}L${mx},${my}L${ex},${ey}`, stroke: fill, fill: "none" }), /*#__PURE__*/
      _jsx("circle", { cx: ex, cy: ey, r: 2, fill: fill, stroke: "none" }), /*#__PURE__*/
      _jsx("text", { x: ex + (cos >= 0 ? 1 : -1) * 12, y: ey, textAnchor: textAnchor, fill: "#333" }, void 0,
      `${payload.name}: ${value}`), /*#__PURE__*/

      _jsx("text", { x: ex + (cos >= 0 ? 1 : -1) * 12, y: ey, dy: 18, textAnchor: textAnchor, fill: "#999" }, void 0,
      `(${(percent * 100).toFixed(2)}%)`)));



  }

  getFilteredIndex(data, index) {
    const filteredIndexMap = {};
    let enabledIndices = -1;
    data.forEach((item, iterator) => {
      if (item.get('enabled')) {
        enabledIndices += 1;
        filteredIndexMap[iterator] = enabledIndices;
        return;
      }
      filteredIndexMap[iterator] = null;
    });

    return filteredIndexMap[index];
  }

  onIndexEnter(_data, index) {
    this.setState({ activeIndex: index });
  }

  onFullIndexEnter(_data, index) {
    this.onIndexEnter(null, this.getFilteredIndex(this.state.fullData, index));
  }

  onIndexClick(_data, index) {
    const oldData = this.state.fullData;
    const enabled = !oldData.getIn([index, 'enabled']);
    let activeIndex = null;
    const fullData = oldData.setIn([index, 'enabled'], enabled);
    if (enabled) {
      activeIndex = this.getFilteredIndex(fullData, index);
    }

    this.setState({ activeIndex, fullData });
  }

  render() {
    const filteredColors = [];

    const fullData = this.state.fullData.toJS();

    const filteredData = fullData.reduce((results, item, index) => {
      if (item.enabled) {
        results.push(item);
        filteredColors.push(_colorScheme.default[index % _colorScheme.default.length]);
      }
      return results;
    }, []);

    const legendFormatter = (index, item) => /*#__PURE__*/
    _jsx("span", { style: { color: fullData[index].enabled ? '#333' : '#999' } }, void 0, item.name);


    return /*#__PURE__*/(
      _jsx(_recharts.ResponsiveContainer, { height: 320 }, void 0, /*#__PURE__*/
      _jsx(_recharts.PieChart, {}, void 0, /*#__PURE__*/
      _jsx(_recharts.Pie, {
        data: filteredData,
        dataKey: "value",
        cx: "50%",
        cy: "50%",
        innerRadius: 50,
        outerRadius: 80,
        activeIndex: this.state.activeIndex,
        activeShape: this.renderActiveShape,
        animationBegin: 200,
        animationDuration: 500,
        onMouseEnter: this.onIndexEnter.bind(this),
        onClick: this.onIndexEnter.bind(this),
        fill: "#8884d8" }, void 0,

      filteredData.map((_entry, index) => /*#__PURE__*/
      _jsx(_recharts.Cell, { fill: filteredColors[index], opacity: 0.8 }, index))), /*#__PURE__*/


      _jsx(_recharts.Legend, {
        onMouseEnter: this.onFullIndexEnter.bind(this),
        onClick: this.onIndexClick.bind(this),
        payload: fullData.map((item, index) => ({
          value: item.name,
          type: 'rect',
          color: fullData[index].enabled ? _colorScheme.default[index % _colorScheme.default.length] : '#aaa',
          formatter: legendFormatter(index, item) })) }))));





  }}exports.RechartsPie = RechartsPie;var _default =






(0, _reactRedux.connect)()(RechartsPie);exports.default = _default;