"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _joi = _interopRequireDefault(require("joi"));

var _authMiddleware = _interopRequireDefault(require("../auth/authMiddleware"));
var usersUtils = _interopRequireWildcard(require("./usersUtils"));
var _utils = require("../utils");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

(app) => {
  app.post(
  '/api/auth2fa-secret',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  _utils.validation.validateRequest(_joi.default.object().keys({})),
  async (req, res, next) => {
    try {
      const { otpauth, secret } = await usersUtils.setSecret(req.user);
      res.json({ otpauth, secret });
    } catch (err) {
      next(err);
    }
  });


  app.post(
  '/api/auth2fa-enable',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  _utils.validation.validateRequest(_joi.default.object().keys({ token: _joi.default.string().required() }).required()),
  async (req, res, next) => {
    try {
      await usersUtils.enable2fa(req.user, req.body.token);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  });


  app.post(
  '/api/auth2fa-reset',
  (0, _authMiddleware.default)(['admin']),
  _utils.validation.validateRequest(
  _joi.default.object().
  keys({
    _id: _joi.default.string().length(24).alphanum().required() }).

  required()),

  async (req, res, next) => {
    try {
      await usersUtils.reset2fa({ _id: req.body._id });
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  });

};exports.default = _default;