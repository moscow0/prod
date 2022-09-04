"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.tocService = void 0;var _files = require("../files");
var _handleError = require("../utils/handleError");
var _log = require("../log");
var _JSONRequest = _interopRequireDefault(require("../../shared/JSONRequest"));
var _entities = _interopRequireDefault(require("../entities"));


var _tenants = require("../tenants");
var _settings = _interopRequireDefault(require("../settings"));
var _permissionsContext = require("../permissions/permissionsContext");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const fakeTocEntry = (label) => ({
  selectionRectangles: [{ top: 0, left: 0, width: 0, height: 0, page: '1' }],
  indentation: 0,
  label });


const saveToc = async (file, toc) => {
  await _files.files.save(_objectSpread(_objectSpread({}, file), {}, { toc, generatedToc: true }));
  const [entity] = await _entities.default.get({ sharedId: file.entity }, {});
  await _entities.default.save(_objectSpread(_objectSpread({},

  entity), {}, {
    generatedToc: true }),

  { user: {}, language: entity.language },
  { updateRelationships: false });

};

const generateToc = async (url, file) => {
  const response = await _JSONRequest.default.uploadFile(url, file.filename, (0, _files.uploadsPath)(file.filename));

  let toc = JSON.parse(response.text);
  if (!toc.length) {
    toc = [fakeTocEntry('ERROR: Toc was generated empty')];
  }
  return toc;
};

const handleError = async (e, file) => {
  if ((e === null || e === void 0 ? void 0 : e.code) !== 'ECONNREFUSED' && (e === null || e === void 0 ? void 0 : e.code) !== 'ECONNRESET') {
    const toc = [fakeTocEntry('ERROR: Toc generation throwed an error'), fakeTocEntry(e.message)];
    await saveToc(file, toc);
  }
};

const tocService = {
  async processAllTenants() {
    return Object.keys(_tenants.tenants.tenants).reduce(async (previous, tenantName) => {
      await previous;
      return _tenants.tenants.run(async () => {
        _permissionsContext.permissionsContext.setCommandContext();
        const { features } = await _settings.default.get({}, 'features.tocGeneration');
        if (features !== null && features !== void 0 && features.tocGeneration) {
          await this.processNext(features.tocGeneration.url);
        }
      }, tenantName);
    }, Promise.resolve());
  },

  async processNext(url) {
    const [nextFile] = await _files.files.get(
    {
      type: 'document',
      filename: { $exists: true },
      'toc.0': { $exists: false } },

    '',
    { sort: { _id: 1 }, limit: 1 });


    if (nextFile) {
      try {
        await saveToc(nextFile, await generateToc(url, nextFile));
      } catch (e) {
        await handleError(e, nextFile);
        _log.errorLog.error((0, _handleError.prettifyError)(e).prettyMessage);
      }
    }
  } };exports.tocService = tocService;