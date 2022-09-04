"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.inheritance = void 0;var _translator = require("./translator.js");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class Inheritance {
  constructor() {
    this.propertyIdToName = {};
    this.templateInfo = {};
    this.cleanup();
  }

  cleanup() {
    this.sourceLanguageInfo = {};
    this.sourceEntityInfo = {};
  }

  async build(db) {
    const templates = await db.collection('templates').find({}).toArray();
    this.propertyIdToName = Object.fromEntries(
    templates.
    map((t) => t.properties).
    flat().
    filter((p) => p._id).
    map((p) => [p._id, p.name]));

    this.templateInfo = templates.
    map((template) => {var _template$properties;return [
      template._id, (_template$properties =
      template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.
      filter((p) => p.type === 'relationship').
      map((p) => {var _p$inherit;return [
        p.name, _objectSpread(_objectSpread({},

        p.inherit), {}, {
          sourcePropertyName: this.propertyIdToName[(_p$inherit = p.inherit) === null || _p$inherit === void 0 ? void 0 : _p$inherit.property],
          template: p.content })];})];}).



    filter((info) => info[1].length !== 0).
    map(([key, value]) => [key, Object.fromEntries(value)]);
    this.templateInfo = Object.fromEntries(this.templateInfo);
  }

  isPropertyInherited(templateId, propertyName) {
    return templateId in this.templateInfo && propertyName in this.templateInfo[templateId];
  }

  async loadSources(db, languageToSourceSharedId) {
    const sources = (
    await Promise.all(
    Object.entries(languageToSourceSharedId).map(async ([lang, idSet]) =>
    db.
    collection('entities').
    find(
    { language: lang, sharedId: { $in: Array.from(idSet) } },
    { projection: { sharedId: 1, language: 1, metadata: 1, title: 1 } }).

    toArray()))).


    flat();
    sources.forEach((source) => {
      if (!(source.sharedId in this.sourceEntityInfo)) {
        this.sourceEntityInfo[source.sharedId] = {};
      }
      this.sourceEntityInfo[source.sharedId][source.language] = {
        metadata: source.metadata,
        title: source.title };

    });
  }

  async prepareForBatch(db, assignedEntities, sharedIdToMissing, sharedIdToAssigned) {
    this.cleanup();
    const languageToSourceSharedId = {};
    assignedEntities.forEach((entity) => {
      this.sourceLanguageInfo[entity.sharedId] = {};
      Object.entries(entity.metadata || {}).forEach(([name, data]) => {
        if (this.isPropertyInherited(entity.template, name) && data.length !== 0) {
          const requestedLanguages = sharedIdToMissing[entity.sharedId];
          data.forEach((item) => {
            const requestedToSource = {};
            const sourceSharedId = item.value;
            requestedLanguages.forEach((lang) => {var _sharedIdToMissing$so;
              const sourceLanguage = (_sharedIdToMissing$so = sharedIdToMissing[sourceSharedId]) !== null && _sharedIdToMissing$so !== void 0 && _sharedIdToMissing$so.has(lang) ?
              sharedIdToAssigned[sourceSharedId] :
              lang;
              if (!(sourceLanguage in languageToSourceSharedId)) {
                languageToSourceSharedId[sourceLanguage] = new Set();
              }
              requestedToSource[lang] = sourceLanguage;
              languageToSourceSharedId[sourceLanguage].add(sourceSharedId);
            });
            this.sourceLanguageInfo[entity.sharedId][sourceSharedId] = requestedToSource;
          });
        }
      });
    });
    await this.loadSources(db, languageToSourceSharedId);
  }

  getSource(targetSharedId, sourceSharedId, language) {
    const sourceLanguage = this.sourceLanguageInfo[targetSharedId][sourceSharedId][language];
    return this.sourceEntityInfo[sourceSharedId][sourceLanguage];
  }

  getInheritedValue(name, targetTemplateId, source, language) {
    const sourcePropertyId = this.templateInfo[targetTemplateId][name].property;
    const sourcePropertyName = this.propertyIdToName[sourcePropertyId];
    return _translator.translator.translateProperty(
    sourcePropertyName,
    source.metadata[sourcePropertyName],
    language);

  }

  inheritProperty(property, targetTemplateId, targetSharedId, language) {
    const [name, values] = property;
    if (this.isPropertyInherited(targetTemplateId, name)) {
      const newValues = values.map((value) => {
        const source = this.getSource(targetSharedId, value.value, language);
        const newValue = _objectSpread(_objectSpread({}, value), {}, { label: source.title });
        if ('inheritedValue' in newValue) {
          newValue.inheritedValue = this.getInheritedValue(
          name,
          targetTemplateId,
          source,
          language);

        }
        return newValue;
      });
      return [name, newValues];
    }
    return property;
  }

  inheritMetadata(metadata, targetTemplateId, targetSharedId, language) {
    const returned = Object.entries(metadata || {}).map((p) =>
    this.inheritProperty(p, targetTemplateId, targetSharedId, language));

    return Object.fromEntries(returned);
  }}


const inheritance = new Inheritance();exports.inheritance = inheritance;