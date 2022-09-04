"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.filesModel = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _date = _interopRequireDefault(require("../utils/date.js"));

var _odm = require("../odm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const propsWithDBSpecifics = {
  creationDate: { type: Number, default: _date.default.currentUTC },
  fullText: { type: _mongoose.default.Schema.Types.Mixed, select: false },
  entity: { type: String, index: true },
  type: { type: String, index: true },
  filename: { type: String, index: true },
  __v: { type: Number, select: false } };


const mongoSchema = new _mongoose.default.Schema(propsWithDBSpecifics, {
  emitIndexErrors: true,
  strict: false,
  versionKey: '__v' });


mongoSchema.index({ 'toc.0': 1, type: 1 }, { partialFilterExpression: { type: 'document' } });

const filesModel = (0, _odm.instanceModel)('files', mongoSchema);exports.filesModel = filesModel;