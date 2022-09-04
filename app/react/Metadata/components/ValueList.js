"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));

var _Layout = require("../../Layout");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const composeIcon = (data) =>
typeof data.value === 'string' && data.icon !== undefined ? /*#__PURE__*/
_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
_jsx(_Layout.Icon, { data: data.icon }), /*#__PURE__*/
_jsx("span", {}, void 0, "\xA0")) :

null;

const composeCount = (data, key) => {
  if (data.valueCount > 1) {
    return /*#__PURE__*/(
      _jsx(_react.default.Fragment, {}, key,
      composeIcon(data),
      data.value, "\xA0", /*#__PURE__*/

      _jsx("span", { className: "item-count" }, void 0, data.valueCount)));


  }
  return /*#__PURE__*/(
    _react.default.createElement(_react.default.Fragment, null,
    composeIcon(data),
    data.value));


};

const renderItemValue = (v, key, i) => /*#__PURE__*/
_jsx("li", { className: "item-value" }, key,
composeCount(v, `item-value-${i}`));



const renderList = (prop) => /*#__PURE__*/
_jsx("ul", { className: "multiline" }, void 0,
prop.value.map((v, index) => {
  const key = `${prop.name}_${index}`;
  return renderItemValue(v, key, index);
}));



const renderCompact = (prop) => /*#__PURE__*/
_jsx("ul", { className: "compact comma-separated" }, void 0, prop.value.map((v, i) => renderItemValue(v, i, i)));


const groupRepeatedValues = (property) =>
property.value.reduce((results, v) => {
  const previousValue = results.find((r) => r.value === v.value);
  if (previousValue) {
    previousValue.valueCount += 1;
  } else {
    results.push(_objectSpread(_objectSpread({}, v), {}, { valueCount: 1 }));
  }
  return results;
}, []);

const ValueList = ({ property, compact }) => {
  const propertyWithGroupedValues = _objectSpread(_objectSpread({}, property), {}, { value: groupRepeatedValues(property) });
  return compact ? renderCompact(propertyWithGroupedValues) : renderList(propertyWithGroupedValues);
};var _default =

ValueList;exports.default = _default;