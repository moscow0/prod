"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.UnwrapMetadataObject = exports.EntitySection = void 0;
var _reactRedux = require("react-redux");
var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils");
var _Section = require("./Section");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






const mapStateToProps = ({ templates, entityView }) => ({
  entity: entityView.entity,
  templates });


const connector = (0, _reactRedux.connect)(mapStateToProps);




const getPropertyValue = (property, metadataProperty) => {
  switch (property.type) {
    case 'multiselect':
    case 'multidaterange':
    case 'nested':
    case 'multidate':
    case 'geolocation':
      return metadataProperty.map((v) => v.label || v.value);
    case 'relationship':{
        let value = [];
        metadataProperty.forEach((v) => {
          if (v.inheritedType && v.inheritedValue) {
            const properties = getPropertyValue({ type: v.inheritedType }, v.inheritedValue);
            value = Array.isArray(properties) ? [...value, ...properties] : [...value, properties];
          } else {
            value.push(v.label || v.value);
          }
        });
        return Array.from(new Set(value));
      }
    case 'generatedid':
      return typeof metadataProperty === 'string' ? metadataProperty : metadataProperty[0].value;
    default:
      return metadataProperty[0].label || metadataProperty[0].value;}

};

// eslint-disable-next-line import/exports-last
const UnwrapMetadataObject = (MetadataObject, Template) =>
Object.keys(MetadataObject).reduce((UnwrapedMO, key) => {
  if (!MetadataObject[key].length) {
    return UnwrapedMO;
  }
  const property = Template.properties.find((p) => p.name === key);
  const propertyValue = getPropertyValue(property, MetadataObject[key]);
  return _objectSpread(_objectSpread({}, UnwrapedMO), {}, { [key]: propertyValue });
}, {});

// eslint-disable-next-line max-statements
exports.UnwrapMetadataObject = UnwrapMetadataObject;const EntitySection = ({ entity, templates, children, 'show-if': showIf }) => {
  const jsEntity = entity.toJS();
  const template = templates.find((t) => (t === null || t === void 0 ? void 0 : t.get('_id')) === jsEntity.template);
  const unwrappedMetadata = UnwrapMetadataObject(jsEntity.metadata, template.toJS());
  jsEntity.metadata = unwrappedMetadata;
  try {
    const condition = JSON.parse(showIf);
    return /*#__PURE__*/(
      _jsx(_Section.Section, { data: [jsEntity], showIf: condition }, void 0,
      children));


  } catch (e) {
    (0, _utils.logError)(e, showIf);
    return null;
  }
};

const container = connector(EntitySection);exports.EntitySection = container;