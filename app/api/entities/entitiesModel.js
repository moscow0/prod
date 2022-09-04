"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _ModelWithPermissions = require("../odm/ModelWithPermissions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







const mongoSchema = new _mongoose.default.Schema(
{
  language: { type: String, index: true },
  mongoLanguage: { type: String, select: false },
  sharedId: { type: String, index: true },
  title: { type: String, required: true },
  template: { type: _mongoose.default.Schema.Types.ObjectId, ref: 'templates' },
  published: Boolean,
  generatedToc: Boolean,
  icon: new _mongoose.default.Schema({
    _id: String,
    label: String,
    type: String }),

  creationDate: Number,
  editDate: Number,
  metadata: { type: _mongoose.default.Schema.Types.Mixed, default: {} },
  suggestedMetadata: _mongoose.default.Schema.Types.Mixed,
  user: { type: _mongoose.default.Schema.Types.ObjectId, ref: 'users' },
  permissions: { type: _mongoose.default.Schema.Types.Mixed, select: false } },

{ emitIndexErrors: true, minimize: false });


//mongodb types not updated yet for language_override?
//@ts-ignore
mongoSchema.index({ title: 'text' }, { language_override: 'mongoLanguage' });
mongoSchema.index({ template: 1, language: 1, published: 1 });

const Model = (0, _ModelWithPermissions.instanceModelWithPermissions)('entities', mongoSchema);

const supportedLanguages = [
'da',
'nl',
'en',
'fi',
'fr',
'de',
'hu',
'it',
'nb',
'pt',
'ro',
'ru',
'es',
'sv',
'tr'];


const setMongoLanguage = (doc) => {
  if (!doc.language) {
    return doc;
  }

  let mongoLanguage = doc.language;
  if (!supportedLanguages.includes(mongoLanguage)) {
    mongoLanguage = 'none';
  }

  return _objectSpread(_objectSpread({}, doc), {}, { mongoLanguage });
};

const modelSaveRaw = Model.save.bind(Model);
Model.save = async (doc) => modelSaveRaw(setMongoLanguage(doc));

const modelSaveMultipleRaw = Model.saveMultiple.bind(Model);
Model.saveMultiple = async (docs) => modelSaveMultipleRaw(docs.map((doc) => setMongoLanguage(doc)));

const modelSaveUnrestrictedRaw = Model.saveUnrestricted.bind(Model);
Model.saveUnrestricted = async (doc) => modelSaveUnrestrictedRaw(setMongoLanguage(doc));var _default =

Model;exports.default = _default;