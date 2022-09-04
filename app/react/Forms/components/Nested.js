"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _MarkDown = require("./MarkDown");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Nested extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.parseValue(this.props.value) };
  }

  parseValue(rows = []) {
    if (!rows[0]) {
      return '';
    }

    const keys = Object.keys(rows[0]).sort();
    let result = `| ${keys.join(' | ')} |\n`;
    result += `| ${keys.map(() => '-').join(' | ')} |\n`;
    result += `${rows.
    map((row) => `| ${keys.map((key) => (row[key] || []).join(',')).join(' | ')}`).
    join(' |\n')} |`;

    return result;
  }

  onChange(e) {
    const value = e.target.value || '';
    let formatedValues = [];
    this.setState({ value });
    if (value) {
      const rows = value.split('\n').filter((row) => row);
      const keys = rows[0].
      split('|').
      map((key) => key.trim()).
      filter((key) => key);
      const entries = rows.splice(2);
      formatedValues = entries.map((row) =>
      row.
      split('|').
      splice(1).
      reduce((result, val, index) => {
        if (!keys[index]) {
          return result;
        }
        const values = val.
        split(',').
        map((v) => v.trim()).
        filter((v) => v);
        result[keys[index]] = values;
        return result;
      }, {}));

    }

    this.props.onChange(formatedValues);
  }

  render() {
    return /*#__PURE__*/_jsx(_MarkDown.MarkDown, { onChange: this.onChange.bind(this), value: this.state.value });
  }}exports.default = Nested;