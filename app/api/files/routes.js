"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _activitylogMiddleware = _interopRequireDefault(require("../activitylog/activitylogMiddleware"));
var _authMiddleware = _interopRequireDefault(require("../auth/authMiddleware"));
var _csv = require("../csv");
var _entities = _interopRequireDefault(require("../entities"));
var _processDocument = require("./processDocument");
var _uploadMiddleware = require("./uploadMiddleware");
var _log = require("../log");

var _fileSchema = require("../../shared/types/fileSchema");
var _validateRequest = require("../utils/validateRequest");
var _joi = _interopRequireDefault(require("joi"));
var _files = require("./files");
var _utils = require("../utils");
var _storage = require("./storage");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const checkEntityPermission = async (file) => {
  if (!file.entity) return true;
  const relatedEntities = await _entities.default.get({ sharedId: file.entity }, '_id', {
    withoutDocuments: true });

  return !!relatedEntities.length;
};

const filterByEntityPermissions = async (fileList) => {
  const sharedIds = fileList.map((f) => f.entity).filter((f) => f);
  const allowedSharedIds = await _entities.default.
  get({ sharedId: { $in: sharedIds } }, 'sharedId', {
    withoutDocuments: true }).

  then((arr) => new Set(arr.map((e) => e.sharedId)));
  return fileList.filter((f) => !f.entity || allowedSharedIds.has(f.entity));
};var _default =

(app) => {
  app.post(
  '/api/files/upload/document',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  (0, _uploadMiddleware.uploadMiddleware)('document'),
  async (req, res) => {
    try {
      req.emitToSessionSocket('conversionStart', req.body.entity);
      const savedFile = await (0, _processDocument.processDocument)(req.body.entity, req.file);
      res.json(savedFile);
      req.emitToSessionSocket('documentProcessed', req.body.entity);
    } catch (err) {
      _log.errorLog.error(err);
      _log.debugLog.debug(err);
      const [file] = await _files.files.get({ filename: req.file.filename });
      res.json(file);
      req.emitToSessionSocket('conversionFailed', req.body.entity);
    }
  },
  _activitylogMiddleware.default);


  app.post(
  '/api/files/upload/custom',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  (0, _uploadMiddleware.uploadMiddleware)('custom'),
  _activitylogMiddleware.default,
  (req, res, next) => {
    _files.files.
    save(_objectSpread(_objectSpread({}, req.file), {}, { type: 'custom' })).
    then((saved) => {
      res.json(saved);
    }).
    catch(next);
  });


  app.post(
  '/api/files/upload/attachment',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  (0, _uploadMiddleware.uploadMiddleware)('attachment'),
  _activitylogMiddleware.default,
  (req, res, next) => {
    _files.files.
    save(_objectSpread(_objectSpread(_objectSpread({},
    req.file),
    req.body), {}, {
      type: 'attachment' })).

    then((saved) => {
      res.json(saved);
    }).
    catch(next);
  });


  app.post(
  '/api/files',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: _fileSchema.fileSchema } }),


  (req, res, next) => {
    _files.files.
    save(req.body).
    then((result) => {
      res.json(result);
    }).
    catch(next);
  });


  app.post(
  '/api/files/tocReviewed',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        required: ['fileId'],
        properties: {
          fileId: { type: 'string' } } } } }),




  async (req, res, next) => {
    try {
      res.json(await _files.files.tocReviewed(req.body.fileId, req.language));
    } catch (e) {
      next(e);
    }
  });


  app.use('/assets/:fileName', (req, res) => {
    res.redirect(301, `/api/files/${req.params.fileName}`);
  });

  app.use('/uploaded_documents/:fileName', (req, res) => {
    res.redirect(301, `/api/files/${req.params.fileName}`);
  });

  app.get(
  '/api/attachments/download',

  _utils.validation.validateRequest(
  _joi.default.object({
    file: _joi.default.string().required() }).
  required(),
  'query'),


  async (req, res) => {
    res.redirect(301, `/api/files/${req.query.file}?download=true`);
  });


  app.get(
  '/api/files/:filename',
  (0, _validateRequest.validateAndCoerceRequest)({
    type: 'object',
    properties: {
      params: {
        type: 'object',
        required: ['filename'],
        properties: {
          filename: { type: 'string' } } },


      query: {
        type: 'object',
        properties: {
          download: { type: 'boolean' } } } } }),





  async (req, res) => {
    const [file] = await _files.files.get({
      filename: req.params.filename });


    if (
    !(file !== null && file !== void 0 && file.filename) ||
    !(file !== null && file !== void 0 && file.type) ||
    !(await _storage.storage.fileExists(file.filename, file.type)) ||
    !(await checkEntityPermission(file)))
    {
      throw (0, _utils.createError)('file not found', 404);
    }

    const headerFilename = file.originalname || file.filename;
    res.setHeader(
    'Content-Disposition',
    `filename*=UTF-8''${encodeURIComponent(headerFilename)}`);


    if (req.query.download === true) {
      res.setHeader(
      'Content-Disposition',
      `attachment; filename*=UTF-8''${encodeURIComponent(headerFilename)}`);

    }

    res.setHeader('Content-Type', (file === null || file === void 0 ? void 0 : file.mimetype) || 'application/octet-stream');
    (await _storage.storage.readableFile(file.filename, file.type)).pipe(res);
  });


  app.delete(
  '/api/files',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),

  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        required: ['_id'],
        additionalProperties: false,
        properties: {
          _id: { type: 'string' } } } } }),





  async (req, res, next) => {
    try {
      const [fileToDelete] = await _files.files.get({ _id: req.query._id });
      if (!fileToDelete || !(await checkEntityPermission(fileToDelete))) {
        throw (0, _utils.createError)('file not found', 404);
      }

      const [deletedFile] = await _files.files.delete({ _id: req.query._id });
      const thumbnailFileName = `${deletedFile._id}.jpg`;
      await _files.files.delete({ filename: thumbnailFileName });
      res.json([deletedFile]);
    } catch (e) {
      next(e);
    }
  });


  app.get(
  '/api/files',
  (0, _authMiddleware.default)(['admin', 'editor', 'collaborator']),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        additionalProperties: false,
        properties: {
          _id: { type: 'string' },
          type: { type: 'string' } } } } }),




  (req, res, next) => {
    _files.files.
    get(req.query).
    then(async (result) => filterByEntityPermissions(result)).
    then((result) => {
      res.json(result);
    }).
    catch(next);
  });


  app.post(
  '/api/import',

  (0, _authMiddleware.default)(['admin']),

  (0, _uploadMiddleware.uploadMiddleware)(),

  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        required: ['template'],
        properties: {
          template: { type: 'string' } } } } }),





  (req, res) => {
    const loader = new _csv.CSVLoader();
    let loaded = 0;

    loader.on('entityLoaded', () => {
      loaded += 1;
      req.emitToSessionSocket('IMPORT_CSV_PROGRESS', loaded);
    });

    loader.on('loadError', (error) => {
      req.emitToSessionSocket('IMPORT_CSV_ERROR', (0, _utils.handleError)(error));
    });

    req.emitToSessionSocket('IMPORT_CSV_START');

    loader.
    load(req.file.path, req.body.template, { language: req.language, user: req.user }).
    then(() => {
      req.emitToSessionSocket('IMPORT_CSV_END');
    }).
    catch((e) => {
      req.emitToSessionSocket('IMPORT_CSV_ERROR', (0, _utils.handleError)(e));
    });

    res.json('ok');
  });

};exports.default = _default;