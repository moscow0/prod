"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mappings = require("./mappings");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =

{
  mapping: (templates, topicClassification) => {
    const baseMappingObject = {
      properties: {
        metadata: {
          properties: {} },

        suggestedMetadata: {
          properties: {} } } };




    return templates.reduce(
    (baseMapping, template) => {var _template$properties;return (
        // eslint-disable-next-line max-statements
        (_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.reduce((_map, property) => {var _property$inherit;
          const map = _objectSpread({}, _map);
          if (!property.name || !property.type || property.type === 'preview') {
            return map;
          }

          map.properties.metadata.properties[property.name] = {
            properties: _mappings.propertyMappings[property.type]() };

          if (
          topicClassification && (
          property.type === 'select' || property.type === 'multiselect'))
          {
            map.properties.suggestedMetadata.properties[property.name] = {
              properties: _mappings.propertyMappings[property.type]() };

          }

          if ((_property$inherit = property.inherit) !== null && _property$inherit !== void 0 && _property$inherit.type && property.inherit.type !== 'preview') {
            map.properties.metadata.properties[property.name].properties.inheritedValue = {
              properties: _mappings.propertyMappings[property.inherit.type]() };

          }
          return map;
        }, baseMapping));},
    baseMappingObject);

  } };exports.default = _default;