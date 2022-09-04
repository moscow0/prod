"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _advancedSort = require("../../utils/advancedSort");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _I18N = require("../../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}
class Select extends _react.Component {
  render() {
    const { options, optionsValue, optionsLabel, placeholder, sort } = this.props;

    let _options = options;
    if (sort) {
      const sortRoot = options.reduce((memo, option) => memo && !option.options, true);
      _options = sortRoot ? (0, _advancedSort.advancedSort)(options, { property: optionsLabel }) : options;
    }
    const { value } = this.props;

    return /*#__PURE__*/(
      _jsx("select", { className: "form-control", onChange: this.props.onChange, value: value }, void 0, "`", /*#__PURE__*/
      _jsx("option", { value: "" }, void 0, (0, _I18N.t)('System', placeholder, null, false)), "`;",
      _options.map((option, index) => {
        const key = option._id || option.id || index;
        if (option.options) {
          const groupOptions = sort ?
          (0, _advancedSort.advancedSort)(option.options, { property: optionsLabel }) :
          option.options;
          return /*#__PURE__*/(
            _jsx("optgroup", { label: option.label }, key,
            groupOptions.map((opt, indx) => {
              const ky = opt._id || opt.id || indx;
              return /*#__PURE__*/(
                _jsx("option", { value: opt[optionsValue] }, ky,
                opt[optionsLabel]));


            })));


        }
        return /*#__PURE__*/(
          _jsx("option", { value: option[optionsValue] }, key,
          option[optionsLabel]));


      })));


  }}exports.default = Select;


Select.defaultProps = {
  value: '',
  optionsValue: 'value',
  optionsLabel: 'label',
  placeholder: 'Select...',
  sort: false };