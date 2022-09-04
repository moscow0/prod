"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = require("../utils");
var _userSchema = require("../../shared/types/userSchema");
var _authMiddleware = _interopRequireDefault(require("../auth/authMiddleware"));
var _users = _interopRequireDefault(require("./users"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const getDomain = (req) => `${req.protocol}://${req.get('host')}`;var _default =
(app) => {
  app.post(
  '/api/users',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: _userSchema.userSchema },

    required: ['body'] }),


  (req, res, next) => {
    _users.default.
    save(req.body, req.user, getDomain(req)).
    then((response) => res.json(response)).
    catch(next);
  });


  app.post(
  '/api/users/new',
  (0, _authMiddleware.default)(),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: _userSchema.userSchema },

    required: ['body'] }),

  (req, res, next) => {
    _users.default.
    newUser(req.body, getDomain(req)).
    then((response) => res.json(response)).
    catch(next);
  });


  app.post(
  '/api/unlockaccount',
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          code: { type: 'string' } },

        required: ['username', 'code'] } },


    required: ['body'] }),

  (req, res, next) => {
    _users.default.
    unlockAccount(req.body).
    then(() => res.json('OK')).
    catch(next);
  });


  app.post(
  '/api/recoverpassword',
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', minLength: 3 } },

        required: ['email'] } },


    required: ['body'] }),

  (req, res, next) => {
    _users.default.
    recoverPassword(req.body.email, getDomain(req)).
    then(() => res.json('OK')).
    catch(next);
  });


  app.post(
  '/api/resetpassword',
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          key: { type: 'string' },
          password: { type: 'string' } },

        required: ['key', 'password'] } },


    required: ['body'] }),

  (req, res, next) => {
    _users.default.
    resetPassword(req.body).
    then((response) => res.json(response)).
    catch(next);
  });


  app.get('/api/users', (0, _authMiddleware.default)(), (_req, res, next) => {
    _users.default.
    get({}, '+groups').
    then((response) => res.json(response)).
    catch(next);
  });

  app.delete(
  '/api/users',
  (0, _authMiddleware.default)(),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        required: ['_id'],
        properties: {
          _id: { type: 'string' } } } },



    required: ['query'] }),

  (req, res, next) => {
    _users.default.
    delete(req.query._id, req.user).
    then((response) => res.json(response)).
    catch(next);
  });

};exports.default = _default;