"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.FakeMailer = void 0;


class FakeMailer {
  // eslint-disable-next-line class-methods-use-this
  sendMail(
  _mailOptions,
  callback)
  {
    console.log('Fake sent of mail with:', _mailOptions);
    callback(null, '');
  }}exports.FakeMailer = FakeMailer;var _default =


{
  createTransport: (_transporter, _defaults) => new FakeMailer() };exports.default = _default;