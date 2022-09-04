"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.formatter = exports.formatInfo = exports.addTenant = void 0;var _winston = _interopRequireDefault(require("winston"));

var _tenants = require("../tenants");
var _config = require("../config");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const addTenant = (info, { instanceName }) => {
  let tenantName = instanceName;
  let tenantError;

  try {
    const tenant = _tenants.tenants.current();
    tenantName = tenant.name === _config.config.defaultTenant.name ? instanceName : tenant.name;
  } catch (err) {
    tenantError = err;
  }

  return _objectSpread(_objectSpread({}, info), {}, { tenant: tenantName, tenantError });
};exports.addTenant = addTenant;

const formatInfo = (info) => {
  const message = info.message && info.message.join ? info.message.join('\n') : info.message;
  return `${info.timestamp} [${info.tenant}] ${message}${
  info.tenantError ? `\n[Tenant error] ${info.tenantError}` : ''
  }`;
};exports.formatInfo = formatInfo;

const formatter = (DATABASE_NAME) =>
_winston.default.format.combine(
_winston.default.format.timestamp(),
_winston.default.format(addTenant)({ instanceName: DATABASE_NAME }),
_winston.default.format.printf((info) => formatInfo(info)));exports.formatter = formatter;