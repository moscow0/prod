"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.createSyncConfig = void 0;

var _templatesModel = _interopRequireDefault(require("../templates/templatesModel"));
var _updatelogs = require("../updatelogs");

var _processNamespaces = require("./processNamespaces");
var _syncsModel = _interopRequireDefault(require("./syncsModel"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const removeDeletedTemplatesFromConfig = async (config) => {
  const newConfig = _objectSpread({}, config);
  const templatesIds = (await _templatesModel.default.get({}, { _id: 1 })).map((template) =>
  template._id.toString());

  newConfig.templates = Object.keys(newConfig.templates || {}).reduce(
  (newTemplatesConfig, templateId) => {
    if (newTemplatesConfig && templatesIds.includes(templateId)) {var _config$templates;
      // eslint-disable-next-line no-param-reassign
      newTemplatesConfig[templateId] = ((_config$templates = config.templates) === null || _config$templates === void 0 ? void 0 : _config$templates[templateId]) || { properties: [] };
    }
    return newTemplatesConfig;
  },
  {});

  return newConfig;
};

const getValuesFromTemplateProperties = async (
config,
validTypes,
valueProperty) =>
{
  const templatesConfig = config.templates || {};

  return Object.keys(templatesConfig).reduce(async (prev, templateId) => {
    const validList = await prev;
    const template = await _templatesModel.default.getById(templateId);
    const templateConfigProperties = templatesConfig[templateId].properties;
    ((template === null || template === void 0 ? void 0 : template.properties) || []).forEach((property) => {var _property$_id;
      if (
      templateConfigProperties.includes(((_property$_id = property._id) === null || _property$_id === void 0 ? void 0 : _property$_id.toString()) || '') &&
      validTypes.includes(property.type) &&
      property[valueProperty] &&
      property[valueProperty] !== undefined)
      {
        // @ts-ignore
        validList.push(property[valueProperty].toString());
      }
    });

    return Promise.resolve(validList);
  }, Promise.resolve([]));
};

const getApprovedCollections = (config) => {
  const collections = Object.keys(config);
  const whitelistedCollections = collections.includes('templates') ?
  collections.concat([
  'settings',
  'entities',
  'files',
  'connections',
  'dictionaries',
  'translations',
  'relationtypes']) :

  collections;

  const blacklistedCollections = ['migrations', 'sessions'];

  return whitelistedCollections.filter((c) => !blacklistedCollections.includes(c));
};

const getApprovedThesauri = async (config) =>
getValuesFromTemplateProperties(config, ['select', 'multiselect'], 'content');

const getApprovedRelationtypes = async (config) => {
  const relationtypesConfig = config.relationtypes || [];
  const validTemplateRelationtypes = await getValuesFromTemplateProperties(
  config,
  ['relationship'],
  'relationType');

  return relationtypesConfig.concat(validTemplateRelationtypes);
};

const createSyncConfig = async (config, targetName) => {
  const [{ lastSync }] = await _syncsModel.default.find({ name: targetName });

  return {
    lastSync,
    config: await removeDeletedTemplatesFromConfig(config.config),

    async lastChanges() {
      const approvedCollections = getApprovedCollections(this.config);
      const firstBatch = await _updatelogs.model.find(
      {
        timestamp: { $gt: lastSync },
        namespace: { $in: approvedCollections } },

      undefined,
      {
        sort: { timestamp: 1 },
        limit: 50,
        lean: true });



      if (!firstBatch.length) {
        return [];
      }

      const endTimestamp = firstBatch[firstBatch.length - 1].timestamp;

      return _updatelogs.model.find(
      {
        $and: [{ timestamp: { $gt: lastSync } }, { timestamp: { $lte: endTimestamp } }],
        namespace: { $in: approvedCollections } },

      undefined,
      {
        sort: {
          timestamp: 1 },

        lean: true });


    },

    async shouldSync(change) {
      if (change.deleted) return { skip: true };
      const templatesConfig = this.config.templates || {};

      const relationtypesConfig = this.config.relationtypes || [];

      const whitelistedThesauri = await getApprovedThesauri(this.config);
      const whitelistedRelationtypes = await getApprovedRelationtypes(this.config);
      const processNamespaces = new _processNamespaces.ProcessNamespaces({
        change,
        templatesConfig,
        relationtypesConfig,
        whitelistedThesauri,
        whitelistedRelationtypes });


      return processNamespaces.process();
    } };

};exports.createSyncConfig = createSyncConfig;