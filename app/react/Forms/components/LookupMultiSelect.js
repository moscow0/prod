"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.debounceTime = exports.LookupMultiSelect = void 0;var _react = _interopRequireWildcard(require("react"));
var _debounce = _interopRequireDefault(require("../../utils/debounce"));
var _MultiSelect = require("./MultiSelect");const _excluded = ["lookup", "onChange", "totalPossibleOptions"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}











const uniqueOptions = (optionsValue) => (option, i, arr) =>
arr.findIndex((o) => o[optionsValue] === option[optionsValue]) === i;

function notEmpty(value) {
  return value !== null && value !== undefined;
}

const debounceTime = 200;exports.debounceTime = debounceTime;

class LookupMultiSelect extends _react.Component {


  static getDerivedStateFromProps(props) {
    return { totalPossibleOptions: props.totalPossibleOptions };
  }

  constructor(props) {
    super(props);
    this.state = {
      lookupOptions: [],
      selectedOptions: [],
      totalPossibleOptions: props.totalPossibleOptions };

    this.onChange = this.onChange.bind(this);
    this.onFilter = (0, _debounce.default)(this.onFilter.bind(this), debounceTime);
  }

  onChange(value) {
    this.props.onChange(value);
    const options = this.combineOptions();

    const selectedOptions = value.
    map((v) => options.find((o) => o[this.props.optionsValue] === v)).
    filter(notEmpty);

    this.setState({ selectedOptions });
  }

  async onFilter(searchTerm) {
    if (searchTerm.length) {
      const { options, count } = await this.props.lookup(searchTerm);

      const lookupOptions = options.map((o) => _objectSpread(_objectSpread({},
      o), {}, {
        [this.props.optionsValue]: o.value,
        [this.props.optionsLabel]: o.label }));


      this.setState({ lookupOptions, totalPossibleOptions: count });
    }

    if (!searchTerm.length) {
      this.setState({
        lookupOptions: [],
        totalPossibleOptions: this.props.totalPossibleOptions });

    }
  }

  combineOptions() {
    return [
    ...this.props.options,
    ...this.state.lookupOptions,
    ...this.state.selectedOptions].
    filter(uniqueOptions(this.props.optionsValue));
  }

  render() {
    const _this$props = this.props,{ lookup, onChange, totalPossibleOptions } = _this$props,rest = _objectWithoutProperties(_this$props, _excluded);
    const filteredTotalPossibleOptions = this.state.totalPossibleOptions;
    return /*#__PURE__*/(
      _react.default.createElement(_MultiSelect.MultiSelect, _extends({},
      rest, {
        onChange: this.onChange,
        onFilter: this.onFilter,
        totalPossibleOptions: filteredTotalPossibleOptions,
        options: this.combineOptions() })));


  }}exports.LookupMultiSelect = LookupMultiSelect;_defineProperty(LookupMultiSelect, "defaultProps", _objectSpread(_objectSpread({}, _MultiSelect.defaultProps), {}, { value: [] }));