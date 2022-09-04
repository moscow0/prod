"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PDF = void 0;
var _fs = require("fs");
var os = _interopRequireWildcard(require("os"));
var _log = require("../log");
var _utils = require("../utils");
var _childProcessPromise = require("child-process-promise");
var _events = _interopRequireDefault(require("events"));
var _path = _interopRequireDefault(require("path"));
var _detectLanguage = require("../../shared/detectLanguage");

var _storage = require("./storage");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class PDF extends _events.default {




  constructor(file) {
    super();_defineProperty(this, "file", void 0);_defineProperty(this, "filepath", void 0);
    this.file = file;
    this.filepath = _path.default.join(file.destination || '', file.filename || '');
  }

  async extractText() {
    try {
      const result = await (0, _childProcessPromise.spawn)('pdftotext', [this.filepath, '-'], {
        capture: ['stdout', 'stderr'] });

      const pages = result.stdout.split('\f').slice(0, -1);
      return {
        fullText: pages.reduce(
        (memo, page, index) => _objectSpread(_objectSpread({},
        memo), {}, {
          [index + 1]: page.replace(/(\S+)(\s?)/g, `$1[[${index + 1}]]$2`) }),

        {}),

        fullTextWithoutPages: pages.reduce(
        (memo, page, index) => _objectSpread(_objectSpread({},
        memo), {}, {
          [index + 1]: page }),

        {}),

        totalPages: pages.length };

    } catch (e) {
      if (e.name === 'ChildProcessError') {
        throw (0, _utils.createError)(`${e.message}\nstderr output:\n${e.stderr}`);
      }
      throw (0, _utils.createError)(e.message);
    }
  }

  async createThumbnail(documentId) {
    const thumbnailPath = _path.default.join(os.tmpdir(), `${documentId}.jpg`);
    let response;
    try {
      await (0, _childProcessPromise.spawn)(
      'pdftoppm',
      [
      '-f',
      '1',
      '-singlefile',
      '-scale-to',
      '320',
      '-jpeg',
      this.filepath,
      _path.default.join(os.tmpdir(), documentId)],

      { capture: ['stdout', 'stderr'] });

      response = `${documentId}.jpg`;
      await _storage.storage.storeFile(response, (0, _fs.createReadStream)(thumbnailPath), 'thumbnail');
    } catch (err) {
      response = err;
      _log.errorLog.error(err.stderr);
    }

    return Promise.resolve(response);
  }

  async convert() {
    return this.extractText().then((conversion) => _objectSpread(_objectSpread(_objectSpread({},
    conversion),
    this.file), {}, {
      language:
      (0, _detectLanguage.detectLanguage)(Object.values(conversion.fullTextWithoutPages).join(''), 'franc') ||
      undefined,
      processed: true,
      toc: [] }));

  }}exports.PDF = PDF;