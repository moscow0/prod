"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _reactReduxForm = require("react-redux-form");
var _I18N = require("../../I18N");
var _advancedSort = require("../../utils/advancedSort");
var _ViolatedArticlesNestedProperties = _interopRequireDefault(require("../../Templates/components/ViolatedArticlesNestedProperties"));
var _store = require("../../store");
var _UI = require("../../UI");
var _MultiSelect = require("./MultiSelect");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class NestedMultiselect extends _react.Component {
  constructor(props) {
    super(props);
    const values = this.props.value || {};
    this.state = { values, filter: '' };
    if (!Object.keys(this.state.values).length) {
      this.state.values = props.property.nestedProperties.reduce((result, prop) => {
        result[prop.key] = [];
        return result;
      }, {});
    }
  }

  onChange(key, optionsSelected) {
    const values = _objectSpread(_objectSpread({}, this.state.values), {}, { [key]: optionsSelected });

    this.setState({ values });
    this.props.onChange(values);
  }

  getOptions(prop, aggregations) {
    if (this.props.options) {
      return this.props.options;
    }

    if (!aggregations.all[this.props.property.name][prop]) {
      return [];
    }
    let options = aggregations.all[this.props.property.name][prop].buckets;
    if (options.length === 1 && options[0].key === 'missing') {
      return [];
    }
    options = options.
    map((item) => ({
      label: item.key,
      value: item.key,
      results: item.filtered.total.filtered.doc_count })).

    filter((option) => option.results);
    return (0, _advancedSort.advancedSort)(options, {
      property: 'value',
      treatAs: 'dottedList',
      listTypes: [Number, Number, String] });

  }

  resetFilter() {
    this.setState({ filter: '' });
  }

  filter(e) {
    this.setState({ filter: e.target.value });
  }

  selectAnyChange(key, e) {
    const values = _objectSpread(_objectSpread({}, this.state.values), {}, { [key]: [], [`${key}any`]: e.target.checked });
    this.setState({ values });
    this.props.onChange(values);
  }

  toggleOptions(key, e) {
    e.preventDefault();
    const state = {};
    state[key] = !this.state[key];
    this.setState(state);
  }

  render() {
    const { property } = this.props;
    const { locale } = _store.store.getState();
    const aggregations = this.props.aggregations ? this.props.aggregations.toJS() : {};
    return /*#__PURE__*/(
      _jsx("ul", { className: "multiselect is-active" }, void 0, /*#__PURE__*/
      _jsx("li", { className: "multiselectActions" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, {
        icon: this.state.filter ? 'times-circle' : 'search',
        onClick: this.resetFilter.bind(this) }), /*#__PURE__*/

      _jsx("input", {
        className: "form-control",
        type: "text",
        placeholder: (0, _I18N.t)('System', 'Search item', null, false),
        value: this.state.filter,
        onChange: this.filter.bind(this) }))),



      (() =>
      property.nestedProperties.map((prop, index) => {
        const options = this.getOptions(prop, aggregations);
        if (!options.length) {
          return false;
        }
        const label = _ViolatedArticlesNestedProperties.default[prop.toLowerCase()] ?
        _ViolatedArticlesNestedProperties.default[prop.toLowerCase()][`label_${locale}`] :
        prop;
        return /*#__PURE__*/(
          _jsx("li", {}, index, /*#__PURE__*/
          _jsx(_reactReduxForm.Field, { model: `.filters.${property.name}.properties.${prop}.any` }, void 0, /*#__PURE__*/
          _jsx("div", { className: "multiselectItem" }, void 0, /*#__PURE__*/
          _jsx("input", {
            type: "checkbox",
            className: "form-control multiselectItem-input",
            id: prop.key,
            onChange: this.selectAnyChange.bind(this, prop) }), /*#__PURE__*/

          _jsx("label", { htmlFor: prop, className: "multiselectItem-label" }, void 0, /*#__PURE__*/
          _jsx("span", { className: "multiselectItem-icon" }), /*#__PURE__*/
          _jsx("span", { className: "multiselectItem-name", title: label }, void 0, /*#__PURE__*/
          _jsx("b", {}, void 0, label))), /*#__PURE__*/


          _jsx("span", { className: "multiselectItem-results" }, void 0, /*#__PURE__*/
          _jsx("span", {
            className: "multiselectItem-action",
            onClick: this.toggleOptions.bind(this, prop) }, void 0, /*#__PURE__*/

          _jsx(_UI.Icon, { icon: this.state[prop] ? 'caret-up' : 'caret-down' }))))), /*#__PURE__*/




          _jsx(_ShowIf.default, { if: this.state[prop] }, void 0, /*#__PURE__*/
          _jsx(_reactReduxForm.Control, {
            component: _MultiSelect.MultiSelect,
            model: `.filters.${property.name}.properties.${prop}.values`,
            prefix: property.name + prop,
            options: options,
            onChange: this.onChange.bind(this, prop),
            showAll: true,
            hideSearch: true,
            sortbyLabel: true,
            filter: this.state.filter }))));




      }))()));


  }}exports.default = NestedMultiselect;


NestedMultiselect.defaultProps = {
  value: {},
  options: undefined };