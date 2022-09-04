"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Switcher = exports.Select = exports.RadioButtons = exports.NumericRangeSlide = exports.NumericRange = exports.Numeric = exports.NestedMultiselect = exports.Nested = exports.MultiSuggest = exports.MultiSelectTristate = exports.MultiSelect = exports.MultiDateRange = exports.MultiDate = exports.MediaField = exports.MarkDown = exports.LookupMultiSelect = exports.LinkField = exports.IconSelector = exports.Geolocation = exports.FormGroup = exports.DropdownList = exports.DateRange = exports.DatePicker = exports.Captcha = void 0;var _react = _interopRequireDefault(require("react"));
var _reactReduxForm = require("react-redux-form");
var forms = _interopRequireWildcard(require("../Forms"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}

const Select = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.Select }, props));exports.Select = Select;
const DatePicker = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control, _extends({ component: forms.DatePicker }, props));exports.DatePicker = DatePicker;
const Captcha = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control, _extends({ component: forms.Captcha }, props));exports.Captcha = Captcha;
const DateRange = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.DateRange }, props));exports.DateRange = DateRange;
const MultiSelect = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.MultiSelect }, props));exports.MultiSelect = MultiSelect;
const LookupMultiSelect = (props) => /*#__PURE__*/
_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.LookupMultiSelect }, props));exports.LookupMultiSelect = LookupMultiSelect;

const MultiSelectTristate = (props) => /*#__PURE__*/
_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.MultiSelectTristate }, props));exports.MultiSelectTristate = MultiSelectTristate;

const MarkDown = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.text, _extends({ component: forms.MarkDown }, props));exports.MarkDown = MarkDown;
const Nested = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.Nested }, props));exports.Nested = Nested;
const MultiDate = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.MultiDate }, props));exports.MultiDate = MultiDate;
const MultiSuggest = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.MultiSuggest }, props));exports.MultiSuggest = MultiSuggest;
const MultiDateRange = (props) => /*#__PURE__*/
_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.MultiDateRange }, props));exports.MultiDateRange = MultiDateRange;

const Numeric = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control, _extends({ component: forms.Numeric }, props));exports.Numeric = Numeric;
const NumericRange = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.NumericRange }, props));exports.NumericRange = NumericRange;
const NumericRangeSlide = (props) => /*#__PURE__*/
_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.NumericRangeSlide }, props));exports.NumericRangeSlide = NumericRangeSlide;

const DropdownList = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.DropdownList }, props));exports.DropdownList = DropdownList;
const IconSelector = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.IconSelector }, props));exports.IconSelector = IconSelector;
const RadioButtons = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.RadioButtons }, props));exports.RadioButtons = RadioButtons;
const Switcher = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control.select, _extends({ component: forms.Switcher }, props));exports.Switcher = Switcher;
const Geolocation = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control, _extends({ component: forms.Geolocation }, props));exports.Geolocation = Geolocation;
const LinkField = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control, _extends({ component: forms.LinkField }, props));exports.LinkField = LinkField;
const NestedMultiselect = (props) => /*#__PURE__*/_react.default.createElement(forms.NestedMultiselect, props);exports.NestedMultiselect = NestedMultiselect;
const FormGroup = (props) => /*#__PURE__*/_react.default.createElement(forms.FormGroup, props);exports.FormGroup = FormGroup;
const MediaField = (props) => /*#__PURE__*/_react.default.createElement(_reactReduxForm.Control, _extends({ component: forms.MediaField }, props));exports.MediaField = MediaField;