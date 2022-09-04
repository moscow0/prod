"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.requestViewerState = requestViewerState;exports.setViewerState = setViewerState;var _BasicReducer = require("../../BasicReducer");
var _documentActions = require("./documentActions");
var _referencesAPI = _interopRequireDefault(require("../referencesAPI"));
var _RelationTypesAPI = _interopRequireDefault(require("../../RelationTypes/RelationTypesAPI"));
var relationships = _interopRequireWildcard(require("../../Relationships/utils/routeUtils"));

var _referencesActions = require("./referencesActions");
var _EntitiesAPI = _interopRequireDefault(require("../../Entities/EntitiesAPI"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function setViewerState(state) {
  return (dispatch) => {
    const { documentViewer } = state;
    dispatch(_BasicReducer.actions.set('relationTypes', state.relationTypes));
    dispatch(_BasicReducer.actions.set('viewer/doc', documentViewer.doc));
    dispatch(_BasicReducer.actions.set('viewer/relationTypes', documentViewer.relationTypes));
    dispatch(_BasicReducer.actions.set('viewer/rawText', documentViewer.rawText));
    dispatch((0, _referencesActions.setReferences)(documentViewer.references));
    dispatch(relationships.setReduxState(state));
  };
}

async function requestViewerState(requestParams, globalResources) {
  const { sharedId, raw, page } = requestParams.data;
  const defaultLanguage = globalResources.settings.collection.
  get('languages').
  find((l) => l.get('default'));

  const [doc, relationTypes, [connectionsGroups, searchResults, sort]] = await Promise.all([
  (0, _documentActions.getDocument)(
  requestParams.set({ sharedId }),
  defaultLanguage ? defaultLanguage.get('key') : 'en',
  requestParams.data.file),

  _RelationTypesAPI.default.get(requestParams.onlyHeaders()),
  relationships.requestState(requestParams.set({ sharedId }), globalResources.templates)]);


  const { defaultDoc } = doc;
  const rawText = raw ?
  await _EntitiesAPI.default.getRawPage(requestParams.set({ _id: defaultDoc._id, page })) :
  '';

  const references = await _referencesAPI.default.get(
  requestParams.set({ sharedId, file: doc.defaultDoc._id, onlyTextReferences: true }));


  return [
  setViewerState({
    documentViewer: {
      doc: _objectSpread(_objectSpread({},
      doc), {}, {
        relations: references }),

      references,
      relationTypes,
      rawText },

    relationships: {
      list: {
        sharedId: doc.sharedId,
        entity: doc,
        connectionsGroups,
        searchResults,
        sort,
        filters: {},
        view: 'graph' } },


    relationTypes })];


}