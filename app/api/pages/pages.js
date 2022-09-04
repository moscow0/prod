"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _uniqueID = _interopRequireDefault(require("../../shared/uniqueID"));

var _pageSchema = require("../../shared/types/pageSchema");
var _date = _interopRequireDefault(require("../utils/date.js"));
var _templates = _interopRequireDefault(require("../templates"));
var _utils = require("../utils");



var _pagesModel = _interopRequireDefault(require("./pagesModel"));
var _settings = _interopRequireDefault(require("../settings"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const assignUserAndDate = (page, user) => {
  if (!user) {
    throw new Error('missing user');
  }
  return _objectSpread(_objectSpread({},
  page), {}, {
    user: user._id,
    creationDate: _date.default.currentUTC() });

};

const entityViewSyncing = async (page) => {
  const pageInAllLaguangues = await _pagesModel.default.get({ sharedId: page.sharedId }, '_id entityView');
  const updatedPages = pageInAllLaguangues.map((_id) => _objectSpread(_objectSpread({},
  _id), {}, {
    entityView: page.entityView || false }));

  await _pagesModel.default.saveMultiple(updatedPages);
};var _default =

{
  // eslint-disable-next-line max-statements
  async save(_page, user, language) {
    await (0, _pageSchema.validatePage)(_page);
    let page = _objectSpread({}, _page);

    if (!page.sharedId) {
      page = assignUserAndDate(page, user);
    }

    if (page.sharedId) {
      await entityViewSyncing(page);
      return _pagesModel.default.save(page);
    }

    const { languages = [] } = await _settings.default.get();
    const sharedId = (0, _uniqueID.default)();
    const pages = languages.map((lang) => _objectSpread(_objectSpread({},
    page), {}, {
      language: lang.key,
      sharedId }));

    await _pagesModel.default.saveMultiple(pages);
    return this.getById(sharedId, language);
  },

  async get(query, select) {
    return _pagesModel.default.get(query, select);
  },

  async getById(sharedId, language, select) {
    const results = await this.get({ sharedId, language }, select);
    return results[0] ? results[0] : Promise.reject((0, _utils.createError)('Page not found', 404));
  },

  async delete(sharedId) {
    const templatesUsingPage = await _templates.default.get({
      entityViewPage: sharedId });

    if (templatesUsingPage.length > 0) {
      const templatesTitles = templatesUsingPage.map((template) => template.name);
      return Promise.reject(
      (0, _utils.createError)(
      `This page is in use by the following templates: ${templatesTitles.join(
      ', ')
      }. Remove the page from the templates before trying again.`,
      409));


    }
    return _pagesModel.default.delete({ sharedId });
  },

  async addLanguage(language) {var _languages$find;
    const [lanuageTranslationAlreadyExists] = await this.get({ locale: language });
    if (lanuageTranslationAlreadyExists) {
      return Promise.resolve();
    }

    const { languages } = await _settings.default.get();

    const defaultLanguage = languages === null || languages === void 0 ? void 0 : (_languages$find = languages.find((l) => l.default)) === null || _languages$find === void 0 ? void 0 : _languages$find.key;

    const duplicate = async () => {
      const pages = await this.get({ language: defaultLanguage });
      const savePages = pages.map(async (_page) => {
        const page = _objectSpread(_objectSpread({}, _page), {}, { language });
        delete page._id;
        delete page.__v;
        return this.save(page);
      });

      return Promise.all(savePages);
    };

    return duplicate();
  },

  // TEST!!!
  async removeLanguage(language) {
    return _pagesModel.default.delete({ language });
  },

  count: _pagesModel.default.count.bind(_pagesModel.default) };exports.default = _default;