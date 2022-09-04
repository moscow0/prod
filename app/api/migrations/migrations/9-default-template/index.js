"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */var _default =
{
  delta: 9,

  name: 'default-template',

  description: 'Ensures there is a default template',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    const templates = await db.collection('templates').find().toArray();
    if (!templates.length) {
      templates.push({ name: 'Entity', default: true, properties: [] });
    }
    let defaultTemplate = templates.find((t) => t.default);
    for (const template of templates) {
      if (!defaultTemplate) {
        template.default = true;
        defaultTemplate = template;
      }
      delete template.isEntity;

      await db.
      collection('templates').
      replaceOne({ _id: template._id }, _objectSpread({}, template), { new: true, lean: true });
    }

    process.stdout.write('Added default template\r');
    process.stdout.write('\r\n');
  } };exports.default = _default;