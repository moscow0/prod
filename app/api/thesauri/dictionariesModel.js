"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _odm = require("../odm");
var _mongoose = _interopRequireDefault(require("mongoose"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const mongoSchema = new _mongoose.default.Schema({
  name: _mongoose.default.Schema.Types.Mixed,
  enable_classification: _mongoose.default.Schema.Types.Boolean,
  values: _mongoose.default.Schema.Types.Mixed });var _default =


(0, _odm.instanceModel)('dictionaries', mongoSchema);exports.default = _default;