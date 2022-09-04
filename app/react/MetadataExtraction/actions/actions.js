"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.scrollToPage = exports.saveConfigurations = exports.fetchFile = exports.fetchEntity = exports.acceptSuggestion = void 0;

var _I18N = require("../../I18N");
var _Notifications = require("../../Notifications");

var _RequestParams = require("../../utils/RequestParams");
var _api = _interopRequireDefault(require("../../utils/api"));
var _SuggestionsAPI = require("../SuggestionsAPI");
var _EntitiesAPI = _interopRequireDefault(require("../../Entities/EntitiesAPI"));
var _Scroller = _interopRequireDefault(require("../../Viewer/utils/Scroller"));
var _BasicReducer = require("../../BasicReducer");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



const saveConfigurations =
(newSettingsConfigs) => async (dispatch) => {
  const settings = await (0, _SuggestionsAPI.saveConfigurations)(new _RequestParams.RequestParams(newSettingsConfigs));
  dispatch(_BasicReducer.actions.set('settings/collection', settings));
  dispatch(_Notifications.notificationActions.notify((0, _I18N.t)('System', 'Settings updated'), 'success'));
};exports.saveConfigurations = saveConfigurations;

const fetchEntity = async (entityId, language) => {
  const entityRequest = new _RequestParams.RequestParams({ _id: entityId });
  return _EntitiesAPI.default.get(entityRequest, language);
};exports.fetchEntity = fetchEntity;

const fetchFile = async (fileId) => {
  const fileRequest = new _RequestParams.RequestParams({ _id: fileId });
  return _api.default.get('files', fileRequest);
};exports.fetchFile = fetchFile;

const scrollToPage = async (pageNumber) =>
_Scroller.default.to(`.document-viewer div#page-${pageNumber}`, '.document-viewer', {
  duration: 0,
  dividerOffset: 1,
  offset: 50 });exports.scrollToPage = scrollToPage;


const acceptSuggestion =
(suggestion, allLanguages) =>
async (dispatch) => {
  const params = new _RequestParams.RequestParams({
    allLanguages,
    suggestion: {
      _id: suggestion._id,
      sharedId: suggestion.sharedId,
      entityId: suggestion.entityId } });


  const result = await (0, _SuggestionsAPI.acceptEntitySuggestion)(params);
  if (result.success) {
    dispatch(_Notifications.notificationActions.notify('Saved successfully.', 'success'));
  }
};exports.acceptSuggestion = acceptSuggestion;