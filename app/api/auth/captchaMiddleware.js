"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _CaptchaModel = require("./CaptchaModel");


function getCaptchaValue(req) {
  if (req.body && req.body.captcha) {
    return JSON.parse(req.body.captcha);
  }

  if (req.get('Captcha-text') && req.get('Captcha-id')) {
    return {
      id: req.get('Captcha-id'),
      text: req.get('Captcha-text') };

  }

  return null;
}

function sendForbidden(res) {
  res.status(403);
  return res.json({ error: 'Captcha error', message: 'Forbidden' });
}var _default =

() => async (req, res, next) => {
  const submitedCaptcha = getCaptchaValue(req);

  if (!submitedCaptcha) return sendForbidden(res);

  const [captcha] = await _CaptchaModel.CaptchaModel.get({ _id: submitedCaptcha.id });

  if (captcha && captcha.text === submitedCaptcha.text) {
    delete req.body.captcha;
    await _CaptchaModel.CaptchaModel.delete(captcha);
    return next();
  }

  return sendForbidden(res);
};exports.default = _default;