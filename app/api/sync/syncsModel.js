"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _MultiTenantMongooseModel = require("../odm/MultiTenantMongooseModel");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const syncSchema = new _mongoose.default.Schema({
  lastSync: Number,
  name: String });var _default =







new _MultiTenantMongooseModel.MultiTenantMongooseModel('syncs', syncSchema);exports.default = _default;