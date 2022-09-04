"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.translator = void 0;var _mongodb = require("mongodb");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const translatedPropertyTypes = new Set(['select', 'multiselect']);

class Translator {
  constructor() {
    this.propertyNameToContent = {};
    this.dictionaryInfo = {};
    this.translationInfo = {};
  }

  async buildPropertyInfo(db) {
    const templates = await db.collection('templates').find().toArray();
    this.propertyNameToContent = templates.
    map((t) => t.properties).
    flat().
    filter((p) => translatedPropertyTypes.has(p.type)).
    map((p) => [p.name, p.content]);
    this.propertyNameToContent = Object.fromEntries(this.propertyNameToContent);
  }

  async buildDictionaryInfo(db) {
    const dictionaries = await db.
    collection('dictionaries').
    find({
      _id: {
        $in: Array.from(new Set(Object.values(this.propertyNameToContent))).map((id) =>
        (0, _mongodb.ObjectId)(id)) } }).



    toArray();
    const asArray = dictionaries.map((d) => [
    d._id,
    Object.fromEntries(d.values.map((entry) => [entry.id, entry.label]))]);

    this.dictionaryInfo = Object.fromEntries(asArray);
  }

  async buildTranslationInfo(db) {
    const translations = await db.collection('translations').find().toArray();
    const asArray = translations.map((tr) => [
    tr.locale,
    Object.fromEntries(
    tr.contexts.map((c) => [
    c.id,
    Object.fromEntries(c.values.map((element) => [element.key, element.value]))]))]);



    this.translationInfo = Object.fromEntries(asArray);
  }

  async build(db) {
    await this.buildPropertyInfo(db);
    await this.buildDictionaryInfo(db);
    await this.buildTranslationInfo(db);
  }

  valueToNewLabel(propertyName, label, language) {
    const thesaurusId = this.propertyNameToContent[propertyName];
    const thesaurusEntryLabel = this.dictionaryInfo[thesaurusId][label];
    return this.translationInfo[language][thesaurusId][thesaurusEntryLabel];
  }

  translateProperty(propertyName, propertyObjects, language) {
    if (propertyName in this.propertyNameToContent) {
      return propertyObjects.map((o) => _objectSpread(_objectSpread({},
      o), {}, {
        label: this.valueToNewLabel(propertyName, o.value, language) }));

    }
    return propertyObjects.map((o) => _objectSpread({}, o));
  }

  translateMetadata(metadata, language) {
    const translatedMetadata = {};
    Object.entries(metadata).forEach(([key, value]) => {
      translatedMetadata[key] = this.translateProperty(key, value, language);
    });
    return translatedMetadata;
  }}


const translator = new Translator();exports.translator = translator;