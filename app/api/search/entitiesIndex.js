"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.updateMapping = exports.reindexAll = exports.indexEntities = exports.bulkIndex = exports.IndexError = void 0;var _detectLanguage = require("../../shared/detectLanguage");
var _languagesList = require("../../shared/languagesList");
var _entities = _interopRequireDefault(require("../entities"));
var _log = require("../log");
var _entityDefaultDocument = require("../../shared/entityDefaultDocument");
var _promisePool = _interopRequireDefault(require("@supercharge/promise-pool"));
var _elastic = require("./elastic");
var _elasticMapFactory = _interopRequireDefault(require("../../../database/elastic_mapping/elasticMapFactory"));
var _elastic_mapping = _interopRequireDefault(require("../../../database/elastic_mapping/elastic_mapping"));const _excluded = ["_id"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class IndexError extends Error {}exports.IndexError = IndexError;

const handleErrors = (itemsWithErrors, { logError = false } = {}) => {
  if (itemsWithErrors.length === 0) return;
  if (logError) {
    _log.errorLog.error(
    `ERROR! Failed to index documents.\r\n${JSON.stringify(itemsWithErrors, null, ' ')}\r\n`);

  }

  const error = new IndexError('ERROR! Failed to index documents.');
  error.errors = itemsWithErrors;
  throw error;
};

function setFullTextSettings(defaultDocument, id, body, doc) {
  const fullText = Object.values(defaultDocument.fullText).join('\f');

  let language;
  if (!defaultDocument.language) {
    language = (0, _detectLanguage.detectLanguage)(fullText);
  }
  if (defaultDocument.language) {
    language = (0, _languagesList.language)(defaultDocument.language);
  }
  const fullTextObject = {
    [`fullText_${language}`]: fullText,
    fullText: { name: 'fullText', parent: id } };

  body.push(fullTextObject);
  delete doc.fullText;
}

const bulkIndex = async (docs, _action = 'index') => {
  const body = [];
  // eslint-disable-next-line max-statements
  docs.forEach((doc) => {
    let docBody = _objectSpread({ documents: [] }, doc);
    docBody.fullText = 'entity';
    const id = doc._id.toString();
    ['_id', '_rev'].forEach((e) => delete docBody[e]);
    const action = {};
    action[_action] = { _id: id };
    if (_action === 'update') {
      docBody = { doc: docBody };
    }

    const defaultDocument = _objectSpread({}, (0, _entityDefaultDocument.entityDefaultDocument)(doc.documents, doc.language, 'en') || {});

    docBody.documents.forEach((document) => {
      delete document.fullText;
    });

    body.push(action);
    body.push(docBody);

    if (defaultDocument.fullText) {
      body.push({
        [_action]: { _id: `${id}_fullText`, routing: id } });

      setFullTextSettings(defaultDocument, id, body, doc);
    }
  });

  const results = await _elastic.elastic.bulk({ body });
  if (results.body.items) {
    handleErrors(results.body.items.filter((f) => f.index.error));
  }

  return results;
};exports.bulkIndex = bulkIndex;

const getEntitiesToIndex = async (query, stepBach, limit, select) => {
  const thisQuery = _objectSpread({}, query);
  thisQuery._id = { $in: stepBach };
  return _entities.default.getUnrestrictedWithDocuments(thisQuery, '+permissions', {
    limit,
    documentsFullText: select && select.includes('+fullText') });

};

const bulkIndexAndCallback = async (assets) => {
  const { searchInstance, entitiesToIndex, batchCallback, totalRows } = assets;
  await searchInstance.bulkIndex(entitiesToIndex, 'index');
  return batchCallback(entitiesToIndex.length, totalRows);
};

const getSteps = async (query, limit) => {
  const allIds = await _entities.default.getWithoutDocuments(query, '_id');
  return [...Array(Math.ceil(allIds.length / limit))].map((_v, i) =>
  allIds.slice(i * limit, (i + 1) * limit));

};

/*eslint max-statements: ["error", 20]*/
const indexBatch = async (totalRows, options) => {
  const { query, select, limit, batchCallback, searchInstance } = options;
  const steps = await getSteps(query, limit);

  const { _id: remove } = query,queryToIndex = _objectWithoutProperties(query, _excluded);

  const promisePool = new _promisePool.default();
  const { errors: indexingErrors } = await promisePool.
  for(steps).
  withConcurrency(10).
  process(async (stepBatch) => {
    const entitiesToIndex = await getEntitiesToIndex(queryToIndex, stepBatch, limit, select);
    if (entitiesToIndex.length > 0) {
      await bulkIndexAndCallback({
        searchInstance,
        entitiesToIndex,
        batchCallback,
        totalRows });

    }
  });

  let returnErrors = indexingErrors;
  if (indexingErrors.length > 0 && indexingErrors[0].errors) {
    returnErrors = indexingErrors[0].errors;
  }

  return returnErrors.length > 0 ?
  handleErrors(returnErrors, { logError: true }) :
  Promise.resolve();
};

const indexEntities = async ({
  query,
  select = '',
  limit = 50,
  batchCallback = () => {},
  searchInstance }) =>
{
  const totalRows = await _entities.default.count(query);
  return indexBatch(totalRows, {
    query,
    select,
    limit,
    batchCallback,
    searchInstance });

};exports.indexEntities = indexEntities;

const updateMapping = async (tmpls) => {
  const mapping = _elasticMapFactory.default.mapping(tmpls);
  await _elastic.elastic.indices.putMapping({ body: mapping });
};exports.updateMapping = updateMapping;

const reindexAll = async (tmpls, searchInstance) => {
  await _elastic.elastic.indices.delete();
  await _elastic.elastic.indices.create({ body: _elastic_mapping.default });
  await updateMapping(tmpls);
  return indexEntities({ query: {}, searchInstance });
};exports.reindexAll = reindexAll;