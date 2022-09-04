"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _log = require("../log");
var _search = require("../search");
var _csv = require("../csv");
var _settings = _interopRequireDefault(require("../settings"));
var _captchaMiddleware = _interopRequireDefault(require("../auth/captchaMiddleware"));
var _filesystem = require("./filesystem");
var _utils = require("../utils");

var _fs = require("fs");

var _promises = _interopRequireDefault(require("fs/promises"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // eslint-disable-next-line node/no-restricted-import
// eslint-disable-next-line node/no-restricted-import
var _default = (app) => {
  const parseQueryProperty = (query, property) =>
  query[property] ? JSON.parse(query[property]) : query[property];

  const generateExportFileName = (databaseName = '') =>
  `${databaseName}-${new Date().toISOString()}.csv`;

  const removeTempFile = (filePath) => async () => {
    try {
      await _promises.default.unlink(filePath);
    } catch (err) {
      _log.errorLog.error(`Error unlinking exported file: ${filePath}`);
    }
  };

  app.get(
  '/api/export',
  async (req, res, next) =>
  req.user ? next() : (0, _captchaMiddleware.default)()(req, res, next),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        properties: {
          filters: { type: 'string' },
          types: { type: 'string' },
          allAggregations: { type: 'string' },
          userSelectedSorting: { type: 'string' },
          order: { type: 'string' },
          sort: { type: 'string' },
          limit: { type: 'string' },
          searchTerm: { type: 'string' },
          includeUnpublished: { type: 'string' },
          unpublished: { type: 'string' },
          ids: { type: 'string' } } } } }),




  // eslint-disable-next-line max-statements
  async (req, res, next) => {
    const temporalFilePath = (0, _filesystem.temporalFilesPath)((0, _filesystem.generateFileName)({ originalname: 'export.csv' }));
    try {
      req.query.filters = parseQueryProperty(req.query, 'filters');
      req.query.types = parseQueryProperty(req.query, 'types');
      req.query.unpublished = parseQueryProperty(req.query, 'unpublished');
      req.query.includeUnpublished = parseQueryProperty(req.query, 'includeUnpublished');
      req.query.allAggregations = parseQueryProperty(req.query, 'allAggregations');

      req.query.ids = parseQueryProperty(req.query, 'ids');
      if (!Array.isArray(req.query.ids)) delete req.query.ids;

      const results = await _search.search.search(req.query, req.language, req.user);
      // eslint-disable-next-line camelcase
      const { dateFormat = '', site_name } = await _settings.default.get();

      const exporter = new _csv.CSVExporter();

      const fileStream = (0, _fs.createWriteStream)(temporalFilePath);
      const exporterOptions = { dateFormat, language: req.language };

      await exporter.export(results, fileStream, req.query.types, exporterOptions);

      res.download(temporalFilePath, generateExportFileName(site_name), (err) => {
        if (err) next(err);
        //eslint-disable-next-line @typescript-eslint/no-floating-promises
        removeTempFile(temporalFilePath)();
      });
    } catch (e) {
      await removeTempFile(temporalFilePath)();
      next(e);
    }
  });

};exports.default = _default;