"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.IGNORED_ENDPOINTS = exports.BODY_REQUIRED_ENDPOINTS = void 0;var _files = require("../files");
var _date = _interopRequireDefault(require("../utils/date"));
var _tenants = require("../tenants");
var _stream = require("stream");
var _activitylog = _interopRequireDefault(require("./activitylog"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


const ignoredMethods = ['GET', 'OPTIONS', 'HEAD'];
const IGNORED_ENDPOINTS = [
'/api/login',
'/api/contact',
'/api/unlockaccount',
'/api/resetpassword',
'/api/recoverpassword',
'/api/documents/pdfInfo',
'/api/documents/download',
'/api/attachments/download',
'/api/semantic-search/notify-updates',
'/api/sync',
'/api/sync/upload'];exports.IGNORED_ENDPOINTS = IGNORED_ENDPOINTS;

const BODY_REQUIRED_ENDPOINTS = [
'/api/files/upload/document',
'/api/files/upload/custom',
'/api/attachments/upload',
'/api/public'];exports.BODY_REQUIRED_ENDPOINTS = BODY_REQUIRED_ENDPOINTS;


function mustBeLogged(baseurl, method, body) {
  const isLoggedRequest =
  baseurl.includes('/api/') &&
  !ignoredMethods.includes(method) &&
  !IGNORED_ENDPOINTS.includes(baseurl);
  const validBody = !BODY_REQUIRED_ENDPOINTS.includes(baseurl) || JSON.stringify(body) !== '{}';
  return isLoggedRequest && validBody;
}

const createEntry = (req, url) => {
  const { method, params, query, body, user = {} } = req;
  const expireAt = _date.default.addYearsToCurrentDate(1);
  const bodyLog = _objectSpread({}, body);
  if (bodyLog.password) bodyLog.password = '*****';
  return {
    url,
    method,
    params: JSON.stringify(params),
    query: JSON.stringify(query),
    body: JSON.stringify(bodyLog),
    user: user._id,
    username: user.username,
    time: Date.now(),
    expireAt };

};var _default =

(req, _res, next) => {
  const { url, method, body = {} } = req;
  const baseurl = url.split('?').shift() || '';
  if (mustBeLogged(baseurl, method, body)) {
    const entry = createEntry(req, baseurl);
    // eslint-disable-next-line no-void
    void _activitylog.default.save(entry);
    // eslint-disable-next-line no-void
    void _files.storage.storeFile(
    `${_tenants.tenants.current().name}_${entry.time}_activity.log`,
    _stream.Readable.from([JSON.stringify(entry)]),
    'activitylog');

  }
  next();
};exports.default = _default;