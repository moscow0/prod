"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.FilterSuggestions = void 0;exports.mapStateToProps = mapStateToProps;var _reactRedux = require("react-redux");
var _react = _interopRequireWildcard(require("react"));

var _I18N = require("../../I18N");



var _propertyTypes = require("../../../shared/propertyTypes");
var _SimilarProperty = require("./SimilarProperty");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






class SharedProperties extends _react.Component {
  static findProperty(id, templates) {
    return templates.reduce(
    (found, template) => {var _template$properties;return (
        found || ((_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.find((p) => p._id === id)));},
    undefined);

  }

  getRelationTypeName(relationTypeId) {
    const relationType = relationTypeId ?
    this.props.relationTypes.toJS().find((r) => r._id === relationTypeId) :
    undefined;
    return relationType ? relationType.name : undefined;
  }

  getThesauriName(thesauriId) {
    const thesaurus = thesauriId ?
    this.props.thesauris.toJS().find((thesauri) => thesauri._id === thesauriId) :
    undefined;
    return thesaurus ? thesaurus.name : undefined;
  }

  findSameLabelProperties(label, templates) {
    return templates.
    filter((template) => template._id !== this.props.templateId && template.properties).
    map((template) => {
      const property = (template.properties || []).find(
      (prop) => prop.label.trim().toLowerCase() === label.trim().toLowerCase());

      return (
        property ? { template: template.name, property } : { template: undefined });

    }).
    filter((prop) => prop.template !== undefined);
  }

  render() {
    const { type, content, relationType, inherit, label, templates } = this.props;
    const _templates = templates.toJS();
    const inheritedProperty = SharedProperties.findProperty(inherit === null || inherit === void 0 ? void 0 : inherit.property, _templates);
    const similarProperties = this.findSameLabelProperties(
    label,
    _templates).
    map((propertyMatch) => {var _property$inherit;
      const { property } = propertyMatch;

      const otherInheritedProperty = SharedProperties.findProperty((_property$inherit =
      property.inherit) === null || _property$inherit === void 0 ? void 0 : _property$inherit.property,
      _templates);


      return _objectSpread(_objectSpread({},
      propertyMatch), {}, {
        typeConflict: !(0, _propertyTypes.getCompatibleTypes)(type).includes(property.type),
        relationConflict: relationType && property.relationType !== relationType,
        contentConflict: property.content !== content,
        type: property.type,
        relationTypeName: this.getRelationTypeName(property.relationType),
        thesaurusName: this.getThesauriName(property.content),
        inheritConflict: (inheritedProperty === null || inheritedProperty === void 0 ? void 0 : inheritedProperty.type) !== (otherInheritedProperty === null || otherInheritedProperty === void 0 ? void 0 : otherInheritedProperty.type),
        inheritType: otherInheritedProperty === null || otherInheritedProperty === void 0 ? void 0 : otherInheritedProperty.type });

    });

    const thisProperty = {
      template: `${this.props.templateName} (this template)`,
      type,
      relationTypeName: this.getRelationTypeName(relationType),
      thesaurusName: this.getThesauriName(content),
      typeConflict: false,
      contentConflict: false,
      relationConflict: false,
      inheritConflict: false,
      inheritType: inheritedProperty === null || inheritedProperty === void 0 ? void 0 : inheritedProperty.type };


    const templatesWithSameLabelProperties = [thisProperty, ...similarProperties];
    const hasContent = templatesWithSameLabelProperties.find((prop) => prop.thesaurusName);
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("label", { className: "suggestions-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Properties from other templates in the collection using the same label")), /*#__PURE__*/



      _jsx("table", { className: "table" }, void 0, /*#__PURE__*/
      _jsx("thead", {}, void 0, /*#__PURE__*/
      _jsx("tr", {}, void 0, /*#__PURE__*/
      _jsx("th", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Template")), /*#__PURE__*/

      _jsx("th", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Type")),

      hasContent && /*#__PURE__*/
      _jsx("th", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Thesauri"), "/", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Entity")))), /*#__PURE__*/




      _jsx("tbody", {}, void 0,
      templatesWithSameLabelProperties.map((templateProperty, index) => /*#__PURE__*/
      _jsx(_SimilarProperty.SimilarProperty, { templateProperty: templateProperty }, index))))));





  }}

















function mapStateToProps(state, props) {
  const propertySchemaElement = state.template.data.properties[props.index];
  const { relationTypes } = state;
  return {
    templates: state.templates,
    thesauris: state.thesauris,
    relationTypes,
    templateName: state.template.data.name,
    templateId: state.template.data._id,
    type: propertySchemaElement.type,
    filter: propertySchemaElement.filter,
    label: propertySchemaElement.label,
    content: propertySchemaElement.content,
    relationType: propertySchemaElement.relationType,
    inherit: propertySchemaElement.inherit };

}

const FilterSuggestions = (0, _reactRedux.connect)(mapStateToProps)(SharedProperties);exports.FilterSuggestions = FilterSuggestions;