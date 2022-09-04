"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _reactRouter = require("react-router");

var _ = require("./");
var _notificationsActions = require("../Notifications/actions/notificationsActions");
var _store = require("../store");
var _LoadingProgressBar = _interopRequireDefault(require("../App/LoadingProgressBar"));

var _config = require("../config.js");
var _JSONRequest = _interopRequireDefault(require("../../shared/JSONRequest"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

let API_URL = _config.APIURL;
let language;

const doneLoading = (data) => {
  _LoadingProgressBar.default.done();
  return data;
};

const isNonUsualApiError = (error) => error.status && ![401, 404, 409, 500].includes(error.status);

const errorMessages = [
{
  key: /PayloadTooLargeError: request entity too large/g,
  message: 'Request data too large. Please review text length in property values' },

{
  key: /ERROR Failed to index documents: (.+)/g,
  message: 'Failed to index documents: {0} ' }];



function extractMessageFromError(error) {
  let finalMessage = `An error has occurred, it has been logged with request id #${error.json.requestId}.`;
  if (!error.json.error) return finalMessage;

  const errorMessage = errorMessages.find((errorExpression) =>
  error.json.error.match(errorExpression.key));

  if (errorMessage) {
    const matches = errorMessage.key.exec(error.json.error);
    finalMessage = errorMessage.message;
    for (let i = 0; i < matches.length - 1; i += 1) {
      finalMessage = finalMessage.replace(`{${i}}`, matches[1]);
    }
  }
  return finalMessage;
}

function extractMessageFromValidation(error) {
  if (!error.json.validations) return error.json.error;
  return error.json.validations.reduce(
  (message, validationError) =>
  `${message} ${validationError.instancePath} ${validationError.message},`,
  `${error.json.error}: `);

}

const handleErrorStatus = (error) => {
  switch (error.status || true) {
    case 400:
    case 422:
      _store.store.dispatch((0, _notificationsActions.notify)(extractMessageFromValidation(error), 'danger'));
      break;

    case 401:
      _reactRouter.browserHistory.replace('/login');
      break;

    case 404:
      _reactRouter.browserHistory.replace('/404');
      break;

    case 409:
      _store.store.dispatch((0, _notificationsActions.notify)(error.json.error, 'warning'));
      break;

    case 500:
      _store.store.dispatch((0, _notificationsActions.notify)(extractMessageFromError(error), 'danger'));
      break;

    case isNonUsualApiError(error):
      _store.store.dispatch((0, _notificationsActions.notify)(error.json.prettyMessage || error.json.error, 'danger'));
      break;

    case error instanceof TypeError:
      _store.store.dispatch((0, _notificationsActions.notify)('Could not reach server. Please try again later.', 'danger'));
      break;

    default:
      _store.store.dispatch((0, _notificationsActions.notify)('An error has occurred', 'danger'));}

};

const handleError = (e, endpoint) => {
  const error = e;
  error.endpoint = endpoint;

  if (!_.isClient) {
    return Promise.reject(error);
  }

  doneLoading();

  handleErrorStatus(error);
  return Promise.reject(error);
};

const _request = (url, req, method) => {
  _LoadingProgressBar.default.start();
  return _JSONRequest.default[method](API_URL + url, req.data, _objectSpread(_objectSpread({
    'Content-Language': language },
  req.headers), {}, {
    'X-Requested-With': 'XMLHttpRequest' })).

  then(doneLoading).
  catch((e) => handleError(e, { url, method }));
};var _default =

{
  get: (url, req = {}) => _request(url, req, 'get'),

  post: (url, req = {}) => _request(url, req, 'post'),

  put: (url, req = {}) => _request(url, req, 'put'),

  delete: (url, req = {}) => _request(url, req, 'delete'),

  cookie(c) {
    _JSONRequest.default.cookie(c);
  },

  locale(locale) {
    language = locale;
  },

  APIURL(url) {
    API_URL = url;
  } };exports.default = _default;