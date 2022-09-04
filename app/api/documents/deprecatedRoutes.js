"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _commonSchemas = require("../../shared/types/commonSchemas");
var _utils = require("../utils");
var _documents = _interopRequireDefault(require("./documents"));
var _authMiddleware = _interopRequireDefault(require("../auth/authMiddleware"));
var _templates = _interopRequireDefault(require("../templates"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

(app) => {
  app.post('/api/documents', (0, _authMiddleware.default)(['admin', 'editor']), (req, res, next) =>
  _documents.default.
  save(req.body, { user: req.user, language: req.language }).
  then((doc) => res.json(doc)).
  catch(next));


  app.get(
  '/api/documents/count_by_template',
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        required: ['templateId'],
        additionalProperties: false,
        properties: {
          templateId: _commonSchemas.objectIdSchema } } } }),




  (req, res, next) =>
  _templates.default.
  countByTemplate(req.query.templateId).
  then((results) => res.json(results)).
  catch(next));


  app.get(
  '/api/documents',
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        additionalProperties: false,
        properties: {
          _id: _commonSchemas.objectIdSchema },

        required: ['_id'] } } }),



  (req, res, next) => {
    let id;

    if (req.query && req.query._id) {
      id = req.query._id;
    }

    _documents.default.
    getById(id, req.language).
    then((response) => {
      if (!response) {
        res.json({}, 404);
        return;
      }
      res.json({ rows: [response] });
    }).
    catch(next);
  });


  app.delete(
  '/api/documents',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        additionalProperties: false,
        properties: {
          sharedId: _commonSchemas.objectIdSchema },

        required: ['sharedId'] } } }),



  (req, res, next) => {
    _documents.default.
    delete(req.query.sharedId).
    then((response) => res.json(response)).
    catch(next);
  });

};exports.default = _default;