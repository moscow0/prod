"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _DatePicker = _interopRequireDefault(require("./DatePicker"));
var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../UI");
var _I18N = require("../../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}












class MultiDate extends _react.Component {
  constructor(props) {
    super(props);
    const values = this.props.value && this.props.value.length ? this.props.value : [null];
    this.state = { values };
  }

  onChange(index, value) {
    const values = this.state.values.slice();
    values[index] = value;
    this.setState({ values });
    this.props.onChange(values);
  }

  add(e) {
    e.preventDefault();
    const values = this.state.values.slice();
    values.push(null);
    this.setState({ values });
  }

  remove(index, e) {
    e.preventDefault();
    const values = this.state.values.slice();
    values.splice(index, 1);
    this.setState({ values });
    this.props.onChange(values);
  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "multidate" }, void 0,
      (() =>
      this.state.values.map((value, index) => /*#__PURE__*/
      _jsx("div", { className: "multidate-item" }, index, /*#__PURE__*/
      _jsx(_DatePicker.default, {
        locale: this.props.locale,
        format: this.props.format,
        onChange: this.onChange.bind(this, index),
        value: value }), /*#__PURE__*/

      _jsx("button", {
        type: "button",
        className: "react-datepicker__delete-icon",
        onClick: this.remove.bind(this, index) }))))(), /*#__PURE__*/



      _jsx("button", { type: "button", className: "btn btn-success add", onClick: this.add.bind(this) }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "plus" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Add date"))));



  }}exports.default = MultiDate;