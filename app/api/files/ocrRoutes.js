"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ocrRoutes = void 0;
var _ = require("./");
var _authMiddleware = _interopRequireDefault(require("../auth/authMiddleware"));
var _OcrManager = require("../services/ocr/OcrManager");
var _files = require("./files");
var _utils = require("../utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const validateOcrIsEnabled = async (_req, res, next) => {
  if (!(await (0, _OcrManager.isOcrEnabled)())) {
    return res.sendStatus(404);
  }
  return next();
};

const ocrRequestDecriptor = {
  type: 'object',
  properties: {
    params: {
      type: 'object',
      properties: {
        filename: { type: 'string' } } } } };





const fileFromRequest = async (request) => {
  const [file] = await _files.files.get({
    filename: request.params.filename });


  if (!(file !== null && file !== void 0 && file.filename) || !(await _.storage.fileExists(file.filename, 'document'))) {
    throw (0, _utils.createError)('file not found', 404);
  }

  return file;
};

const ocrRoutes = (app) => {
  app.get(
  '/api/files/:filename/ocr',
  validateOcrIsEnabled,
  (0, _authMiddleware.default)(['admin', 'editor']),
  _utils.validation.validateRequest(ocrRequestDecriptor),
  async (req, res) => {
    const file = await fileFromRequest(req);

    const status = await (0, _OcrManager.getOcrStatus)(file);

    res.json(status);
  });


  app.post(
  '/api/files/:filename/ocr',
  validateOcrIsEnabled,
  (0, _authMiddleware.default)(['admin', 'editor']),
  _utils.validation.validateRequest(ocrRequestDecriptor),
  async (req, res) => {
    const file = await fileFromRequest(req);

    await _OcrManager.ocrManager.addToQueue(file);

    res.sendStatus(200);
  });

};exports.ocrRoutes = ocrRoutes;