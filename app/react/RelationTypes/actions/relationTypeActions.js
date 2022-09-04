"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.resetRelationType = resetRelationType;exports.saveRelationType = saveRelationType;var types = _interopRequireWildcard(require("./actionTypes"));
var _RelationTypesAPI = _interopRequireDefault(require("../RelationTypesAPI"));
var _BasicReducer = require("../../BasicReducer");
var _Notifications = require("../../Notifications");
var _I18N = require("../../I18N");
var _RequestParams = require("../../utils/RequestParams");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function saveRelationType(relationType) {
  return (dispatch) =>
  _RelationTypesAPI.default.save(new _RequestParams.RequestParams(relationType)).then((response) => {
    dispatch({ type: types.RELATION_TYPE_SAVED });
    dispatch(_BasicReducer.actions.push('relationTypes', response));
    dispatch(
    _Notifications.notificationActions.notify((0, _I18N.t)('System', 'RelationType saved', null, false), 'success'));

  });
}

function resetRelationType() {
  return { type: types.RESET_RELATION_TYPE };
}