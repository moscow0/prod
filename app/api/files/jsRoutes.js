"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.routes = exports.default = void 0;var _activitylogMiddleware = _interopRequireDefault(require("../activitylog/activitylogMiddleware"));
var _entitySavingManager = require("../entities/entitySavingManager");
var _processDocument = require("./processDocument");
var _search = require("../search");
var _settings = _interopRequireDefault(require("../settings"));
var _mailer = _interopRequireDefault(require("../utils/mailer"));
var _cors = _interopRequireDefault(require("cors"));
var _expressHttpProxy = _interopRequireDefault(require("express-http-proxy"));

var _fs = require("fs");
var _publicAPIMiddleware = require("../auth/publicAPIMiddleware");
var _utils = require("../utils");
var _storage = require("./storage");
var _uploadMiddleware = require("./uploadMiddleware");const _excluded = ["tenant", "cookie"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

const processEntityDocument = async (req, entitySharedId) => {
  const file = req.files.find((_file) => _file.fieldname.includes('file'));
  if (file) {
    await _storage.storage.storeFile(file.filename, (0, _fs.createReadStream)(file.path), 'document');
    await (0, _processDocument.processDocument)(entitySharedId, file);
    await _search.search.indexEntities({ sharedId: entitySharedId }, '+fullText');
    req.emitToSessionSocket('documentProcessed', entitySharedId);
  }
};

const routes = (app) => {
  const corsOptions = {
    origin: true,
    methods: 'POST',
    credentials: true,
    optionsSuccessStatus: 200 };


  app.options('/api/public', (0, _cors.default)(corsOptions));
  app.post(
  '/api/public',
  (0, _cors.default)(corsOptions),
  _uploadMiddleware.uploadMiddleware.multiple(),
  _publicAPIMiddleware.publicAPIMiddleware,
  _activitylogMiddleware.default,
  (req, _res, next) => {
    try {
      req.body.entity = JSON.parse(req.body.entity);
      if (req.body.email) {
        req.body.email = JSON.parse(req.body.email);
      }
    } catch (err) {
      next(err);
      return;
    }
    next();
  },
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          email: {
            type: 'object',
            properties: {
              to: { type: 'string' },
              from: { type: 'string' },
              text: { type: 'string' },
              html: { type: 'string' },
              subject: { type: 'string' } },

            required: ['to', 'from', 'text', 'subject'] } } } } }),





  async (req, res, next) => {
    const { allowedPublicTemplates } = await _settings.default.get();
    const { entity, email } = req.body;

    if (!allowedPublicTemplates || !allowedPublicTemplates.includes(entity.template)) {
      next((0, _utils.createError)('Unauthorized public template', 403));
      return;
    }

    const { entity: savedEntity } = await (0, _entitySavingManager.saveEntity)(entity, {
      user: {},
      language: req.language,
      socketEmiter: req.emitToSessionSocket,
      files: req.files });


    await processEntityDocument(req, savedEntity.sharedId);

    if (email) {
      await _mailer.default.send(email);
    }

    res.json(savedEntity);
  });


  app.post('/api/remotepublic', async (req, res, next) => {
    const { publicFormDestination } = await _settings.default.get({}, { publicFormDestination: 1 });
    (0, _expressHttpProxy.default)(publicFormDestination, {
      limit: '500mb',
      proxyReqPathResolver() {
        return '/api/public';
      },
      proxyReqOptDecorator(proxyReqOpts) {
        const _proxyReqOpts$headers = proxyReqOpts.headers,{ tenant, cookie } = _proxyReqOpts$headers,headers = _objectWithoutProperties(_proxyReqOpts$headers, _excluded);
        return _objectSpread(_objectSpread({},
        proxyReqOpts), {}, {
          headers: _objectSpread({}, headers) });

      } })(
    req, res, next);
  });
};exports.routes = routes;var _default =

routes;exports.default = _default;