"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;const _excluded = ["inheritProperty", "inherit"];function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /* eslint-disable no-await-in-loop */var _default =

{
  delta: 48,

  name: 'fix_migration_45_inherit_property',

  description:
  'migration 45 sets inherit.property to the original objectId, this should be a string',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const cursor = await db.collection('templates').find({ properties: { $exists: true } });

    while (await cursor.hasNext()) {
      const template = await cursor.next();
      const properties = await Promise.all(
      template.properties.map(async (prop) => {
        if (prop.inherit) {
          return _objectSpread(_objectSpread({},
          prop), {}, {
            inherit: _objectSpread(_objectSpread({},
            prop.inherit), {}, {
              property: prop.inherit.property.toString() }) });


        }

        if (prop.inherit === false) {
          const { inheritProperty, inherit } = prop,newProp = _objectWithoutProperties(prop, _excluded);
          return newProp;
        }
        return prop;
      }));


      await db.collection('templates').updateOne({ _id: template._id }, { $set: { properties } });
    }
  } };exports.default = _default;