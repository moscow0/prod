"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.addReference = addReference;exports.deleteReference = deleteReference;exports.loadReferences = loadReferences;exports.saveTargetRangedReference = saveTargetRangedReference;exports.setReferences = setReferences;var types = _interopRequireWildcard(require("./actionTypes"));
var _referencesAPI = _interopRequireDefault(require("../referencesAPI"));
var _Notifications = require("../../Notifications");
var _BasicReducer = require("../../BasicReducer");
var _RequestParams = require("../../utils/RequestParams");

var _Connections = require("../../Connections");
var _actions = require("../../Relationships/actions/actions");
var uiActions = _interopRequireWildcard(require("./uiActions"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function setReferences(references) {
  return {
    type: types.SET_REFERENCES,
    references };

}

function loadReferences(sharedId) {
  return (dispatch) =>
  _referencesAPI.default.get(new _RequestParams.RequestParams({ sharedId })).then((references) => {
    dispatch(setReferences(references));
  });
}

function addReference(references, delayActivation) {
  return (dispatch, getState) => {
    const tab = 'references';

    dispatch({ type: types.ADD_REFERENCE, reference: references.saves[1] });
    dispatch({ type: types.ADD_REFERENCE, reference: references.saves[0] });

    dispatch(_BasicReducer.actions.unset('viewer/targetDoc'));
    dispatch(_BasicReducer.actions.unset('viewer/targetDocHTML'));
    dispatch(_BasicReducer.actions.unset('viewer/targetDocReferences'));
    dispatch((0, _actions.reloadRelationships)(getState().relationships.list.sharedId));

    dispatch(uiActions.activateReference(references.saves[0], tab, delayActivation));
  };
}

function saveTargetRangedReference(connection, targetRange, targetFile, onCreate) {
  return (dispatch, getState) => {
    if (targetRange.text) {
      dispatch(_BasicReducer.actions.unset('viewer/targetDocReferences'));
      return _Connections.actions.saveConnection(_objectSpread(_objectSpread({},
      connection), {}, { targetRange, targetFile }),
      onCreate)(
      dispatch, getState);
    }
    return undefined;
  };
}

function deleteReference(reference) {
  const { _id } = reference.associatedRelationship;
  return (dispatch, getState) =>
  _referencesAPI.default.delete(new _RequestParams.RequestParams({ _id })).then(() => {
    dispatch((0, _actions.reloadRelationships)(getState().relationships.list.sharedId));
    dispatch({ type: types.REMOVE_REFERENCE, reference });
    dispatch(_Notifications.notificationActions.notify('Connection deleted', 'success'));
  });
}