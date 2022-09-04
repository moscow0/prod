"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mailer = _interopRequireDefault(require("../config/mailer"));
var _settings = _interopRequireDefault(require("../settings/settings"));
var _mailerTransport = require("./mailerTransport");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let transporterOptions = {
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail',
  secure: false,
  tls: {
    rejectUnauthorized: false } };



if (Object.keys(_mailer.default).length) {
  transporterOptions = _mailer.default;
}var _default =

{
  send(mailOptions) {
    let transporter;
    return new Promise((resolve, reject) => {
      _settings.default.
      get().
      then((config) => {
        try {
          transporter = (0, _mailerTransport.getMailerTransport)().createTransport(
          config.mailerConfig ? JSON.parse(config.mailerConfig) : transporterOptions);

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(info);
          });
        } catch (err) {
          reject(err);
        }
      }).
      catch(reject);
    });
  },
  createSenderDetails(settingsDetails) {
    const senderEmail =
    settingsDetails.senderEmail !== undefined ? settingsDetails.senderEmail : 'no-reply@uwazi.io';
    const siteName = settingsDetails.site_name !== undefined ? settingsDetails.site_name : 'Uwazi';
    return `"${siteName}" <${senderEmail}>`;
  } };exports.default = _default;