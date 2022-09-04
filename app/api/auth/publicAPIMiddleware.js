"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.publicAPIMiddleware = void 0;
var _settings = _interopRequireDefault(require("../settings"));
var _index = require("./index");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const publicAPIMiddleware = async (req, res, next) => {
  const { openPublicEndpoint } = await _settings.default.get();
  const bypassCaptcha = req.get('Bypass-Captcha');

  if (openPublicEndpoint && bypassCaptcha === 'true') {
    return next();
  }

  return (0, _index.captchaAuthorization)()(req, res, next);
};exports.publicAPIMiddleware = publicAPIMiddleware;