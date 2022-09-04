"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _reactRedux = require("react-redux");
require("react-datepicker/dist/react-datepicker.css");

var _reactDatepicker2 = _interopRequireWildcard(require("react-datepicker"));
var localization = _interopRequireWildcard(require("date-fns/locale"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _momentTimezone = _interopRequireDefault(require("moment-timezone"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const removeOffset = (useTimezone, value) => {
  let datePickerValue = null;
  const miliseconds = value * 1000;
  if (value) {
    const newValue = _momentTimezone.default.utc(miliseconds);

    if (!useTimezone) {
      // in order to get the system offset for the specific date we
      // need to create a new not UTC moment object with the original timestamp
      newValue.subtract((0, _momentTimezone.default)((0, _momentTimezone.default)(miliseconds)).utcOffset(), 'minutes');
    }

    datePickerValue = parseInt(newValue.locale('en').format('x'), 10);
  }

  return datePickerValue;
};

const addOffset = (useTimezone, endOfDay, value) => {
  const newValue = _momentTimezone.default.utc(value);

  if (!useTimezone) {
    // in order to get the proper offset moment has to be initialized with the actual date
    // without this you always get the "now" moment offset
    newValue.add((0, _momentTimezone.default)(value).utcOffset(), 'minutes');
  }

  if (endOfDay) {
    const method = useTimezone ? newValue.local() : newValue.utc();
    method.endOf('day');
  }

  return newValue;
};

class DatePicker extends _react.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    (0, _reactDatepicker2.registerLocale)(props.locale || 'en', localization[props.locale] || localization.enGB);
  }

  handleChange(datePickerValue) {
    const { endOfDay, useTimezone, onChange } = this.props;

    if (!datePickerValue) {
      onChange(null);
    } else {
      const newValue = addOffset(useTimezone, endOfDay, datePickerValue);
      onChange(parseInt(newValue.locale('en').format('X'), 10));
    }
  }

  render() {
    const { locale, format, useTimezone, value } = this.props;
    const defaultFormat = 'dd/MM/yyyy';
    const datePickerValue = removeOffset(useTimezone, value);
    return /*#__PURE__*/(
      _jsx(_reactDatepicker2.default, {
        dateFormat: format || defaultFormat,
        className: "form-control",
        onChange: this.handleChange,
        selected: datePickerValue,
        locale: locale,
        placeholderText: format || defaultFormat,
        isClearable: true,
        fixedHeight: true,
        showYearDropdown: true }));


  }}


DatePicker.defaultProps = {
  value: undefined,
  endOfDay: false,
  locale: 'en',
  format: 'dd/MM/yyyy',
  useTimezone: false };var _default =











(0, _reactRedux.connect)()(DatePicker);exports.default = _default;