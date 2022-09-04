"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.settingsModel = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _odm = require("../odm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const propsWithDBSpecifics = {
  publicFormDestination: { type: String, select: false },
  sync: { type: _mongoose.default.Schema.Types.Mixed, select: false },
  languages: [new _mongoose.default.Schema({}, { strict: false })],
  links: [new _mongoose.default.Schema({}, { strict: false })],
  filters: [new _mongoose.default.Schema({ id: String }, { strict: false })],
  evidencesVault: { type: _mongoose.default.Schema.Types.Mixed, select: false } };


const mongoSchema = new _mongoose.default.Schema(propsWithDBSpecifics, {
  emitIndexErrors: true,
  strict: false });


const settingsModel = (0, _odm.instanceModel)('settings', mongoSchema);exports.settingsModel = settingsModel;