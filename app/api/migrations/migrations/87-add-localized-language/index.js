"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default = {
  delta: 87,

  name: 'add-localized-language',

  description: 'Adds the localized language to the settings',

  reindex: false,

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const [settings] = await db.collection('settings').find().toArray();

    const { languages } = settings;

    const updatedLanguages = languages.map((language) => {
      const intl = new Intl.DisplayNames([language.key], {
        type: 'language',
        languageDisplay: 'dialect' });


      const localizedName = intl.of(language.key);

      return _objectSpread(_objectSpread({},
      language), {}, {
        localized_label: localizedName.charAt(0).toUpperCase() + localizedName.slice(1) });

    });

    return db.collection('settings').updateOne({}, { $set: { languages: updatedLanguages } });
  } };exports.default = _default;