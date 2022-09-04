"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /* eslint-disable no-await-in-loop */var _default =
{
  delta: 63,

  reindex: false,

  name: 'remove_id_and_localID_from_template',

  description: 'Remove deprecated id and localID from template properties',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const cursor = await db.collection('templates').find();

    while (await cursor.hasNext()) {
      const template = await cursor.next();
      if (template.properties && template.properties.length > 0) {
        const properties = template.properties.map((property) => {
          const sanitizedProperty = _objectSpread({}, property);
          delete sanitizedProperty.id;
          delete sanitizedProperty.localID;
          return sanitizedProperty;
        });
        await db.collection('templates').updateOne({ _id: template._id }, { $set: { properties } });
      }
    }
  } };exports.default = _default;