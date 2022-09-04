"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.CSVLoader = void 0;var _i18n = _interopRequireDefault(require("../i18n"));

var _settings = _interopRequireDefault(require("../settings"));
var _templates = _interopRequireDefault(require("../templates"));
var _thesauri = _interopRequireDefault(require("../thesauri"));
var _events = require("events");


var _tsUtils = require("../../shared/tsUtils");


var _arrangeThesauri = require("./arrangeThesauri");
var _csv = _interopRequireDefault(require("./csv"));
var _entityRow = require("./entityRow");
var _importEntity = require("./importEntity");
var _importFile = _interopRequireDefault(require("./importFile"));
var _importThesauri = require("./importThesauri");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class CSVLoader extends _events.EventEmitter {




  constructor(options = { stopOnError: true }) {
    super();_defineProperty(this, "stopOnError", void 0);_defineProperty(this, "_errors", void 0);
    this._errors = {};
    this.stopOnError = options.stopOnError;
  }

  errors() {
    return this._errors;
  }

  throwErrors() {
    if (Object.keys(this._errors).length === 1) {
      const firstKey = Object.keys(this._errors)[0];
      throw this._errors[Number(firstKey)];
    }

    if (Object.keys(this._errors).length) {
      throw new Error('multiple errors ocurred !');
    }
  }

  async load(
  csvPath,
  templateId,
  options = { language: 'en', user: {} })
  {
    const template = await _templates.default.getById(templateId);
    if (!template) {
      throw new Error('template not found!');
    }
    const { newNameGeneration = false, languages, dateFormat } = await _settings.default.get();
    const availableLanguages = (0, _tsUtils.ensure)(languages).map(
    (language) => language.key);

    const file = (0, _importFile.default)(csvPath);
    await (0, _arrangeThesauri.arrangeThesauri)(file, template, newNameGeneration, availableLanguages);

    await (0, _csv.default)(await file.readStream(), this.stopOnError).
    onRow(async (row) => {
      const { rawEntity, rawTranslations } = (0, _entityRow.extractEntity)(
      row,
      availableLanguages,
      options.language,
      newNameGeneration);

      if (rawEntity) {
        const entity = await (0, _importEntity.importEntity)(rawEntity, template, file, _objectSpread(_objectSpread({}, options), {}, { dateFormat }));
        await (0, _importEntity.translateEntity)(entity, rawTranslations, template, file);
        this.emit('entityLoaded', entity);
      }
    }).
    onError(async (e, row, index) => {
      this._errors[index] = e;
      this.emit('loadError', e, (0, _entityRow.toSafeName)(row), index);
    }).
    read();

    this.throwErrors();
  }

  /* eslint-disable class-methods-use-this */
  async loadThesauri(
  csvPath,
  thesaurusId,
  { language })
  {
    const file = (0, _importFile.default)(csvPath);
    const availableLanguages = (0, _tsUtils.ensure)((await _settings.default.get()).languages).
    map((l) => l.key).
    filter((l) => l !== language);

    const fileStream = await file.readStream();
    const { thesauriValues: thesaurusValues, thesauriTranslations } = await (0, _importThesauri.thesauriFromStream)(
    fileStream,
    language,
    availableLanguages);


    const currentThesauri = (await _thesauri.default.getById(thesaurusId)) || {};
    const theaurusToSave = _thesauri.default.appendValues(currentThesauri, thesaurusValues);
    const saved = await _thesauri.default.save(theaurusToSave);

    await _i18n.default.updateEntries(thesaurusId.toString(), thesauriTranslations);

    return saved;
  }
  /* eslint-enable class-methods-use-this */

  async loadTranslations(csvPath, translationContext) {
    const file = (0, _importFile.default)(csvPath);
    const availableLanguages = (0, _tsUtils.ensure)((await _settings.default.get()).languages).map(
    (l) => ({ label: l.label, language: l.key }));


    const intermediateTranslation = {};

    await (0, _csv.default)(await file.readStream(), this.stopOnError).
    onRow(async (row, _index) => {
      Object.keys(row).forEach((lang) => {
        intermediateTranslation[lang] = intermediateTranslation[lang] || {};
        intermediateTranslation[lang][row.Key] = row[lang];
      });
    }).
    read();

    await availableLanguages.reduce(async (prev, lang) => {
      await prev;
      const trans = intermediateTranslation[lang.label];
      const [dbTranslations] = await _i18n.default.get({ locale: lang.language });

      const context = (dbTranslations.contexts || []).find(
      (ctxt) => ctxt.id === translationContext);


      if (trans && context) {
        Object.keys(trans).forEach((transKey) => {
          if (context.values[transKey] && trans[transKey] !== '') {
            context.values[transKey] = trans[transKey];
          }
        });
      }

      return _i18n.default.save(dbTranslations);
    }, Promise.resolve({}));

    return _i18n.default.get();
  }}exports.CSVLoader = CSVLoader;