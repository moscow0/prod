"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _joi = _interopRequireDefault(require("joi"));
var _entities = _interopRequireDefault(require("../entities"));
var _searchParams = require("../../shared/types/searchParams");
var _search = require("./search");
var _utils = require("../utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

(app) => {
  app.get(
  '/api/search/count_by_template',
  _utils.validation.validateRequest(
  _joi.default.object().
  keys({
    templateId: _joi.default.string().required() }).

  required(),
  'query'),

  (req, res, next) =>
  _entities.default.
  countByTemplate(req.query.templateId).
  then((results) => res.json(results)).
  catch(next));


  app.get(
  '/api/search',
  _utils.parseQuery,
  _utils.validation.validateRequest(_searchParams.searchParamsSchema),

  (req, res, next) => {
    const action = req.query.geolocation ? 'searchGeolocations' : 'search';

    return _search.search[action](req.query, req.language, req.user).
    then((results) => res.json(results)).
    catch(next);
  });


  app.get(
  '/api/search_snippets',
  _utils.validation.validateRequest(
  {
    type: 'object',
    required: ['query'],
    properties: {
      query: {
        type: 'object',
        required: ['id'],
        properties: {
          searchTerm: { type: 'string', default: '' },
          id: { type: 'string' } } } } },




  'query'),

  (req, res, next) =>
  _search.search.
  searchSnippets(req.query.searchTerm, req.query.id, req.language, req.user).
  then((results) => res.json(results)).
  catch(next));

};exports.default = _default;