"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /* eslint-disable no-await-in-loop */
const obsoleteTranslationKeys = ['Delete User', 'Save User', 'Create User'];var _default =

{
  delta: 94,

  name: 'remove-obsolete-translation-keys',

  description:
  'The migration removes known obsoleted entries in the System context of translations.',

  reindex: false,

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const translations = await db.collection('translations').find({});

    while (await translations.hasNext()) {
      const language = await translations.next();
      const updatedContexts = language.contexts.map((context) => {
        if (context.id !== 'System') {
          return context;
        }

        const updatedValues = context.values.filter(
        (value) => !obsoleteTranslationKeys.includes(value.key));


        return _objectSpread(_objectSpread({}, context), {}, { values: updatedValues });
      });

      await db.
      collection('translations').
      updateOne({ _id: language._id }, { $set: { contexts: updatedContexts } });
    }
  } };exports.default = _default;