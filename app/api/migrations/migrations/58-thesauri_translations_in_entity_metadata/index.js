"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /* eslint-disable no-await-in-loop */

const applyTranslation = (property, translation) =>
property.map((prop) => {
  const [translatedProperty] = translation.values.filter(
  (value) => value.key === prop.label && value.value !== prop.label);


  if (prop.parent) {
    const [translatedParent] = translation.values.filter(
    (value) => value.key === prop.parent.label && value.value !== prop.parent.label);


    return {
      value: prop.value,
      label: translatedProperty ? translatedProperty.value : prop.label,
      parent: {
        value: prop.parent.value,
        label: translatedParent ? translatedParent.value : prop.parent.label } };


  }

  return {
    value: prop.value,
    label: translatedProperty ? translatedProperty.value : prop.label };

});

const prepareTranslation = (entity, templates, translations) => (entityMetadata, propertyName) => {
  const property = templates[entity.template.toString()].properties.find(
  (p) => p.name === propertyName);


  if (
  property &&
  entity.metadata[propertyName].length > 0 && (
  property.type === 'select' || property.type === 'multiselect'))
  {
    const [translationsForLanguage] = translations.filter(
    (translation) => translation.locale === entity.language);

    const [propertyTranslation] = translationsForLanguage.contexts.filter(
    (context) => context.id === property.content);

    if (propertyTranslation) {
      const translatedProperty = applyTranslation(
      entity.metadata[propertyName],
      propertyTranslation);

      return _objectSpread(_objectSpread({}, entityMetadata), {}, { [propertyName]: translatedProperty });
    }
  }

  return _objectSpread(_objectSpread({}, entityMetadata), {}, { [propertyName]: entity.metadata[propertyName] });
};

// eslint-disable-next-line import/no-default-export
var _default = {
  delta: 58,

  name: 'thesauri_translations_in_entity_metadata',

  description: "Fix Thesauri translations not propagated to entity's metadata",

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const cursor = db.collection('entities').find();
    const translations = await db.collection('translations').find().toArray();
    const templates = await db.collection('templates').find().toArray();
    const templatesByKey = templates.reduce((memo, t) => _objectSpread(_objectSpread({}, memo), {}, { [t._id.toString()]: t }), {});

    while (await cursor.hasNext()) {
      const entity = await cursor.next();

      if (entity.metadata) {
        const newMetadata = Object.keys(entity.metadata).reduce(
        prepareTranslation(entity, templatesByKey, translations),
        {});


        await db.
        collection('entities').
        updateOne({ _id: entity._id }, { $set: { metadata: newMetadata } });
      }
    }
  } };exports.default = _default;