"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.translateEntity = exports.importEntity = void 0;
var _fs = require("fs");
var _entities = _interopRequireDefault(require("../entities"));
var _search = require("../search");
var _entitiesModel = _interopRequireDefault(require("../entities/entitiesModel"));
var _processDocument = require("../files/processDocument");



var _propertyTypes = require("../../shared/propertyTypes");


var _tsUtils = require("../../shared/tsUtils");
var _files = require("../files");
var _IDGenerator = require("../../shared/IDGenerator");

var _typeParsers = _interopRequireDefault(require("./typeParsers"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const parse = async (toImportEntity, prop, dateFormat) =>
_typeParsers.default[prop.type] ?
_typeParsers.default[prop.type](toImportEntity, prop, dateFormat) :
_typeParsers.default.text(toImportEntity, prop);

const hasValidValue = (prop, toImportEntity) =>
prop.name ? toImportEntity[prop.name] || prop.type === _propertyTypes.propertyTypes.generatedid : false;

const toMetadata = async (
template,
toImportEntity,
dateFormat) =>

(template.properties || []).
filter((prop) => hasValidValue(prop, toImportEntity)).
reduce(
async (meta, prop) => _objectSpread(_objectSpread({},

await meta), {}, {
  [(0, _tsUtils.ensure)(prop.name)]: await parse(toImportEntity, prop, dateFormat) }),

Promise.resolve({}));


const currentEntityIdentifiers = async (sharedId, language) =>
sharedId ? _entities.default.get({ sharedId, language }, '_id sharedId').then(([e]) => e) : {};

const titleByTemplate = (template, entity) => {var _template$commonPrope;
  const generatedTitle =
  !entity.title && ((_template$commonPrope =
  template.commonProperties) === null || _template$commonPrope === void 0 ? void 0 : _template$commonPrope.find((property) => property.name === 'title' && property.generatedId));
  if (generatedTitle) {
    return (0, _IDGenerator.generateID)(3, 4, 4);
  }
  return entity.title;
};

const entityObject = async (
toImportEntity,
template,
{ language, dateFormat = 'YYYY/MM/DD' }) => _objectSpread({

  title: titleByTemplate(template, toImportEntity),
  template: template._id,
  metadata: await toMetadata(template, toImportEntity, dateFormat) },
await currentEntityIdentifiers(toImportEntity.id, language));








const importEntity = async (
toImportEntity,
template,
importFile,
{ user = {}, language, dateFormat }) =>
{
  const { attachments } = toImportEntity;
  delete toImportEntity.attachments;
  const eo = await entityObject(toImportEntity, template, { language, dateFormat });
  const entity = await _entities.default.save(
  eo,
  { user, language },
  { updateRelationships: true, index: false });


  if (toImportEntity.file && entity.sharedId) {
    const file = await importFile.extractFile(toImportEntity.file);
    await (0, _processDocument.processDocument)(entity.sharedId, file);
    await _files.storage.storeFile(file.filename, (0, _fs.createReadStream)(file.path), 'document');
  }

  if (attachments && entity.sharedId) {
    await attachments.split('|').reduce(async (promise, attachment) => {
      await promise;
      const attachmentFile = await importFile.extractFile(attachment);
      await _files.storage.storeFile(
      attachmentFile.filename,
      (0, _fs.createReadStream)(attachmentFile.path),
      'attachment');

      return _files.files.save(_objectSpread(_objectSpread({}, attachmentFile), {}, { entity: entity.sharedId, type: 'attachment' }));
    }, Promise.resolve());
  }

  await _search.search.indexEntities({ sharedId: entity.sharedId }, '+fullText');
  return entity;
};exports.importEntity = importEntity;

const translateEntity = async (
entity,
translations,
template,
importFile) =>
{
  await _entitiesModel.default.saveMultiple(
  await Promise.all(
  translations.map(async (translatedEntity) =>
  entityObject(_objectSpread(_objectSpread({}, translatedEntity), {}, { id: (0, _tsUtils.ensure)(entity.sharedId) }), template, {
    language: translatedEntity.language }))));





  await Promise.all(
  translations.map(async (translatedEntity) => {
    if (translatedEntity.file) {
      const file = await importFile.extractFile(translatedEntity.file);
      await (0, _processDocument.processDocument)((0, _tsUtils.ensure)(entity.sharedId), file);
    }
  }));


  await _search.search.indexEntities({ sharedId: entity.sharedId }, '+fullText');
};exports.translateEntity = translateEntity;