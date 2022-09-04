"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.preserveSync = void 0;var _entities = _interopRequireDefault(require("../../entities"));
var _files = require("../../files");
var _log = require("../../log");

var _settings = _interopRequireDefault(require("../../settings"));
var _templates = _interopRequireDefault(require("../../templates"));
var _utils = require("../../templates/utils");
var _tenants = require("../../tenants");
var _thesauri = _interopRequireDefault(require("../../thesauri"));
var _dictionariesModel = _interopRequireDefault(require("../../thesauri/dictionariesModel"));
var _users = _interopRequireDefault(require("../../users/users"));
var _AppContext = require("../../utils/AppContext");
var _mongodb = require("mongodb");
var _path = _interopRequireDefault(require("path"));
var _qs = _interopRequireDefault(require("qs"));
var _JSONRequest = _interopRequireDefault(require("../../../shared/JSONRequest"));
var _propertyTypes = require("../../../shared/propertyTypes");





var _preserveSyncModel = require("./preserveSyncModel");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const thesauriValueId = async (thesauriId, valueLabel) => {
  const [value] = await _dictionariesModel.default.db.aggregate([
  { $match: { _id: new _mongodb.ObjectId(thesauriId) } },
  { $unwind: '$values' },
  { $match: { 'values.label': valueLabel } },
  { $replaceRoot: { newRoot: '$values' } }]);


  return value === null || value === void 0 ? void 0 : value.id;
};

const getSourceThesauriId = async (template) =>
((template === null || template === void 0 ? void 0 : template.properties) || []).find(
(property) => property.name === 'source' && property.type === _propertyTypes.propertyTypes.select);


const extractSource = async (
template,
evidence) =>
{
  const sourceProperty = await getSourceThesauriId(template);

  if (!sourceProperty) {
    return {};
  }

  const { hostname } = new URL(evidence.attributes.url);
  let valueId = await thesauriValueId(sourceProperty.content || '', hostname);
  const contentThesauri = await _thesauri.default.getById(sourceProperty.content);

  if (!valueId && contentThesauri) {
    valueId = (0, _utils.newThesauriId)();
    await _dictionariesModel.default.db.updateOne(
    { _id: sourceProperty.content },
    // @ts-ignore
    { $push: { values: { label: hostname, _id: new _mongodb.ObjectId(), id: valueId } } });

  }

  return valueId ? { source: [{ value: valueId }] } : {};
};

const extractURL = async (
template,
evidence) =>
{
  const hasURLProperty = ((template === null || template === void 0 ? void 0 : template.properties) || []).find(
  (property) => property.name === 'url' && property.type === _propertyTypes.propertyTypes.link);


  return hasURLProperty ? { url: [{ value: { label: '', url: evidence.attributes.url } }] } : {};
};

const extractDate = async (
template,
evidence) =>
{
  const hasDateProperty = ((template === null || template === void 0 ? void 0 : template.properties) || []).find(
  (property) => property.name === 'preservation_date' && property.type === _propertyTypes.propertyTypes.date);


  return hasDateProperty ?
  {
    preservation_date: [{ value: Date.parse(evidence.attributes.date) / 1000 }] } :

  {};
};

const saveEvidence =
(config, host) =>
async (previous, evidence) => {
  await previous;

  try {
    const template = await _templates.default.getById(config.template);
    const user = await _users.default.getById(config.user);

    if (user) {
      _AppContext.appContext.set('user', user);
    }

    const { sharedId } = await _entities.default.save(
    {
      title: evidence.attributes.title,
      template: config.template,
      metadata: _objectSpread(_objectSpread(_objectSpread({},
      await extractURL(template, evidence)),
      await extractSource(template, evidence)),
      await extractDate(template, evidence)) },


    { language: 'en', user: user || {} });

    await Promise.all(
    evidence.attributes.downloads.map(async (download) => {
      const fileName = (0, _files.generateFileName)({ originalname: _path.default.basename(download.path) });
      const fileStream = (
      await fetch(new URL(_path.default.join(host, download.path)).toString(), {
        headers: { Authorization: config.token } })).

      body;
      if (fileStream) {
        await _files.storage.storeFile(fileName, fileStream, 'attachment');

        await _files.files.save({
          entity: sharedId,
          type: 'attachment',
          filename: fileName,
          originalname: _path.default.basename(download.path) });

      }
    }));

  } catch (error) {
    _log.errorLog.error(error);
  }
};

const preserveSync = {
  async syncAllTenants() {
    return Object.keys(_tenants.tenants.tenants).reduce(async (previous, tenantName) => {
      await previous;
      return _tenants.tenants.run(async () => {
        const { features } = await _settings.default.get({}, 'features.preserve');
        if (features !== null && features !== void 0 && features.preserve) {
          await this.sync(features.preserve);
        }
      }, tenantName);
    }, Promise.resolve());
  },

  async sync(preserveConfig) {
    // eslint-disable-next-line no-restricted-syntax
    await preserveConfig.config.reduce(async (promise, config) => {
      await promise;
      const preservationSync = await _preserveSyncModel.preserveSyncModel.db.findOne({ token: config.token }, {});

      const queryString = _qs.default.stringify({
        filter: _objectSpread({
          status: 'PROCESSED' },
        preservationSync ? { date: { gt: preservationSync.lastImport } } : {}) });



      const evidences = await _JSONRequest.default.get(
      `${preserveConfig.host}/api/evidences?${queryString}`,
      {},
      {
        Authorization: config.token });



      await evidences.json.data.reduce(
      saveEvidence(config, preserveConfig.host),
      Promise.resolve());


      if (evidences.json.data.length) {
        await _preserveSyncModel.preserveSyncModel.save(_objectSpread(_objectSpread({},
        preservationSync ? { _id: preservationSync._id } : {}), {}, {
          lastImport: evidences.json.data[evidences.json.data.length - 1].attributes.date,
          token: config.token }));

      }
    }, Promise.resolve());
  } };exports.preserveSync = preserveSync;