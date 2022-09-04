"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.addLanguage = addLanguage;exports.closeInlineEditTranslation = closeInlineEditTranslation;exports.deleteLanguage = deleteLanguage;exports.editTranslations = editTranslations;exports.importTranslations = importTranslations;exports.inlineEditTranslation = inlineEditTranslation;exports.resetForm = resetForm;exports.saveTranslations = saveTranslations;exports.setDefaultLanguage = setDefaultLanguage;exports.toggleInlineEdit = toggleInlineEdit;var _reactReduxForm = require("react-redux-form");
var notifications = _interopRequireWildcard(require("../../Notifications/actions/notificationsActions"));
var _store = require("../../store");
var _RequestParams = require("../../utils/RequestParams");

var _superagent = require("../../../shared/superagent");
var _t2 = _interopRequireDefault(require("../t"));
var _I18NApi = _interopRequireDefault(require("../I18NApi"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function inlineEditTranslation(contextId, key) {
  return (dispatch) => {
    const state = _store.store.getState();
    const translations = state.translations.toJS();
    const languages = translations.map((_t) => _t.locale);
    const formData = languages.reduce((values, locale) => {
      const translation = translations.find((_t) => _t.locale === locale);
      const context = translation.contexts.find((c) => c.id === contextId);
      values[locale] = context.values[key] || key; // eslint-disable-line no-param-reassign
      return values;
    }, {});

    dispatch({ type: 'OPEN_INLINE_EDIT_FORM', context: contextId, key });
    dispatch(_reactReduxForm.actions.load('inlineEditModel', formData));
  };
}

function closeInlineEditTranslation() {
  return (dispatch) => {
    dispatch({ type: 'CLOSE_INLINE_EDIT_FORM' });
    dispatch(_reactReduxForm.actions.reset('inlineEditModel'));
  };
}

function toggleInlineEdit() {
  return { type: 'TOGGLE_INLINE_EDIT' };
}

function saveTranslations(translations) {
  return (dispatch) => {
    Promise.all(translations.map((translation) => _I18NApi.default.save(new _RequestParams.RequestParams(translation)))).then(
    () => {
      notifications.notify((0, _t2.default)('System', 'Translations saved', null, false), 'success')(dispatch);
    });

  };
}

function importTranslations(context, file) {
  return async (dispatch) => {
    try {
      const headers = {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest' };

      const fields = {
        context };

      const translations = await (0, _superagent.httpRequest)('translations/import', fields, headers, file);
      await dispatch(_reactReduxForm.actions.load('translationsForm', translations));
      notifications.notify((0, _t2.default)(context, 'Translations imported.', null, false), 'success')(dispatch);
    } catch (e) {
      notifications.notify((0, _t2.default)(context, e.error, null, false), 'danger')(dispatch);
    }
  };
}

function editTranslations(translations) {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.load('translationsForm', translations));
  };
}

function resetForm() {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.reset('translationsForm'));
  };
}

function addLanguage(language) {
  return (dispatch) =>
  _I18NApi.default.addLanguage(new _RequestParams.RequestParams(language)).then(() => {
    notifications.notify((0, _t2.default)('System', 'New language added', null, false), 'success')(dispatch);
  });
}

function deleteLanguage(key) {
  return (dispatch) =>
  _I18NApi.default.deleteLanguage(new _RequestParams.RequestParams({ key })).then(() => {
    notifications.notify((0, _t2.default)('System', 'Language deleted', null, false), 'success')(dispatch);
  });
}

function setDefaultLanguage(key) {
  return (dispatch) =>
  _I18NApi.default.setDefaultLanguage(new _RequestParams.RequestParams({ key })).then(() => {
    notifications.notify(
    (0, _t2.default)('System', 'Default language change success', null, false),
    'success')(
    dispatch);
  });
}