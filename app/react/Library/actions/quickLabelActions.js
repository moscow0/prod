"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.maybeSaveQuickLabels = maybeSaveQuickLabels;exports.selectedDocumentsChanged = selectedDocumentsChanged;exports.toggleQuickLabelAutoSave = toggleQuickLabelAutoSave;var _BasicReducer = require("../../BasicReducer");
var _EntitiesAPI = _interopRequireDefault(require("../../Entities/EntitiesAPI"));

var _Notifications = require("../../Notifications");
var _RequestParams = require("../../utils/RequestParams");
var _reactReduxForm = require("react-redux-form");

var _commonTopicClassification = require("../../../shared/commonTopicClassification");


var _libraryActions = require("./libraryActions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function toggleQuickLabelAutoSave() {
  return (dispatch, getState) => {
    const opts = getState().library.sidepanel.quickLabelState.toJS();
    dispatch(
    _BasicReducer.actions.set('library.sidepanel.quickLabelState', _objectSpread(_objectSpread({},
    opts), {}, {
      autoSave: !opts.autoSave })));


  };
}

function buildQuickLabelMetadata(docs, propNames) {
  const counts = propNames.reduce(
  (res, p) => _objectSpread(_objectSpread({}, res), {}, { [p]: {} }),
  {});

  docs.forEach((d) =>
  propNames.forEach((p) => {
    if (!d.metadata || !d.metadata[p]) {
      return;
    }
    if (!counts[p]) {
      counts[p] = {};
    }
    d.metadata[p].forEach((mo) => {
      if (!mo.value) {
        return;
      }
      if (!counts[p][mo.value]) {
        counts[p][mo.value] = 1;
      } else {
        counts[p][mo.value] += 1;
      }
    });
  }));

  return propNames.reduce(
  (res, p) => _objectSpread(_objectSpread({},
  res), {}, {
    [p]: {
      added: [],
      removed: [],
      originalFull: Object.keys(counts[p]).filter((k) => counts[p][k] === docs.length),
      originalPartial: Object.keys(counts[p]).filter((k) => counts[p][k] < docs.length) } }),


  {});

}

function selectedDocumentsChanged() {
  return (dispatch, getState) => {var _state$library, _state$library$sidepa, _state$library$sidepa2;
    const model = 'library.sidepanel.quickLabelMetadata';
    const state = getState();
    if (!((_state$library = state.library) !== null && _state$library !== void 0 && (_state$library$sidepa = _state$library.sidepanel) !== null && _state$library$sidepa !== void 0 && (_state$library$sidepa2 = _state$library$sidepa.quickLabelState) !== null && _state$library$sidepa2 !== void 0 && _state$library$sidepa2.get('thesaurus'))) {
      return;
    }
    dispatch(_reactReduxForm.actions.reset(model));
    const sharedIds = state.library.ui.
    get('selectedDocuments').
    map((d) => d.get('sharedId')).
    toJS();
    const docs = state.library.documents.
    get('rows').
    filter((d) => sharedIds.includes(d.get('sharedId'))).
    toJS();
    if (!docs.length) {
      return;
    }
    const templateIds = docs.map((d) => d.template).filter((v) => v);
    const templates = state.templates.filter((t) => templateIds.includes(t.get('_id'))).toJS();
    const propNames = (0, _commonTopicClassification.getThesaurusPropertyNames)(
    state.library.sidepanel.quickLabelState.get('thesaurus'),
    templates);

    const newState = buildQuickLabelMetadata(docs, propNames);
    dispatch(_reactReduxForm.actions.load(model, newState));
    dispatch(_reactReduxForm.actions.setPristine(model));
  };
}

function maybeSaveQuickLabels(force) {
  return async (dispatch, getState) => {var _state$library2, _state$library2$sidep, _state$library2$sidep2;
    const state = getState();
    if (!force && !((_state$library2 = state.library) !== null && _state$library2 !== void 0 && (_state$library2$sidep = _state$library2.sidepanel) !== null && _state$library2$sidep !== void 0 && (_state$library2$sidep2 = _state$library2$sidep.quickLabelState) !== null && _state$library2$sidep2 !== void 0 && _state$library2$sidep2.get('autoSave'))) {
      return;
    }
    const current = state.library.sidepanel.quickLabelMetadata;
    const diffs =

    {};
    Object.keys(current).forEach((p) => {
      if (current[p] && current[p].added.length + current[p].removed.length > 0) {
        diffs[p] = {
          added: current[p].added.map((v) => ({ value: v })),
          removed: current[p].removed.map((v) => ({ value: v })) };

      }
    });
    if (!diffs || !Object.keys(diffs).length) {
      return;
    }
    const ids = state.library.ui.
    get('selectedDocuments').
    map((entity) => entity.get('sharedId')).
    toJS();
    const updatedDocs = await _EntitiesAPI.default.multipleUpdate(
    new _RequestParams.RequestParams({ ids, values: { diffMetadata: diffs } }));

    dispatch(_Notifications.notificationActions.notify('Update success', 'success'));
    dispatch((0, _libraryActions.updateEntities)(updatedDocs));
    dispatch(selectedDocumentsChanged());
  };
}