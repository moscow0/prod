"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.permissionRoutes = void 0;
var _auth = require("../auth");
var _utils = require("../utils");
var _entitiesPermissions = require("./entitiesPermissions");
var _collaborators = require("./collaborators");
var _permissionSchema = require("../../shared/types/permissionSchema");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const permissionRoutes = (app) => {
  app.post(
  '/api/entities/permissions',
  (0, _auth.needsAuthorization)(['admin', 'editor', 'collaborator']),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: _objectSpread({},
      _permissionSchema.permissionsDataSchema) } }),



  async (req, res, next) => {
    try {
      await _entitiesPermissions.entitiesPermissions.set(req.body);
      res.json(req.body);
    } catch (err) {
      next(err);
    }
  });


  app.put(
  '/api/entities/permissions/',
  (0, _auth.needsAuthorization)(['admin', 'editor', 'collaborator']),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        additionalProperties: false,
        properties: {
          sharedIds: { type: 'array', items: { type: 'string' } } },

        required: ['sharedIds'] } } }),



  async (req, res, next) => {
    try {
      const { sharedIds } = req.body;
      const permissions = await _entitiesPermissions.entitiesPermissions.get(sharedIds);
      res.json(permissions);
    } catch (err) {
      next(err);
    }
  });


  app.get(
  '/api/collaborators',
  (0, _auth.needsAuthorization)(['admin', 'editor', 'collaborator']),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        required: ['filterTerm'],
        properties: {
          filterTerm: { type: 'string' } } } } }),




  async (req, res, next) => {
    try {
      const availableCollaborators = await _collaborators.collaborators.search(req.query.filterTerm);
      res.json(availableCollaborators);
    } catch (err) {
      next(err);
    }
  });

};exports.permissionRoutes = permissionRoutes;