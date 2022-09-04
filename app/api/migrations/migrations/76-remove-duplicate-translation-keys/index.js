"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /* eslint-disable no-await-in-loop */var _default =
{
  delta: 76,

  name: 'remove-duplicate-translation-keys',

  description: `The migration makes sure that there are no multiples of the same key in a context. 
  It picks the first key-value pair, where the value differs from the key, if there is any.`,

  reindex: false,

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const translations = await db.collection('translations').find();

    while (await translations.hasNext()) {
      const tr = await translations.next();
      const newContexts = tr.contexts.map((context) => {
        const newValues = {};
        context.values.forEach(({ key, value }) => {
          if (!(key in newValues) || key !== value && key === newValues[key]) {
            newValues[key] = value;
          }
        });
        const newValueArray = Object.entries(newValues).map(([key, value]) => ({ key, value }));
        if (newValueArray.length !== context.values.length) {
          this.reindex = true;
        }
        return _objectSpread(_objectSpread({},
        context), {}, {
          values: newValueArray });

      });
      await db.
      collection('translations').
      updateOne({ _id: tr._id }, { $set: { contexts: newContexts } });
    }
  } };exports.default = _default;