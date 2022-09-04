"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _joi = _interopRequireDefault(require("joi"));
var _utils = require("../utils");
var _settings = _interopRequireDefault(require("../settings"));
var _entities = _interopRequireDefault(require("../entities"));
var _pages = _interopRequireDefault(require("../pages"));
var _csv = require("../csv");
var _files = require("../files");
var _commonSchemas = require("../../shared/types/commonSchemas");
var _languagesList = require("../../shared/languagesList");
var _authMiddleware = _interopRequireDefault(require("../auth/authMiddleware"));
var _translations = _interopRequireDefault(require("./translations"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

(app) => {
  app.get('/api/translations', (_req, res, next) => {
    _translations.default.
    get().
    then((response) => res.json({ rows: response })).
    catch(next);
  });

  app.get('/api/languages', (_req, res, _next) => {
    res.json(_languagesList.availableLanguages);
  });

  app.post(
  '/api/translations/import',
  (0, _authMiddleware.default)(),
  (0, _files.uploadMiddleware)(),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          context: { type: 'string' } },

        required: ['context'] } } }),




  async (req, res, next) => {
    try {
      const { context } = req.body;
      const loader = new _csv.CSVLoader();
      const response = await loader.loadTranslations(req.file.path, context);
      response.forEach((translation) => {
        req.sockets.emitToCurrentTenant('translationsChange', translation);
      });
      res.json(response);
    } catch (e) {
      next(e);
    }
  });


  app.post(
  '/api/translations',
  (0, _authMiddleware.default)(),
  _utils.validation.validateRequest(
  _joi.default.object().
  keys({
    _id: _joi.default.objectId(),
    __v: _joi.default.number(),
    locale: _joi.default.string().required(),
    contexts: _joi.default.array().
    required().
    items(
    _joi.default.object().keys({
      _id: _joi.default.string(),
      id: _joi.default.string(),
      label: _joi.default.string(),
      type: _joi.default.string(),
      values: _joi.default.object().pattern(_joi.default.string(), _joi.default.string()) })) }).



  required()),


  (req, res, next) => {
    _translations.default.
    save(req.body).
    then((response) => {
      response.contexts = _translations.default.prepareContexts(response.contexts);
      req.sockets.emitToCurrentTenant('translationsChange', response);
      res.json(response);
    }).
    catch(next);
  });


  app.post(
  '/api/translations/setasdeafult',
  (0, _authMiddleware.default)(),
  _utils.validation.validateRequest(
  _joi.default.object().
  keys({
    key: _joi.default.string() }).

  required()),


  (req, res, next) => {
    _settings.default.
    setDefaultLanguage(req.body.key).
    then((response) => {
      req.sockets.emitToCurrentTenant('updateSettings', response);
      res.json(response);
    }).
    catch(next);
  });


  app.post(
  '/api/translations/languages',
  (0, _authMiddleware.default)(),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: _commonSchemas.languageSchema } }),



  async (req, res, next) => {
    try {
      const newSettings = await _settings.default.addLanguage(req.body);
      const newTranslations = await _translations.default.addLanguage(req.body.key);
      await _entities.default.addLanguage(req.body.key);
      await _pages.default.addLanguage(req.body.key);

      req.sockets.emitToCurrentTenant('updateSettings', newSettings);
      req.sockets.emitToCurrentTenant('translationsChange', newTranslations);
      res.json(newSettings);
    } catch (e) {
      next(e);
    }
  });


  app.delete(
  '/api/translations/languages',
  (0, _authMiddleware.default)(),
  _utils.validation.validateRequest(
  _joi.default.object().
  keys({
    key: _joi.default.string() }).

  required()),


  (req, res, next) => {
    Promise.all([
    _settings.default.deleteLanguage(req.query.key),
    _translations.default.removeLanguage(req.query.key),
    _entities.default.removeLanguage(req.query.key),
    _pages.default.removeLanguage(req.query.key)]).

    then(([newSettings, newTranslations]) => {
      req.sockets.emitToCurrentTenant('updateSettings', newSettings);
      req.sockets.emitToCurrentTenant('translationsChange', newTranslations);
      res.json(newSettings);
    }).
    catch(next);
  });

};exports.default = _default;