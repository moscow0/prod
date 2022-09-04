"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _settings = _interopRequireDefault(require("../settings"));
var _entitiesIndex = require("../search/entitiesIndex");
var _search = require("../search");
var _utils = require("../utils");
var _authMiddleware = _interopRequireDefault(require("../auth/authMiddleware"));
var _templates = _interopRequireDefault(require("./templates"));const _excluded = ["reindex"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

const reindexAllTemplates = async () => {
  const allTemplates = await _templates.default.get();
  return (0, _entitiesIndex.reindexAll)(allTemplates, _search.search);
};

const handleMappingConflict = async (callback) => {
  try {
    return await callback();
  } catch (e) {var _e$meta, _e$meta$body, _e$meta$body$error, _e$meta$body$error$re;
    if ((_e$meta = e.meta) !== null && _e$meta !== void 0 && (_e$meta$body = _e$meta.body) !== null && _e$meta$body !== void 0 && (_e$meta$body$error = _e$meta$body.error) !== null && _e$meta$body$error !== void 0 && (_e$meta$body$error$re = _e$meta$body$error.reason) !== null && _e$meta$body$error$re !== void 0 && _e$meta$body$error$re.match(/mapp[ing|er]/)) {
      throw (0, _utils.createError)('mapping conflict', 409);
    }
    throw e;
  }
};var _default =

(app) => {
  app.post('/api/templates', (0, _authMiddleware.default)(), async (req, res, next) => {
    try {
      const _req$body = req.body,{ reindex: fullReindex } = _req$body,template = _objectWithoutProperties(_req$body, _excluded);

      const response = await handleMappingConflict(async () =>
      _templates.default.save(template, req.language, !fullReindex));


      req.sockets.emitToCurrentTenant('templateChange', response);

      const updatedSettings = await _settings.default.updateFilterName(
      response._id.toString(),
      response.name);


      if (updatedSettings) req.sockets.emitToCurrentTenant('updateSettings', updatedSettings);

      if (fullReindex) await reindexAllTemplates();

      res.json(response);
    } catch (error) {
      next(error);
    }
  });

  app.post(
  '/api/templates/setasdefault',
  (0, _authMiddleware.default)(),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        required: ['_id'],
        properties: {
          _id: { type: 'string' } } } } }),




  async (req, res, next) => {
    try {
      const [newDefault, oldDefault] = await _templates.default.setAsDefault(req.body._id.toString());
      req.sockets.emitToCurrentTenant('templateChange', newDefault);
      if (oldDefault) {
        req.sockets.emitToCurrentTenant('templateChange', oldDefault);
      }
      res.json(newDefault);
    } catch (err) {
      next(err);
    }
  });


  app.get('/api/templates', (_req, res, next) => {
    _templates.default.
    get().
    then((response) => res.json({ rows: response })).
    catch(next);
  });

  app.delete(
  '/api/templates',
  (0, _authMiddleware.default)(),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        required: ['_id'],
        properties: {
          _id: { type: 'string' } } } } }),




  (req, res, next) => {
    const template = { _id: req.query._id, name: req.query.name };
    _templates.default.
    delete(template).
    then(async () => _settings.default.removeTemplateFromFilters(template._id)).
    then((newSettings) => {
      res.json(template);
      req.sockets.emitToCurrentTenant('updateSettings', newSettings);
      req.sockets.emitToCurrentTenant('templateDelete', template);
    }).
    catch(next);
  });


  app.get(
  '/api/templates/count_by_thesauri',
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        required: ['_id'],
        properties: {
          _id: { type: 'string' } } } } }),




  (req, res, next) => {
    _templates.default.
    countByThesauri(req.query._id).
    then((response) => res.json(response)).
    catch(next);
  });

};exports.default = _default;