"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.verifyToken = exports.setSecret = exports.reset2fa = exports.enable2fa = void 0;var otplib = _interopRequireWildcard(require("otplib"));

var _settings = _interopRequireDefault(require("../settings"));
var _usersModel = _interopRequireDefault(require("../users/usersModel"));
var _utils = require("../utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const checkUserExists = (user) => {
  if (!user) {
    throw (0, _utils.createError)('User not found', 403);
  }
};

const getUser = async (user, options) => {
  const [dbUser] = await _usersModel.default.get({ _id: user._id }, options);
  checkUserExists(dbUser);
  return dbUser;
};

const conformSiteName = async () => {
  const { site_name: siteName = '' } = await _settings.default.get();
  return siteName.length > 30 ? `${siteName.substring(0, 30)}...` : siteName;
};

const setSecret = async (user) => {
  const dbUser = await getUser({ _id: user._id });
  const siteName = await conformSiteName();
  const secret = otplib.authenticator.generateSecret();
  const otpauth = otplib.authenticator.keyuri(dbUser.username || '', siteName, secret);

  if (!dbUser.using2fa) {
    await _usersModel.default.save({ _id: dbUser._id, secret });
    return { secret, otpauth };
  }

  throw (0, _utils.createError)('Unauthorized', 401);
};exports.setSecret = setSecret;

const verifyToken = async (user, token) => {
  const dbUser = await getUser({ _id: user._id }, '+secret');
  if (otplib.authenticator.verify({ token, secret: dbUser.secret })) {
    return { validToken: true, dbUser };
  }

  throw (0, _utils.createError)('Two-factor authentication failed.', 401);
};exports.verifyToken = verifyToken;

const enable2fa = async (user, token) => {
  try {
    const { dbUser } = await verifyToken(user, token);
    return _usersModel.default.save({ _id: dbUser._id, using2fa: true });
  } catch (err) {
    if (err.code === 401) {
      throw (0, _utils.createError)('The token does not validate against the secret key!', 409);
    }

    throw err;
  }
};exports.enable2fa = enable2fa;

const reset2fa = async (user) => {
  const dbUser = await getUser({ _id: user._id });
  return _usersModel.default.save({ _id: dbUser._id, using2fa: false, secret: undefined });
};exports.reset2fa = reset2fa;