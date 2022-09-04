"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getMailerTransport = void 0;var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _fakeMailer = _interopRequireDefault(require("./fakeMailer"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const getMailerTransport = () =>
process.env.DATABASE_NAME !== 'uwazi_e2e' ? _nodemailer.default : _fakeMailer.default;exports.getMailerTransport = getMailerTransport;