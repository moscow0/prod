"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function sameProperty(prop1, prop2) {var _prop1$inherit, _prop2$inherit;
  return (
    prop1.name === prop2.name &&
    prop1.type === prop2.type &&
    prop1.content === prop2.content &&
    ((_prop1$inherit = prop1.inherit) === null || _prop1$inherit === void 0 ? void 0 : _prop1$inherit.property) === ((_prop2$inherit = prop2.inherit) === null || _prop2$inherit === void 0 ? void 0 : _prop2$inherit.property));

}

function templateHasProperty(template, property) {
  return template.properties.filter((prop) => sameProperty(prop, property)).length;
}

function allTemplatesHaveIt(templates, property) {
  return templates.reduce(
  (allHaveIt, template) => allHaveIt && templateHasProperty(template, property),
  true);

}

const comonProperties = (templates, documentTypes = [], excludedTypes = []) => {
  const properties = [];
  const selectedTemplates = templates.filter((template) =>
  documentTypes.includes(template._id.toString()));


  if (selectedTemplates.length) {
    const propertiesToCompare = selectedTemplates[0].properties.filter(
    (property) => !excludedTypes.includes(property.type));

    propertiesToCompare.forEach((_property) => {
      if (allTemplatesHaveIt(selectedTemplates, _property)) {
        const property = selectedTemplates.reduce((result, tmpl) => {
          const prop = tmpl.properties.find((_prop) => sameProperty(_prop, _property), {});
          return prop.required ? prop : result;
        }, _property);
        properties.push(_objectSpread({}, property));
      }
    });
  }

  return properties;
};

function comonFilters(templates, documentTypes = [], forcedProps = []) {
  return comonProperties(templates, documentTypes).filter(
  (prop) => prop.filter || forcedProps.includes(prop.name));

}

function defaultFilters(templates, forcedProps = []) {
  return templates.reduce((filters, template) => {
    template.properties.forEach((prop) => {
      if (
      (forcedProps.includes(prop.name) || prop.filter && prop.defaultfilter) &&
      !filters.find((_prop) => sameProperty(prop, _prop)))
      {
        filters.push(prop);
      }
    });
    return filters;
  }, []);
}

const allUniqueProperties = (templates) =>
templates.reduce((filters, template) => {
  template.properties.forEach((prop) => {
    if (!filters.find((_prop) => sameProperty(prop, _prop))) {
      filters.push(prop);
    }
  });
  return filters;
}, []);

const allProperties = (templates) =>
templates.reduce((properties, template) => properties.concat(template.properties), []);

const getInheritedProperty = (property, properties) =>
properties.find((p) => property.inherit.property.toString() === p._id.toString());

const textFields = (templates) =>
allUniqueProperties(templates).filter(
(property) => property.type === 'text' || property.type === 'markdown');var _default =


{
  allProperties,
  getInheritedProperty,
  comonProperties,
  comonFilters,
  defaultFilters,
  allUniqueProperties,
  textFields };exports.default = _default;