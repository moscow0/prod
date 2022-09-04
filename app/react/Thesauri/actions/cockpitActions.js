"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.startTraining = startTraining;exports.toggleEnableClassification = toggleEnableClassification;exports.updateCockpitData = updateCockpitData;var _BasicReducer = require("../../BasicReducer");
var _I18N = require("../../I18N");

var notifications = _interopRequireWildcard(require("../../Notifications/actions/notificationsActions"));
var _SearchAPI = _interopRequireDefault(require("../../Search/SearchAPI"));
var _suggestions = require("../../Settings/utils/suggestions");




var _ThesauriAPI = _interopRequireDefault(require("../ThesauriAPI"));
var _api = _interopRequireDefault(require("../../utils/api"));
var _RequestParams = require("../../utils/RequestParams");



var _suggestionQuery = require("../utils/suggestionQuery");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function toggleEnableClassification() {
  return async (dispatch, getState) => {
    const thesaurus = getState().thesauri.thesaurus.toJS();
    thesaurus.enable_classification = !thesaurus.enable_classification;
    const _updatedThesaurus = await _ThesauriAPI.default.save(new _RequestParams.RequestParams(thesaurus));
    dispatch(
    notifications.notify(
    (0, _I18N.t)(
    'System',
    thesaurus.enable_classification ?
    `You will now see suggestions for ${_updatedThesaurus.name}.` :
    `You will no longer see suggestions for ${_updatedThesaurus.name}.`,
    null,
    false),

    'success'));


    dispatch(_BasicReducer.actions.set('thesauri.thesaurus', _updatedThesaurus));
  };
}

async function getAndPopulateLabelCounts(
templates,
queryBuilderFunc,
assocProp,
countSuggestions = true)
{var _assocProp$name2;
  if (!assocProp) {
    return { totalRows: 0, totalLabels: 0, thesaurus: { propertyName: '', totalValues: {} } };
  }
  const docsWithSuggestions = await Promise.all(
  templates.map((template) => {
    const reqParams = new _RequestParams.RequestParams(queryBuilderFunc(template._id, assocProp));
    return _SearchAPI.default.search(reqParams);
  }));

  const sanitizedSuggestionsTBPublished = docsWithSuggestions.map((s) => {var _assocProp$name;return (
      (0, _suggestionQuery.buildLabelCounts)(s, (_assocProp$name = assocProp === null || assocProp === void 0 ? void 0 : assocProp.name) !== null && _assocProp$name !== void 0 ? _assocProp$name : '', countSuggestions));});

  return (0, _suggestionQuery.flattenLabelCounts)(sanitizedSuggestionsTBPublished, (_assocProp$name2 = assocProp === null || assocProp === void 0 ? void 0 : assocProp.name) !== null && _assocProp$name2 !== void 0 ? _assocProp$name2 : '');
}

function updateCockpitData(_serverRequestParams) {
  return async (dispatch, getState) => {var _state$thesauri$sugge;
    const requestParams = _serverRequestParams !== null && _serverRequestParams !== void 0 ? _serverRequestParams : new _RequestParams.RequestParams();
    const state = getState();
    const thesaurus = state.thesauri.thesaurus.toJS();
    const templates = state.templates.toJS();
    const assocProp = (_state$thesauri$sugge = state.thesauri.suggestInfo.get('property')) === null || _state$thesauri$sugge === void 0 ? void 0 : _state$thesauri$sugge.toJS();
    const [
    syncState,
    trainState,
    model,
    docsWithSuggestionsForPublish,
    docsWithSuggestionsForReview,
    docsWithLabels] =
    await Promise.all([
    _api.default.get('tasks', requestParams.set({ name: 'TopicClassificationSync' })),
    _ThesauriAPI.default.getModelTrainStatus(requestParams.set({ thesaurus: thesaurus.name })),
    _ThesauriAPI.default.getModelStatus(requestParams.set({ thesaurus: thesaurus.name })),
    getAndPopulateLabelCounts(templates, _suggestions.getReadyToPublishSuggestionsQuery, assocProp),
    getAndPopulateLabelCounts(templates, _suggestions.getReadyToReviewSuggestionsQuery, assocProp),
    getAndPopulateLabelCounts(templates, _suggestions.getLabelsQuery, assocProp, false)]);

    dispatch(
    _BasicReducer.actions.set('thesauri.suggestInfo', {
      model,
      property: assocProp,
      docsWithSuggestionsForPublish,
      docsWithSuggestionsForReview,
      docsWithLabels }));


    dispatch(
    _BasicReducer.actions.set('thesauri.tasksState', { SyncState: syncState.json, TrainState: trainState }));

  };
}

function startTraining() {
  return async (dispatch, getState) => {
    const thesaurus = getState().thesauri.thesaurus.toJS();
    await _ThesauriAPI.default.trainModel(new _RequestParams.RequestParams({ thesaurusId: thesaurus._id.toString() }));
    await dispatch(updateCockpitData());
  };
}