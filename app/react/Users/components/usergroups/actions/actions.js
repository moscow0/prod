"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deleteUserGroup = deleteUserGroup;exports.loadUserGroups = loadUserGroups;exports.saveUserGroup = saveUserGroup;


var _BasicReducer = require("../../../../BasicReducer");
var _RequestParams = require("../../../../utils/RequestParams");
var _Notifications = require("../../../../Notifications");
var _tsUtils = require("../../../../../shared/tsUtils");
var _UserGroupsAPI = require("../UserGroupsAPI");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function loadUserGroups() {
  return async (dispatch) => {
    const userGroups = await (0, _UserGroupsAPI.getGroups)(new _RequestParams.RequestParams());
    dispatch(_BasicReducer.actions.set('userGroups', userGroups));
  };
}

function saveUserGroup(userGroup) {
  return async (dispatch) => {
    const savedUserGroup = await (0, _UserGroupsAPI.saveGroup)(new _RequestParams.RequestParams(userGroup));
    const userGroupToDispatch = _objectSpread(_objectSpread({}, savedUserGroup), {}, { members: userGroup.members });
    if (userGroup._id) {
      dispatch(_BasicReducer.actions.update('userGroups', userGroupToDispatch));
      dispatch(_Notifications.notificationActions.notify('Group updated', 'success'));
    } else {
      dispatch(_BasicReducer.actions.push('userGroups', userGroupToDispatch));
      dispatch(_Notifications.notificationActions.notify('Group created', 'success'));
    }
  };
}

function deleteUserGroup(userGroup) {
  return async (dispatch) => {
    await (0, _UserGroupsAPI.deleteGroup)(new _RequestParams.RequestParams({ _id: (0, _tsUtils.ensure)(userGroup._id) }));
    dispatch(_BasicReducer.actions.remove('userGroups', userGroup));
    dispatch(_Notifications.notificationActions.notify('Group deleted', 'success'));
  };
}