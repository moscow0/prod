"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /* eslint-disable no-await-in-loop */var _default =
{
  delta: 8,

  name: 'page-languages',

  description: 'Create pages for languages that may be added after page creation',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    let index = 1;
    const [{ languages }] = await db.collection('settings').find().toArray();
    const defaultLanguage = languages.find((l) => l.default).key;

    const cursor = db.collection('pages').find({ language: defaultLanguage });
    while (await cursor.hasNext()) {
      const page = await cursor.next();
      const pages = await db.collection('pages').find({ sharedId: page.sharedId }).toArray();
      const defaultLanguagePage = pages.find((p) => p.language === defaultLanguage);
      await Promise.all(
      languages.map(async (language) => {
        const pageInTheLanguage = pages.find((p) => p.language === language.key);
        if (!pageInTheLanguage) {
          const newPage = _objectSpread({}, defaultLanguagePage);
          delete newPage._id;
          delete newPage.__v;
          newPage.language = language.key;
          await db.collection('pages').insertOne(newPage);
        }
      }));

      process.stdout.write(`processed -> ${index}\r`);
      index += 1;
    }
    process.stdout.write('\r\n');
  } };exports.default = _default;