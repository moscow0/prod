"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _entities = _interopRequireDefault(require("../entities"));
var _generatedIdPropertyAutoFiller = require("../entities/generatedIdPropertyAutoFiller");
var _translations = _interopRequireDefault(require("../i18n/translations"));

var _entitiesIndex = require("../search/entitiesIndex");
var _settings = _interopRequireDefault(require("../settings/settings"));
var _dictionariesModel = _interopRequireDefault(require("../thesauri/dictionariesModel"));
var _Error = _interopRequireDefault(require("../utils/Error"));

var _propertyTypes = require("../../shared/propertyTypes");
var _tsUtils = require("../../shared/tsUtils");

var _templateSchema = require("../../shared/types/templateSchema");

var _reindex2 = require("./reindex");
var _templatesModel = _interopRequireDefault(require("./templatesModel"));
var _utils = require("./utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








const createTranslationContext = (template) => {
  const titleProperty = (0, _tsUtils.ensure)(
  (0, _tsUtils.ensure)(template.commonProperties).find((p) => p.name === 'title'));


  const context = (template.properties || []).reduce((ctx, prop) => {
    ctx[prop.label] = prop.label;
    return ctx;
  }, {});

  context[template.name] = template.name;
  context[titleProperty.label] = titleProperty.label;
  return context;
};

const addTemplateTranslation = async (template) =>
_translations.default.addContext(
template._id.toString(),
template.name,
createTranslationContext(template),
'Entity');


const updateTranslation = async (
currentTemplate,
template) =>
{
  const currentProperties = currentTemplate.properties;
  const newProperties = template.properties || [];
  const updatedLabels = (0, _utils.getUpdatedNames)(
  {
    prop: 'label',
    outKey: 'label',
    filterBy: '_id' },

  currentProperties,
  newProperties);

  if (currentTemplate.name !== template.name) {
    updatedLabels[currentTemplate.name] = template.name;
  }
  const deletedPropertiesByLabel = (0, _utils.getDeletedProperties)(
  currentProperties,
  newProperties,
  '_id',
  'label');

  deletedPropertiesByLabel.push(
  ...(0, _utils.getRenamedTitle)(
  (0, _tsUtils.ensure)(currentTemplate.commonProperties),
  (0, _tsUtils.ensure)(template.commonProperties)));



  const context = createTranslationContext(template);

  return _translations.default.updateContext(
  currentTemplate._id.toString(),
  template.name,
  updatedLabels,
  deletedPropertiesByLabel,
  context,
  'Entity');

};

const removeExcludedPropertiesValues = async (
currentTemplate,
template) =>
{
  const currentTemplateContentProperties = (currentTemplate.properties || []).filter(
  (p) => p.content);

  const templateContentProperties = (template.properties || []).filter((p) => p.content);
  const toRemoveValues = currentTemplateContentProperties.
  map((prop) => {
    const sameProperty = templateContentProperties.find(
    (p) => {var _p$_id, _prop$_id;return ((_p$_id = p._id) === null || _p$_id === void 0 ? void 0 : _p$_id.toString()) === ((_prop$_id = prop._id) === null || _prop$_id === void 0 ? void 0 : _prop$_id.toString());});

    if (sameProperty && sameProperty.content !== prop.content) {
      return sameProperty.name;
    }
    return null;
  }).
  filter((v) => v);

  if (toRemoveValues.length > 0) {
    await _entities.default.removeValuesFromEntities(toRemoveValues, currentTemplate._id);
  }
};

const checkAndFillGeneratedIdProperties = async (
currentTemplate,
template) =>
{var _currentTemplate$prop, _template$properties;
  const storedGeneratedIdProps =
  ((_currentTemplate$prop = currentTemplate.properties) === null || _currentTemplate$prop === void 0 ? void 0 : _currentTemplate$prop.filter((prop) => prop.type === _propertyTypes.propertyTypes.generatedid)) || [];
  const newGeneratedIdProps =
  ((_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.filter(
  (newProp) =>
  !newProp._id &&
  newProp.type === _propertyTypes.propertyTypes.generatedid &&
  !storedGeneratedIdProps.find((prop) => prop.name === newProp.name))) ||
  [];
  if (newGeneratedIdProps.length > 0) {
    await (0, _generatedIdPropertyAutoFiller.populateGeneratedIdByTemplate)(currentTemplate._id, newGeneratedIdProps);
  }
  return newGeneratedIdProps.length > 0;
};

const _save = async (template) => {
  const newTemplate = await _templatesModel.default.save(template);
  await addTemplateTranslation(newTemplate);

  return newTemplate;
};

const getRelatedThesauri = async (template) => {
  const thesauriIds = (template.properties || []).map((p) => p.content).filter((p) => p);
  const thesauri = await _dictionariesModel.default.get({ _id: { $in: thesauriIds } });
  const thesauriByKey = {};
  thesauri.forEach((t) => {
    thesauriByKey[t._id] = t;
  });
  return thesauriByKey;
};var _default =

{
  async save(template, language, reindex = true) {
    /* eslint-disable no-param-reassign */
    template.properties = template.properties || [];
    template.properties = await (0, _utils.generateNames)(template.properties);
    template.properties = await (0, _utils.denormalizeInheritedProperties)(template);
    /* eslint-enable no-param-reassign */

    await (0, _templateSchema.validateTemplate)(template);
    await this.swapNamesValidation(template);

    if (reindex) {
      await (0, _entitiesIndex.updateMapping)([template]);
    }

    return template._id ? this._update(template, language, reindex) : _save(template);
  },

  async swapNamesValidation(template) {
    if (!template._id) {
      return;
    }
    const current = await this.getById((0, _tsUtils.ensure)(template._id));

    const currentTemplate = (0, _tsUtils.ensure)(current);
    currentTemplate.properties = currentTemplate.properties || [];
    currentTemplate.properties.forEach((prop) => {
      const swapingNameWithExistingProperty = (template.properties || []).find(
      (p) => {var _p$_id2, _prop$_id2;return p.name === prop.name && ((_p$_id2 = p._id) === null || _p$_id2 === void 0 ? void 0 : _p$_id2.toString()) !== ((_prop$_id2 = prop._id) === null || _prop$_id2 === void 0 ? void 0 : _prop$_id2.toString());});

      if (swapingNameWithExistingProperty) {
        throw (0, _Error.default)(`Properties can't swap names: ${prop.name}`, 400);
      }
    });
  },

  async _update(template, language, _reindex = true) {
    const reindex = _reindex && !template.synced;
    const templateStructureChanges = await (0, _reindex2.checkIfReindex)(template);
    const currentTemplate = (0, _tsUtils.ensure)(
    await this.getById((0, _tsUtils.ensure)(template._id)));

    if (templateStructureChanges || currentTemplate.name !== template.name) {
      await updateTranslation(currentTemplate, template);
    }
    if (templateStructureChanges) {
      await removeExcludedPropertiesValues(currentTemplate, template);
      await (0, _utils.updateExtractedMetadataProperties)(currentTemplate.properties, template.properties);
    }

    const generatedIdAdded = await checkAndFillGeneratedIdProperties(currentTemplate, template);
    const savedTemplate = _templatesModel.default.save(template);
    if (templateStructureChanges) {
      await _entities.default.updateMetadataProperties(template, currentTemplate, language, {
        reindex,
        generatedIdAdded });

    }

    return savedTemplate;
  },

  async canDeleteProperty(template, property) {
    const tmps = await _templatesModel.default.get();
    return tmps.every((iteratedTemplate) =>
    (iteratedTemplate.properties || []).every(
    (iteratedProperty) => {var _iteratedProperty$inh;return (
        !iteratedProperty.content ||
        !((_iteratedProperty$inh = iteratedProperty.inherit) !== null && _iteratedProperty$inh !== void 0 && _iteratedProperty$inh.property) ||
        !(
        iteratedProperty.content.toString() === template.toString() &&
        iteratedProperty.inherit.property.toString() === (property || '').toString()));}));



  },

  async get(query = {}) {
    return _templatesModel.default.get(query);
  },

  async setAsDefault(_id) {
    const [templateToBeDefault] = await this.get({ _id });
    const [currentDefault] = await this.get({ _id: { $nin: [_id] }, default: true });

    if (templateToBeDefault) {
      let saveCurrentDefault = Promise.resolve({});
      if (currentDefault) {
        saveCurrentDefault = _templatesModel.default.save({
          _id: currentDefault._id,
          default: false });

      }
      return Promise.all([_templatesModel.default.save({ _id, default: true }), saveCurrentDefault]);
    }

    throw (0, _Error.default)('Invalid ID');
  },

  async getById(templateId) {
    return _templatesModel.default.getById(templateId);
  },

  async removePropsWithNonexistentId(nonexistentId) {var _await$settings$getDe;
    const relatedTemplates = await _templatesModel.default.get({ 'properties.content': nonexistentId });
    const defaultLanguage = (_await$settings$getDe = await _settings.default.getDefaultLanguage()) === null || _await$settings$getDe === void 0 ? void 0 : _await$settings$getDe.key;
    if (!defaultLanguage) {
      throw Error('Missing default language.');
    }
    await Promise.all(
    relatedTemplates.map(async (t) =>
    this.save(_objectSpread(_objectSpread({},

    t), {}, {
      properties: (t.properties || []).filter((prop) => prop.content !== nonexistentId) }),

    defaultLanguage)));



  },

  async delete(template) {
    const count = await this.countByTemplate((0, _tsUtils.ensure)(template._id));
    if (count > 0) {
      return Promise.reject({ key: 'documents_using_template', value: count }); // eslint-disable-line prefer-promise-reject-errors
    }
    const _id = (0, _tsUtils.ensure)(template._id);
    await _translations.default.deleteContext(_id);
    await this.removePropsWithNonexistentId(_id);
    await _templatesModel.default.delete(_id);

    return template;
  },

  async countByTemplate(template) {
    return _entities.default.countByTemplate(template);
  },

  async countByThesauri(thesauriId) {
    return _templatesModel.default.count({ 'properties.content': thesauriId });
  },

  getRelatedThesauri };exports.default = _default;