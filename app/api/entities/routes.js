"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _search = require("../search");
var _files = require("../files");
var _entitySavingManager = require("./entitySavingManager");
var _entities2 = _interopRequireDefault(require("./entities"));
var _templates = _interopRequireDefault(require("../templates/templates"));
var _thesauri = _interopRequireDefault(require("../thesauri/thesauri"));
var _date = _interopRequireDefault(require("../utils/date"));
var _authMiddleware = _interopRequireDefault(require("../auth/authMiddleware"));
var _utils = require("../utils");const _excluded = ["omitRelationships", "include"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

_joi.default.objectId = (0, _joiObjectid.default)(_joi.default);

async function updateThesauriWithEntity(entity, req) {
  const template = await _templates.default.getById(entity.template);
  const templateTransformed = await _thesauri.default.templateToThesauri(
  template,
  req.language,
  req.user,
  await _search.search.countPerTemplate(req.language));

  req.sockets.emitToCurrentTenant('thesauriChange', templateTransformed);
}

function coerceValues(value, type, locale) {
  let dateSeconds = '';
  switch (type) {
    case 'date':
      dateSeconds = _date.default.dateToSeconds(value, locale);
      if (Number.isNaN(dateSeconds)) {
        return { success: false };
      }
      return { success: true, value: dateSeconds };
    default:
      throw Error('Unsupported type');}

}var _default =

(app) => {
  app.post(
  '/api/entities/coerce_value',
  (0, _authMiddleware.default)(['admin']),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          value: { type: 'string' },
          type: { type: 'string' },
          locale: { type: 'string' } } } } }),




  async (req, res, next) => {
    const { value, type, locale } = req.body;
    try {
      const coerced = coerceValues(value, type, locale);
      return res.json(coerced);
    } catch (e) {
      return next(e);
    }
  });

  app.post(
  '/api/entities',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  _files.uploadMiddleware.multiple(),
  async (req, res, next) => {
    try {
      const entityToSave = req.body.entity ? JSON.parse(req.body.entity) : req.body;
      const result = await (0, _entitySavingManager.saveEntity)(entityToSave, {
        user: req.user,
        language: req.language,
        socketEmiter: req.emitToSessionSocket,
        files: req.files });

      const { entity } = result;
      await updateThesauriWithEntity(entity, req);
      return res.json(req.body.entity ? result : entity);
    } catch (e) {
      return next(e);
    }
  });


  app.post('/api/entity_denormalize', (0, _authMiddleware.default)(['admin', 'editor']), (req, res, next) =>
  _entities2.default.
  denormalize(req.body, { user: req.user, language: req.language }).
  then((response) => {
    res.json(response);
  }).
  catch(next));


  app.post(
  '/api/entities/multipleupdate',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  (req, res, next) =>
  _entities2.default.
  multipleUpdate(req.body.ids, req.body.values, { user: req.user, language: req.language }).
  then((docs) => {
    res.json(docs);
  }).
  catch(next));


  app.get(
  '/api/entities/count_by_template',
  _utils.validation.validateRequest(
  _joi.default.object().
  keys({
    templateId: _joi.default.objectId().required() }).

  required(),
  'query'),

  (req, res, next) =>
  _entities2.default.
  countByTemplate(req.query.templateId).
  then((response) => res.json(response)).
  catch(next));


  app.get(
  '/api/entities/get_raw_page',
  _utils.validation.validateRequest(
  _joi.default.object().
  keys({
    sharedId: _joi.default.string().required(),
    pageNumber: _joi.default.number().required() }).

  required(),
  'query'),

  (req, res, next) =>
  _entities2.default.
  getRawPage(req.query.sharedId, req.language, req.query.pageNumber).
  then((data) => res.json({ data })).
  catch(next));


  app.get(
  '/api/entities',
  _utils.parseQuery,
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        properties: {
          sharedId: { type: 'string' },
          _id: { type: 'string' },
          withPdf: { type: 'string' },
          omitRelationships: { type: 'boolean' },
          include: { type: 'array', items: { type: 'string', enum: ['permissions'] } } } } } }),




  (req, res, next) => {
    const _req$query = req.query,{ omitRelationships, include = [] } = _req$query,query = _objectWithoutProperties(_req$query, _excluded);
    const action = omitRelationships ? 'get' : 'getWithRelationships';
    const published = req.user ? {} : { published: true };
    const language = req.language ? { language: req.language } : {};
    _entities2.default[action](_objectSpread(_objectSpread(_objectSpread({},
    query), published), language),
    include.map((field) => `+${field}`).join(' '),
    {
      limit: 1 }).


    then((_entities) => {
      if (!_entities.length) {
        res.status(404);
        res.json({ rows: [] });
        return;
      }
      if (!req.user && _entities[0].relationships) {
        const entity = _entities[0];
        entity.relationships = entity.relationships.filter((rel) => rel.entityData.published);
      }
      res.json({ rows: _entities });
    }).
    catch(next);
  });


  app.delete(
  '/api/entities',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  _utils.validation.validateRequest(
  _joi.default.object().
  keys({
    sharedId: _joi.default.string().required() }).

  required(),
  'query'),

  (req, res, next) => {
    _entities2.default.
    delete(req.query.sharedId).
    then((response) => res.json(response)).
    catch(next);
  });


  app.post(
  '/api/entities/bulkdelete',
  (0, _authMiddleware.default)(['admin', 'editor']),
  _utils.validation.validateRequest(
  _joi.default.object().
  keys({
    sharedIds: _joi.default.array().items(_joi.default.string()).required() }).

  required(),
  'body'),

  (req, res, next) => {
    _entities2.default.
    deleteMultiple(req.body.sharedIds).
    then(() => res.json('ok')).
    catch(next);
  });

};exports.default = _default;