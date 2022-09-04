"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _translations = _interopRequireDefault(require("../i18n/translations"));


var _tsUtils = require("../../shared/tsUtils");
var _templates = _interopRequireDefault(require("../templates"));



var _settingsSchema = require("../../shared/types/settingsSchema");
var _settingsModel = require("./settingsModel");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const DEFAULT_MAP_STARTING_POINT = [{ lon: 6, lat: 46 }];

const getUpdatesAndDeletes = (
matchProperty,
propertyName,
newValues = [],
currentValues = []) =>
{
  const updatedValues = {};
  const deletedValues = [];

  currentValues.forEach((value) => {
    const matchValue = newValues.find(
    (v) => {var _v$matchProperty, _value$matchProperty;return v[matchProperty] && ((_v$matchProperty = v[matchProperty]) === null || _v$matchProperty === void 0 ? void 0 : _v$matchProperty.toString()) === ((_value$matchProperty = value[matchProperty]) === null || _value$matchProperty === void 0 ? void 0 : _value$matchProperty.toString());});


    if (value[propertyName] && matchValue && matchValue[propertyName] !== value[propertyName]) {
      if (value.sublinks) {
        value.sublinks.forEach((sublink) => {
          updatedValues[(0, _tsUtils.ensure)(sublink[propertyName])] = sublink[propertyName];
        });
      }
      updatedValues[(0, _tsUtils.ensure)(value[propertyName])] = matchValue[propertyName];
    }
    if (!matchValue) {
      if (value.sublinks) {
        value.sublinks.forEach((sublink) => {
          if (sublink[propertyName]) {
            deletedValues.push((0, _tsUtils.ensure)(sublink[propertyName]));
          }
        });
      }
      deletedValues.push((0, _tsUtils.ensure)(value[propertyName]));
    }
  });

  const values = newValues.reduce((result, value) => {var _value$sublinks;
    const sublinkResults = {};
    (_value$sublinks = value.sublinks) === null || _value$sublinks === void 0 ? void 0 : _value$sublinks.map((sublink) => {
      sublinkResults[(0, _tsUtils.ensure)(sublink[propertyName])] = sublink[propertyName];
    });
    return _objectSpread(_objectSpread({},
    result), {}, {
      [(0, _tsUtils.ensure)(value[propertyName])]: value[propertyName] },
    sublinkResults);

  }, {});
  return { updatedValues, deletedValues, values };
};

const saveLinksTranslations = async (
newLinks,
currentLinks = []) =>
{
  if (!newLinks) {
    return Promise.resolve();
  }

  const { updatedValues, deletedValues, values } = getUpdatesAndDeletes(
  '_id',
  'title',
  newLinks,
  currentLinks);


  return _translations.default.updateContext(
  'Menu',
  'Menu',
  updatedValues,
  deletedValues,
  values,
  'Uwazi UI');

};

const saveFiltersTranslations = async (
_newFilters,
_currentFilters = []) =>
{
  if (!_newFilters) {
    return Promise.resolve();
  }

  const newFilters = _newFilters.filter((item) => item.items);
  const currentFilters = _currentFilters.filter((item) => item.items);

  const { updatedValues, deletedValues, values } = getUpdatesAndDeletes(
  'id',
  'name',
  newFilters,
  currentFilters);

  return _translations.default.updateContext(
  'Filters',
  'Filters',
  updatedValues,
  deletedValues,
  values,
  'Uwazi UI');

};

function removeTemplate(filters, templateId) {
  const filterTemplate = (filter) => filter.id !== templateId;
  return filters.filter(filterTemplate).map((_filter) => {
    const filter = _filter;
    if (filter.items) {
      filter.items = removeTemplate(filter.items, templateId);
    }
    return filter;
  });
}

function setDefaults(storedSettings) {
  const [settings] = storedSettings;
  if (!settings) return {};

  settings.mapStartingPoint =
  settings.mapStartingPoint && settings.mapStartingPoint.length ?
  settings.mapStartingPoint :
  DEFAULT_MAP_STARTING_POINT;

  return settings;
}var _default =

{
  async get(query = {}, select = '') {
    return (0, _tsUtils.ensure)(
    await _settingsModel.settingsModel.get(query, select).then((settings) => setDefaults(settings)));

  },

  async save(settings) {
    await (0, _settingsSchema.validateSettings)(settings);
    const currentSettings = await this.get();
    await saveLinksTranslations(settings.links, currentSettings.links);
    await saveFiltersTranslations(settings.filters, currentSettings.filters);

    const result = await _settingsModel.settingsModel.save(_objectSpread(_objectSpread({}, settings), {}, { _id: currentSettings._id }));

    if (!currentSettings.newNameGeneration && settings.newNameGeneration) {
      await (
      await _templates.default.get()).
      reduce(async (lastSave, template) => {
        await lastSave;
        return _templates.default.save(
        template,
        (0, _tsUtils.ensure)(
        (0, _tsUtils.ensure)(currentSettings.languages).find((l) => l.default)).
        key);

      }, Promise.resolve({}));
    }

    return result;
  },

  async setDefaultLanguage(key) {
    return this.get().then(async (currentSettings) => {
      const languages = (0, _tsUtils.ensure)(currentSettings.languages).map((language) => _objectSpread(_objectSpread({},
      language), {}, {
        default: language.key === key }));


      return _settingsModel.settingsModel.save(Object.assign(currentSettings, { languages }));
    });
  },

  async getDefaultLanguage() {var _currentSettings$lang;
    const currentSettings = await this.get();
    const defaultLanguage = (_currentSettings$lang = currentSettings.languages) === null || _currentSettings$lang === void 0 ? void 0 : _currentSettings$lang.find((language) => language.default);
    if (!defaultLanguage) {
      throw new Error('There is no default language !');
    }
    return defaultLanguage;
  },

  async addLanguage(language) {
    const currentSettings = await this.get();
    currentSettings.languages = currentSettings.languages || [];
    currentSettings.languages.push(language);
    return _settingsModel.settingsModel.save(currentSettings);
  },

  async deleteLanguage(key) {
    const currentSettings = await this.get();
    const languages = (0, _tsUtils.ensure)(currentSettings.languages).filter(
    (language) => language.key !== key);

    return _settingsModel.settingsModel.save(Object.assign(currentSettings, { languages }));
  },

  async removeTemplateFromFilters(templateId) {
    const settings = await this.get();

    if (!settings.filters) {
      return Promise.resolve();
    }

    settings.filters = removeTemplate(settings.filters, templateId);
    return this.save(settings);
  },

  async updateFilterName(filterId, name) {
    const settings = await this.get();

    if (!(settings.filters || []).some((eachFilter) => eachFilter.id === filterId)) {
      return Promise.resolve();
    }

    const filter = (settings.filters || []).find((eachFilter) => eachFilter.id === filterId);
    if (filter) {
      filter.name = name;
    }

    return this.save(settings);
  } };exports.default = _default;