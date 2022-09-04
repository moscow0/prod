"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.FiltersFromProperties = void 0;exports.mapStateToProps = mapStateToProps;var _reactRedux = require("react-redux");
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));

var _I18N = require("../../I18N");
var _FormGroup = _interopRequireDefault(require("../../DocumentForm/components/FormGroup"));
var _libraryActions = require("../actions/libraryActions");
var _coreSelectors = require("../../utils/coreSelectors");
var _DateFilter = _interopRequireDefault(require("./DateFilter"));
var _NestedFilter = _interopRequireDefault(require("./NestedFilter"));
var _NumberRangeFilter = _interopRequireDefault(require("./NumberRangeFilter"));
var _SelectFilter = _interopRequireDefault(require("./SelectFilter"));
var _TextFilter = _interopRequireDefault(require("./TextFilter"));const _excluded = ["onChange", "properties", "translationContext", "modelPrefix", "storeKey", "templates"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const prepareOptions = (property) => {
  const filteredProperty = _objectSpread(_objectSpread({},
  property), {}, {
    options: property.options.filter((option) => option.id !== 'any') });

  return filteredProperty.options.map((option) => {
    const finalTranslatedOption = _objectSpread(_objectSpread({},
    option), {}, {
      label: (0, _I18N.t)(filteredProperty.content, option.label, undefined, false) });


    if (option.options) {
      const translatedSubOptions = option.options.map((subOption) => _objectSpread(_objectSpread({},
      subOption), {}, {
        label: (0, _I18N.t)(filteredProperty.content, subOption.label, undefined, false) }));

      finalTranslatedOption.options = translatedSubOptions;
    }
    return finalTranslatedOption;
  });
};

const FiltersFromProperties = (_ref) => {let {
    onChange,
    properties,
    translationContext,
    modelPrefix = '',
    storeKey,
    templates } = _ref,
  props = _objectWithoutProperties(_ref, _excluded);return /*#__PURE__*/(

    _react.default.createElement(_react.default.Fragment, null,
    properties.map((property) => {var _property$inherit;
      const { type } = (_property$inherit = property.inherit) !== null && _property$inherit !== void 0 && _property$inherit.property ? property.inherit : property;

      const commonProps = {
        model: `.filters${modelPrefix}.${property.name}`,
        label: (0, _I18N.t)(translationContext, property.label),
        onChange };


      const propertyOptions = property.options ? prepareOptions(property) : [];

      let filter = /*#__PURE__*/_react.default.createElement(_TextFilter.default, commonProps);

      if (type === 'numeric') {
        filter = /*#__PURE__*/_react.default.createElement(_NumberRangeFilter.default, commonProps);
      }

      if (['select', 'multiselect', 'relationship'].includes(type)) {
        filter = /*#__PURE__*/
        _react.default.createElement(_SelectFilter.default, _extends({},
        commonProps, {
          lookup: _libraryActions.getAggregationSuggestions.bind(null, storeKey, property.name),
          options: propertyOptions,
          prefix: property.name,
          showBoolSwitch: property.type === 'multiselect' || property.type === 'relationship',
          sort: property.type === 'relationship',
          totalPossibleOptions: property.totalPossibleOptions,
          allowSelectGroup: true }));


      }

      if (type === 'nested') {
        filter = /*#__PURE__*/
        _react.default.createElement(_NestedFilter.default, _extends({}, commonProps, { property: property, aggregations: props.aggregations }));

      }

      if (
      type === 'date' ||
      type === 'multidate' ||
      type === 'multidaterange' ||
      type === 'daterange')
      {
        filter = /*#__PURE__*/_react.default.createElement(_DateFilter.default, _extends({}, commonProps, { format: props.dateFormat }));
      }

      return /*#__PURE__*/_jsx(_FormGroup.default, {}, property.name, filter);
    })));};exports.FiltersFromProperties = FiltersFromProperties;



FiltersFromProperties.defaultProps = {
  onChange: () => {},
  dateFormat: '',
  modelPrefix: '',
  translationContext: '' };













function mapStateToProps(state, props) {
  return {
    dateFormat: state.settings.collection.get('dateFormat'),
    aggregations: state[props.storeKey].aggregations,
    storeKey: props.storeKey,
    templates: (0, _coreSelectors.selectTemplates)(state) };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(FiltersFromProperties);exports.default = _default;