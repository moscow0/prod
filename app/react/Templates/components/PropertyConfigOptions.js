"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _FilterSuggestions = require("./FilterSuggestions");
var _reactRedux = require("react-redux");
var _I18N = require("../../I18N");
var _PropertyConfigOption = _interopRequireDefault(require("./PropertyConfigOption"));
var _Tip = _interopRequireDefault(require("../../Layout/Tip"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class PropertyConfigOptions extends _react.Component {
  render() {
    const { index, filter, type, canBeFilter } = this.props;
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_PropertyConfigOption.default, {
        label: "Hide label",
        model: `template.data.properties[${index}].noLabel` }, void 0, /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This property will be shown without the label."))), /*#__PURE__*/


      _jsx(_PropertyConfigOption.default, {
        label: "Required property",
        model: `template.data.properties[${index}].required` }, void 0, /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "You won't be able to save an entity if this property is empty."))), /*#__PURE__*/




      _jsx(_PropertyConfigOption.default, {
        label: "Show in cards",
        model: `template.data.properties[${index}].showInCard` }, void 0, /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This property will appear in the library cards as part of the basic info."))),





      canBeFilter && /*#__PURE__*/
      _jsx("div", { className: "inline-group" }, void 0, /*#__PURE__*/
      _jsx(_PropertyConfigOption.default, {
        label: "Use as filter",
        model: `template.data.properties[${index}].filter` }, void 0, /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Property as filter description" }, void 0, "This property will be used for filtering the library results. When properties match in equal name and field type with other entity types, they will be combined for filtering."))),






      filter && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_PropertyConfigOption.default, {
        label: "Default filter",
        model: `template.data.properties[${index}].defaultfilter` }, void 0, /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Property as default filter description" }, void 0, "Use this property as a default filter in the library. When there are no entity types selected, this property will show as a default filter for your collection."))),






      ['text', 'date', 'numeric', 'select'].includes(type) && /*#__PURE__*/
      _jsx(_PropertyConfigOption.default, {
        label: "Priority sorting",
        model: `template.data.properties[${index}].prioritySorting` }, void 0, /*#__PURE__*/

      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Priority sorting description" }, void 0, "Properties marked as priority sorting will be used as default sorting criteria. If more than one property is marked as priority sorting the system will try to pick-up the best fit. When listing mixed template types, the system will pick-up the best combined priority sorting."))))), /*#__PURE__*/












      _jsx(_FilterSuggestions.FilterSuggestions, { index: index })));


  }}


PropertyConfigOptions.defaultProps = {
  canBeFilter: true,
  filter: false };









function mapStateToProps({ template }, props) {
  return {
    filter: template.data.properties[props.index].filter };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(PropertyConfigOptions);exports.default = _default;