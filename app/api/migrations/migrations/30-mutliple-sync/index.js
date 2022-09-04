"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default = {
  delta: 30,

  name: 'multiple-sync',

  description: 'Nests current sycn configurations inside arrays and names them',

  async up(db) {
    process.stdout.write('Updating sync configurations...\r\n');

    const [settings] = await db.collection('settings').find().toArray();

    if (settings.sync) {
      const sync = [_objectSpread(_objectSpread({}, settings.sync), {}, { name: 'default' })];
      await db.collection('settings').updateOne({ _id: settings._id }, { $set: { sync } });
    }

    const syncs = await db.collection('syncs').find().toArray();

    if (syncs.length) {
      await db.collection('syncs').updateOne({ _id: syncs[0]._id }, { $set: { name: 'default' } });
    }

    process.stdout.write('Sync configurations updated\r\n');
  } };exports.default = _default;