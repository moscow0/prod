"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.model = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _MultiTenantMongooseModel = require("../odm/MultiTenantMongooseModel");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const updateLogSchema = new _mongoose.default.Schema({
  timestamp: { type: Number, index: true },
  namespace: String,
  mongoId: { type: _mongoose.default.Schema.Types.ObjectId, index: true },
  deleted: Boolean });









const model = new _MultiTenantMongooseModel.MultiTenantMongooseModel('updatelogs', updateLogSchema);exports.model = model;