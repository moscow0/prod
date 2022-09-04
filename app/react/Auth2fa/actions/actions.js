"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.enable2fa = enable2fa;exports.reset2fa = reset2fa;

var _BasicReducer = require("../../BasicReducer");
var _Notifications = require("../../Notifications");
var _RequestParams = require("../../utils/RequestParams");


var _Auth2faAPI = _interopRequireDefault(require("../Auth2faAPI"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







function enable2fa() {
  return _BasicReducer.actions.setIn('auth/user', 'using2fa', true);
}

function reset2fa(user) {
  return async (dispatch) => {
    await _Auth2faAPI.default.reset2fa(new _RequestParams.RequestParams({ _id: user._id }));
    dispatch(_BasicReducer.actions.update('users', _objectSpread(_objectSpread({}, user), {}, { using2fa: false })));
    dispatch(_Notifications.notificationActions.notify('Deleted successfully.', 'success'));
  };
}