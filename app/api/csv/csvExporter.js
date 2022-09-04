"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.translateCommonHeaders = exports.processHeaders = exports.processGeolocationField = exports.processEntity = exports.processCommonField = exports.prependCommonHeaders = exports.getTypes = exports.getTemplatesModels = exports.default = exports.concatCommonHeaders = void 0;
var _events = require("events");
var csv = _interopRequireWildcard(require("@fast-csv/format"));
var _templates = _interopRequireDefault(require("../templates"));


var _translate = _interopRequireWildcard(require("../../shared/translate"));
var _translations2 = _interopRequireDefault(require("../i18n/translations"));
var _typeFormatters = require("./typeFormatters");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








































const getTypes = (searchResults, typesWhitelist = []) =>
typesWhitelist.length ?
typesWhitelist :
searchResults.aggregations.all.
_types.buckets.filter((bucket) => bucket.filtered.doc_count > 0).
map((bucket) => bucket.key);exports.getTypes = getTypes;

const hasValue = (value) => value !== 'missing';

const getTemplatesModels = async (templateIds) =>
Promise.all(templateIds.filter(hasValue).map(async (id) => _templates.default.getById(id))).then(
(results) =>
results.reduce(
(memo, template) => template ? _objectSpread(_objectSpread({}, memo), {}, { [template._id]: template }) : memo,
{}));exports.getTemplatesModels = getTemplatesModels;



const notDuplicated = (collection) => (item) =>
collection.findIndex((i) => Object.keys(i).every((key) => i[key] === item[key])) < 0;

const excludedProperties = (property) =>
!['geolocation', 'preview', 'nested'].includes(property.type);

const processHeaders = (templatesCache) =>
Object.values(templatesCache).reduce(
(memo, template) =>
memo.concat(
template.properties.
filter(excludedProperties).
map((property) => ({ label: property.label, name: property.name })).
filter(notDuplicated(memo))),

[]);exports.processHeaders = processHeaders;


const prependCommonHeaders = (headers) =>
[
{
  label: 'Title',
  name: 'title',
  common: true },

{
  label: 'Date added',
  name: 'creationDate',
  common: true },

{
  label: 'Template',
  name: 'template',
  common: true }].

concat(headers);exports.prependCommonHeaders = prependCommonHeaders;

const concatCommonHeaders = (headers) =>
headers.concat([
{ label: 'Geolocation', name: 'geolocation', common: true },
{ label: 'Documents', name: 'documents', common: true },
{ label: 'Attachments', name: 'attachments', common: true },
{ label: 'Published', name: 'published', common: true }]);exports.concatCommonHeaders = concatCommonHeaders;


const processGeolocationField = (row, rowTemplate) => {var _rowTemplate$properti;
  const geolocationField = (_rowTemplate$properti = rowTemplate.properties) === null || _rowTemplate$properti === void 0 ? void 0 : _rowTemplate$properti.find(
  (property) => property.type === 'geolocation');


  if (geolocationField && geolocationField.name && row.metadata[geolocationField.name]) {
    return _typeFormatters.formatters.geolocation(row.metadata[geolocationField.name], {});
  }

  return '';
};exports.processGeolocationField = processGeolocationField;

const processCommonField = (
headerName,
row,
rowTemplate,
options) =>
{
  switch (headerName) {
    case 'title':
      return row.title;
    case 'template':
      return rowTemplate.name;
    case 'creationDate':
      return (0, _typeFormatters.formatCreationDate)(row, options);
    case 'geolocation':
      return processGeolocationField(row, rowTemplate);
    case 'documents':
      return (0, _typeFormatters.formatDocuments)(row);
    case 'attachments':
      return (0, _typeFormatters.formatAttachments)(row);
    case 'published':
      return row.published ? 'Published' : 'Unpublished';
    default:
      return '';}

};exports.processCommonField = processCommonField;

const translateCommonHeaders = async (headers, language) => {
  const _translations = await _translations2.default.get();
  const locale = (0, _translate.getLocaleTranslation)(_translations, language);
  const context = (0, _translate.getContext)(locale, 'System');
  return headers.map((header) => {
    if (!header.common) {
      return header;
    }

    return _objectSpread(_objectSpread({}, header), {}, { label: (0, _translate.default)(context, header.label, header.label) });
  });
};exports.translateCommonHeaders = translateCommonHeaders;

const processEntity = (
row,
headers,
templatesCache,
options) =>
{
  if (!row.template) {
    throw new Error('Entity missing template');
  }

  const rowTemplate = templatesCache[row.template.toString()];

  if (!rowTemplate) {
    throw new Error('Entity missing template');
  }

  return headers.map((header) => {var _row$metadata, _rowTemplate$properti2;
    if (header.common) {
      return processCommonField(header.name, row, rowTemplate, options);
    }

    if (!((_row$metadata = row.metadata) !== null && _row$metadata !== void 0 && _row$metadata[header.name])) {
      return '';
    }

    const templateProperty = rowTemplate === null || rowTemplate === void 0 ? void 0 : (_rowTemplate$properti2 = rowTemplate.properties) === null || _rowTemplate$properti2 === void 0 ? void 0 : _rowTemplate$properti2.find(
    (property) => property.name === header.name);


    if (!templateProperty || !excludedProperties(templateProperty)) {
      return '';
    }

    const formatter = _typeFormatters.formatters[templateProperty.type] || _typeFormatters.formatters.default;
    return formatter(row.metadata[header.name] || [], options);
  });
};exports.processEntity = processEntity;

class CSVExporter extends _events.EventEmitter {
  async export(
  searchResults,
  writeStream,
  types = [],
  options = { dateFormat: 'YYYY-MM-DD', language: 'en' })
  {
    const csvStream = csv.format({ headers: false });

    csvStream.pipe(writeStream).on('finish', writeStream.end);

    const templatesCache = await getTemplatesModels(getTypes(searchResults, types));
    let headers = prependCommonHeaders(concatCommonHeaders(processHeaders(templatesCache)));
    headers = await translateCommonHeaders(headers, options.language);

    return new Promise((resolve) => {
      csvStream.write(headers.map((h) => h.label));

      searchResults.rows.forEach((row) => {
        csvStream.write(processEntity(row, headers, templatesCache, options));
        this.emit('entityProcessed');
      });

      csvStream.end();
      writeStream.on('finish', resolve);
    });
  }}exports.default = CSVExporter;