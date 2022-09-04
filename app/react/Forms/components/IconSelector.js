"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _library = require("../../UI/Icon/library");
var _UI = require("../../UI");
var _DropdownList = _interopRequireDefault(require("./DropdownList"));
var _IconSelectorItem = _interopRequireDefault(require("./IconSelectorItem"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}

class IconSelector extends _react.Component {
  constructor(props) {
    super(props);
    const listOptions = [{ _id: null, type: 'Empty' }].
    concat(
    _library.iconNames.map((icon) => ({
      _id: icon,
      type: 'Icons',
      label: icon }))).


    concat(
    Array.from(_UI.CountryList).map((country) => ({
      _id: country[1].cca3,
      type: 'Flags',
      label: country[1].label })));



    this.state = { listOptions };
  }

  render() {
    return /*#__PURE__*/(
      _react.default.createElement(_DropdownList.default, _extends({
        valueField: "_id",
        textField: "label",
        data: this.state.listOptions,
        valueComponent: _IconSelectorItem.default,
        itemComponent: _IconSelectorItem.default,
        defaultValue: this.state.listOptions[0],
        filter: "contains",
        groupBy: "type" },
      this.props)));


  }}exports.default = IconSelector;