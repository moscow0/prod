"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mongodb = require("mongodb");const _excluded = ["inheritProperty"];function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}var _default =

{
  delta: 45,

  name: 'denormalize-inherited-type',

  description: 'Denormalize the type of inherited properties in templates',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const cursor = await db.collection('templates').find({ properties: { $exists: true } });

    while (await cursor.hasNext()) {
      const template = await cursor.next();
      const properties = await Promise.all(
      template.properties.map(async (prop) => {
        if (prop.inherit) {
          const [inheritedTemplate] = await db.
          collection('templates').
          find({ 'properties._id': new _mongodb.ObjectID(prop.inheritProperty) }).
          toArray();

          const inheritedProperty = inheritedTemplate.properties.find(
          (p) => p._id.toString() === prop.inheritProperty.toString());


          const { inheritProperty } = prop,newProp = _objectWithoutProperties(prop, _excluded);
          newProp.inherit = {
            property: inheritedProperty._id,
            type: inheritedProperty.type };

          return newProp;
        }

        return prop;
      }));


      await db.collection('templates').updateOne({ _id: template._id }, { $set: { properties } });
    }
  } };exports.default = _default;