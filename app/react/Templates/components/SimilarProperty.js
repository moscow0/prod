"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.SimilarProperty = void 0;var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../UI");

var _Icons = _interopRequireDefault(require("./Icons"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const titles = {
  defaultTitle:
  'This property has the same configuration as others with the same label and will be used together.',
  contentConflict:
  'Properties with the same label but different thesauri as content are not allowed.',
  relationConflict:
  'Relationship properties with the same label but different relationship types are not allowed.',
  typeConflict: 'Properties with the same label but incompatible types are not allowed.',
  inheritConflict:
  'Properties with the same label but incompatible inherited types are not allowed.' };


















const inheritTypeToShow = (prop) =>
prop.inheritType ? prop.inheritType[0].toUpperCase() + prop.inheritType.slice(1) : '';

const invalidType = (prop) =>
prop.typeConflict || prop.relationConflict || prop.inheritConflict;

const typeToShow = (prop) => prop.type[0].toUpperCase() + prop.type.slice(1);

const title = (prop) => {
  if (prop.inheritConflict) {
    return titles.inheritConflict;
  }
  if (prop.relationConflict) {
    return titles.relationConflict;
  }
  if (prop.typeConflict) {
    return titles.typeConflict;
  }
  return '';
};

const contentTitle = (prop) =>
prop.contentConflict ? titles.contentConflict : '';

class SimilarProperty extends _react.Component {
  render() {
    const { templateProperty } = this.props;
    const typeIcon = templateProperty.type;
    const invalidThesauri = templateProperty.contentConflict && templateProperty.thesaurusName;
    return /*#__PURE__*/(
      _jsx("tr", { className: "property-atributes is-active" }, void 0, /*#__PURE__*/
      _jsx("td", {}, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "file" }), " ", templateProperty.template), /*#__PURE__*/

      _jsx("td", {
        className: invalidType(templateProperty) ? 'conflict' : '',
        title: title(templateProperty) }, void 0,

      invalidType(templateProperty) && /*#__PURE__*/_jsx(_UI.Icon, { icon: "exclamation-triangle" }), "\xA0", /*#__PURE__*/

      _jsx(_UI.Icon, { icon: _Icons.default[typeIcon] || 'fa fa-font' }), "\xA0",

      typeToShow(templateProperty),
      templateProperty.relationTypeName && ` (${templateProperty.relationTypeName})`,
      inheritTypeToShow(templateProperty) &&
      ` (Inherit: ${inheritTypeToShow(templateProperty)})`), /*#__PURE__*/

      _jsx("td", {
        className: templateProperty.contentConflict ? 'conflict' : '',
        title: contentTitle(templateProperty) }, void 0,

      invalidThesauri && /*#__PURE__*/_jsx(_UI.Icon, { icon: "exclamation-triangle" }),
      templateProperty.thesaurusName && /*#__PURE__*/_jsx(_UI.Icon, { icon: "book" }),
      templateProperty.thesaurusName)));



  }}exports.SimilarProperty = SimilarProperty;