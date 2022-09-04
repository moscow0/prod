"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.thesauri = exports.flatThesaurusValues = exports.default = void 0;var _lodash = _interopRequireDefault(require("lodash"));
var _utils = require("../templates/utils");
var _entities2 = _interopRequireDefault(require("../entities/entities"));
var _config = require("../../shared/config");
var _templates = _interopRequireDefault(require("../templates/templates"));
var _settings = _interopRequireDefault(require("../settings/settings"));
var _translations = _interopRequireDefault(require("../i18n/translations"));
var _denormalize = require("../entities/denormalize");
var _search = require("../search");
var _dictionariesModel = _interopRequireDefault(require("./dictionariesModel"));
var _validateThesauri = require("./validateThesauri");const _excluded = ["values"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const autoincrementValuesId = (thesauri) => {
  thesauri.values = (0, _utils.generateIds)(thesauri.values);

  thesauri.values = thesauri.values.map((value) => {
    if (value.values) {
      value.values = (0, _utils.generateIds)(value.values);
    }

    return value;
  });
  return thesauri;
};

function thesauriToTranslationContext(thesauri) {
  return thesauri.values.reduce((ctx, prop) => {
    ctx[prop.label] = prop.label;
    if (prop.values) {
      const propctx = prop.values.reduce((_ctx, val) => {
        _ctx[val.label] = val.label;
        return _ctx;
      }, {});
      ctx = Object.assign(ctx, propctx);
    }
    return ctx;
  }, {});
}

const create = async (thesauri) => {
  const context = thesauriToTranslationContext(thesauri);
  context[thesauri.name] = thesauri.name;

  const created = await _dictionariesModel.default.save(thesauri);
  await _translations.default.addContext(created._id, thesauri.name, context, 'Thesaurus');
  return created;
};

const updateTranslation = (current, thesauri) => {
  const currentProperties = current.values;
  const newProperties = thesauri.values;

  const updatedLabels = (0, _utils.getUpdatedNames)(
  {
    prop: 'label',
    outKey: 'label',
    filterBy: 'id' },

  currentProperties,
  newProperties);

  if (current.name !== thesauri.name) {
    updatedLabels[current.name] = thesauri.name;
  }
  const deletedPropertiesByLabel = (0, _utils.getDeletedProperties)(
  currentProperties,
  newProperties,
  'id',
  'label');

  const context = thesauriToTranslationContext(thesauri);

  context[thesauri.name] = thesauri.name;
  return _translations.default.updateContext(
  current._id,
  thesauri.name,
  updatedLabels,
  deletedPropertiesByLabel,
  context,
  'Thesaurus');

};

async function updateOptionsInEntities(current, thesauri) {
  const currentProperties = current.values;
  const newProperties = thesauri.values;
  const deletedPropertiesById = (0, _utils.getDeletedProperties)(currentProperties, newProperties, 'id', 'id');
  await Promise.all(
  deletedPropertiesById.map((deletedId) =>
  _entities2.default.deleteThesaurusFromMetadata(deletedId, thesauri._id)));



  const updatedIds = (0, _utils.getUpdatedNames)(
  {
    prop: 'label',
    outKey: 'id',
    filterBy: 'id' },

  currentProperties,
  newProperties);

  const toUpdate = [];

  Object.keys(updatedIds).forEach((id) => {var _option$values;
    const option = newProperties.
    reduce((flattendedOptions, o) => flattendedOptions.concat([o, ...(o.values || [])]), []).
    find((o) => o.id === id);

    if ((_option$values = option.values) !== null && _option$values !== void 0 && _option$values.length) {
      option.values.forEach((o) => {
        toUpdate.push({ id: o.id, label: o.label, parent: { id, label: updatedIds[id] } });
      });
      return;
    }

    toUpdate.push({ id, label: updatedIds[id] });
  });

  const defaultLanguage = (await _settings.default.get()).languages.find((lang) => lang.default).key;
  await Promise.all(
  toUpdate.map((option) =>
  (0, _denormalize.denormalizeThesauriLabelInMetadata)(
  option.id,
  option.label,
  thesauri._id,
  defaultLanguage,
  option.parent)));



}

const update = async (thesauri) => {
  const currentThesauri = await _dictionariesModel.default.getById(thesauri._id);
  const valuesHaveChanged =
  JSON.stringify(thesauri.values) !== JSON.stringify(currentThesauri.values);
  const nameHasChanged = thesauri.name !== currentThesauri.name;
  if (valuesHaveChanged || nameHasChanged) {
    await updateTranslation(currentThesauri, thesauri);
    await updateOptionsInEntities(currentThesauri, thesauri);
  }
  return _dictionariesModel.default.save(thesauri);
};

function recursivelyAppendValues(originalValues, newValues) {
  const values = [...originalValues];
  const valuesByLabel = Object.fromEntries(values.map((value) => [value.label, value]));
  const existingLabels = new Set(Object.keys(valuesByLabel));

  newValues.forEach((newValue) => {
    if (!existingLabels.has(newValue.label)) {
      values.push(newValue);
    } else if (newValue.values) {
      const originalValue = valuesByLabel[newValue.label];
      originalValue.values = recursivelyAppendValues(originalValue.values || [], newValue.values);
    }
  });

  return values;
}

const thesauri = {
  async save(t) {
    const toSave = _objectSpread({ values: [], type: 'thesauri' }, t);

    autoincrementValuesId(toSave);

    await (0, _validateThesauri.validateThesauri)(toSave);

    if (toSave._id) {
      return update(toSave);
    }
    return create(toSave);
  },

  appendValues(thesaurus, newValues) {
    return _objectSpread(_objectSpread({},
    thesaurus), {}, {
      values: recursivelyAppendValues(thesaurus.values || [], newValues) });

  },

  entitiesToThesauri(_entities) {
    const values = _entities.map((entity) => ({
      id: entity.sharedId,
      label: entity.title,
      icon: entity.icon }));

    return { values };
  },

  async templateToThesauri(template, language, user, countPerTemplate) {
    const onlyPublished = !user;
    const _entities = await _entities2.default.getByTemplate(
    template._id,
    language,
    _config.preloadOptionsLimit,
    onlyPublished);

    const values = this.entitiesToThesauri(_entities);
    return Object.assign(template, values, {
      type: 'template',
      optionsCount: countPerTemplate[template._id.toString()] });

  },

  getById(id) {
    return _dictionariesModel.default.getById(id);
  },

  async get(thesauriId, language, user) {
    let query;
    if (thesauriId) {
      query = { _id: thesauriId };
    }

    const dictionaries = await _dictionariesModel.default.get(query);
    const allTemplates = await _templates.default.get(query);

    if (allTemplates.length && language) {
      const templateCount = await _search.search.countPerTemplate(language);

      const processedTemplates = await Promise.all(
      allTemplates.map((result) =>
      this.templateToThesauri(result, language, user, templateCount).then(
      (templateTransformedInThesauri) => templateTransformedInThesauri)));



      return dictionaries.concat(processedTemplates);
    }

    return dictionaries;
  },

  dictionaries(query) {
    return _dictionariesModel.default.get(query);
  },

  delete(id) {
    return _templates.default.
    countByThesauri(id).
    then((count) => {
      if (count) {
        return Promise.reject({ key: 'templates_using_dictionary', value: count });
      }
      return _translations.default.deleteContext(id);
    }).
    then(() => _dictionariesModel.default.delete(id)).
    then(() => ({ ok: true }));
  },

  async renameThesaurusInMetadata(valueId, newLabel, thesaurusId, language) {
    return (0, _denormalize.denormalizeThesauriLabelInMetadata)(valueId, newLabel, thesaurusId, language);
  } };exports.thesauri = thesauri;


const flatThesaurusValues = (thesaurus, includeRoots = false) =>
includeRoots ?
_lodash.default.flatMapDeep(thesaurus === null || thesaurus === void 0 ? void 0 : thesaurus.values, (tv) => {
  const { values = [] } = tv,root = _objectWithoutProperties(tv, _excluded);
  values.push(root);
  return values;
}) :
_lodash.default.flatMapDeep(thesaurus === null || thesaurus === void 0 ? void 0 : thesaurus.values, (tv) => tv.values || tv);exports.flatThesaurusValues = flatThesaurusValues;var _default =

thesauri;exports.default = _default;