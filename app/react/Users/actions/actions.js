"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deleteUser = deleteUser;exports.loadUsers = loadUsers;exports.newUser = newUser;exports.saveUser = saveUser;var _BasicReducer = require("../../BasicReducer");
var _Notifications = require("../../Notifications");
var _RequestParams = require("../../utils/RequestParams");




var _UsersAPI = _interopRequireDefault(require("../UsersAPI"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function deleteUser(user) {
  return (dispatch) =>
  _UsersAPI.default.delete(new _RequestParams.RequestParams(user)).then(() => {
    dispatch(_BasicReducer.actions.remove('users', user));
    dispatch(_Notifications.notificationActions.notify('Deleted successfully.', 'success'));
  });
}

function saveUser(user) {
  return async (dispatch) => {
    await _UsersAPI.default.save(new _RequestParams.RequestParams(user));
    const userToNotify = _objectSpread({}, user);
    delete userToNotify.password;
    dispatch(_BasicReducer.actions.update('users', userToNotify));
    dispatch(_Notifications.notificationActions.notify('Saved successfully.', 'success'));
  };
}

function newUser(user) {
  return async (dispatch) => {
    const createdUser = await _UsersAPI.default.new(new _RequestParams.RequestParams(user));
    const userToNotify = _objectSpread(_objectSpread({}, user), createdUser);
    delete userToNotify.password;
    dispatch(_BasicReducer.actions.push('users', userToNotify));
    dispatch(_Notifications.notificationActions.notify('Created successfully.', 'success'));
  };
}

function loadUsers() {
  return async (dispatch) => {
    const users = await _UsersAPI.default.get(new _RequestParams.RequestParams());
    dispatch(_BasicReducer.actions.set('users', users));
  };
}