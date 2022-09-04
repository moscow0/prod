"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.CaptchaModel = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _odm = require("../odm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const props = {
  autoexpire: { type: Date, expires: 36000, default: Date.now },
  text: { type: String } };


const mongoSchema = new _mongoose.default.Schema(props, {
  emitIndexErrors: true,
  strict: false });


const CaptchaModel = (0, _odm.instanceModel)('captchas', mongoSchema);exports.CaptchaModel = CaptchaModel;