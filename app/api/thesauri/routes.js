"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.routes = exports.default = void 0;var _joi = _interopRequireDefault(require("joi"));
var _csv = require("../csv");
var _files = require("../files");

var _utils = require("../utils");
var _authMiddleware = _interopRequireDefault(require("../auth/authMiddleware"));
var _thesauri = _interopRequireDefault(require("./thesauri"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const routes = (app) => {
  app.post(
  '/api/thesauris',
  (0, _authMiddleware.default)(),

  (0, _files.uploadMiddleware)(),

  _utils.validation.validateRequest(
  _joi.default.alternatives(
  _joi.default.object().
  keys({
    _id: _joi.default.string(),
    __v: _joi.default.number(),
    name: _joi.default.string().required(),
    enable_classification: _joi.default.boolean(),
    values: _joi.default.array().
    items(
    _joi.default.object().keys({
      id: _joi.default.string(),
      label: _joi.default.string().required(),
      _id: _joi.default.string(),
      values: _joi.default.array() })).


    required() }).

  required(),
  _joi.default.object().
  keys({
    thesauri: _joi.default.string().required() }).

  required()).
  required()),


  async (req, res, next) => {
    try {
      const data = req.file ? JSON.parse(req.body.thesauri) : req.body;
      let response = await _thesauri.default.save(data);
      if (req.file) {
        const loader = new _csv.CSVLoader();
        response = await loader.loadThesauri(req.file.path, response._id, {
          language: req.language });

      }
      res.json(response);
      req.sockets.emitToCurrentTenant('thesauriChange', response);
    } catch (e) {
      next(e);
    }
  });


  app.get(
  '/api/thesauris',
  _utils.validation.validateRequest(
  _joi.default.object().keys({
    _id: _joi.default.string() }),

  'query'),

  (req, res, next) => {
    let id;
    if (req.query) {
      id = req.query._id;
    }
    _thesauri.default.
    get(id, req.language, req.user).
    then((response) => res.json({ rows: response })).
    catch(next);
  });


  app.get(
  '/api/dictionaries',
  _utils.validation.validateRequest(
  _joi.default.object().keys({
    _id: _joi.default.string() }),

  'query'),

  (req, res, next) => {
    let id;
    if (req.query && req.query._id) {
      id = { _id: req.query._id };
    }
    _thesauri.default.
    dictionaries(id).
    then((response) => res.json({ rows: response })).
    catch(next);
  });


  app.delete(
  '/api/thesauris',
  (0, _authMiddleware.default)(),
  _utils.validation.validateRequest(
  _joi.default.object().
  keys({
    _id: _joi.default.string().required(),
    _rev: _joi.default.any() }).

  required(),
  'query'),

  (req, res, next) => {
    _thesauri.default.
    delete(req.query._id, req.query._rev).
    then((response) => {
      res.json(response);
      req.sockets.emitToCurrentTenant('thesauriDelete', response);
    }).
    catch(next);
  });

};exports.routes = routes;var _default =

routes;exports.default = _default;