"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getAndLoadEntity = getAndLoadEntity;exports.switchOneUpEntity = switchOneUpEntity;exports.toggleOneUpFullEdit = toggleOneUpFullEdit;exports.toggleOneUpLoadConnections = toggleOneUpLoadConnections;var _BasicReducer = require("../../BasicReducer");
var _EntitiesAPI = _interopRequireDefault(require("../../Entities/EntitiesAPI"));
var _filterBaseProperties = _interopRequireDefault(require("../../Entities/utils/filterBaseProperties"));
var _Metadata = require("../../Metadata");
var _actions = require("../../Metadata/actions/actions");
var relationships = _interopRequireWildcard(require("../../Relationships/utils/routeUtils"));
var _RequestParams = require("../../utils/RequestParams");
var _immutable = _interopRequireDefault(require("immutable"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




async function getAndLoadEntity(
requestParams,
templates,
state,
loadConnections)
{
  const [[entity], [connectionsGroups, searchResults, sort, filters]] = await Promise.all([
  _EntitiesAPI.default.get(requestParams),
  loadConnections ?
  relationships.requestState(requestParams, state) :
  [[], { rows: [] }, {}, _immutable.default.fromJS({})]]);


  return [
  _BasicReducer.actions.set('entityView/entity', entity),
  relationships.setReduxState({
    relationships: {
      list: {
        sharedId: entity.sharedId,
        entity,
        connectionsGroups,
        searchResults,
        sort,
        filters,
        view: 'graph' } } }),



  ...(0, _actions.loadFetchedInReduxForm)('entityView.entityForm', entity, templates)];

}

function toggleOneUpFullEdit() {
  return async (dispatch, getState) => {var _state$oneUpReview$st;
    const state = getState();
    const oneUpState = (_state$oneUpReview$st = state.oneUpReview.state) === null || _state$oneUpReview$st === void 0 ? void 0 : _state$oneUpReview$st.toJS();
    if (oneUpState && oneUpState.fullEdit && !state.entityView.entityFormState.$form.pristine) {
      const entity = await _EntitiesAPI.default.denormalize(
      new _RequestParams.RequestParams(
      (0, _Metadata.wrapEntityMetadata)(_filterBaseProperties.default.filterBaseProperties(state.entityView.entityForm))));


      dispatch(_BasicReducer.actions.set('entityView/entity', entity));
    }
    dispatch(
    _BasicReducer.actions.set('oneUpReview.state', _objectSpread(_objectSpread({},
    oneUpState), {}, {
      fullEdit: oneUpState ? !oneUpState.fullEdit : false })));


  };
}

async function switchToEntity(
dispatch,
index,
state,
oneUpState)
{
  const sharedId =
  index < oneUpState.totalDocs ?
  state.library.documents.get('rows').get(index).get('sharedId') :
  '';

  [
  ...(sharedId ?
  await getAndLoadEntity(
  new _RequestParams.RequestParams({ sharedId }, oneUpState.requestHeaders),
  state.templates.toJS(),
  state,
  oneUpState.loadConnections) :

  []),
  _BasicReducer.actions.set('oneUpReview.state', _objectSpread(_objectSpread({},
  oneUpState), {}, {
    indexInDocs: index }))].

  forEach((action) => {
    dispatch(action);
  });
}

function switchOneUpEntity(delta, save) {
  return async (dispatch, getState) => {var _state$oneUpReview$st2;
    const state = getState();
    const oneUpState = (_state$oneUpReview$st2 = state.oneUpReview.state) === null || _state$oneUpReview$st2 === void 0 ? void 0 : _state$oneUpReview$st2.toJS();
    if (!oneUpState) {
      return;
    }
    if (save) {
      const entity = (0, _Metadata.wrapEntityMetadata)(
      _filterBaseProperties.default.filterBaseProperties(state.entityView.entityForm));

      await _EntitiesAPI.default.save(new _RequestParams.RequestParams(entity, oneUpState.requestHeaders));
    }
    const current = state.entityView.entity.get('sharedId');
    const index = Math.max(
    0,
    Math.min(
    state.library.documents.get('rows').findIndex((e) => e.get('sharedId') === current) + delta,
    oneUpState.totalDocs - 1));


    await switchToEntity(dispatch, index, state, oneUpState);
  };
}

function toggleOneUpLoadConnections() {
  return async (dispatch, getState) => {var _state$oneUpReview$st3;
    const state = getState();
    const oneUpState = (_state$oneUpReview$st3 = state.oneUpReview.state) === null || _state$oneUpReview$st3 === void 0 ? void 0 : _state$oneUpReview$st3.toJS();
    if (!oneUpState) {
      return;
    }
    dispatch(
    _BasicReducer.actions.set('oneUpReview.state', _objectSpread(_objectSpread({},
    oneUpState), {}, {
      loadConnections: !oneUpState.loadConnections })));


    await dispatch(switchOneUpEntity(0, false));
  };
}