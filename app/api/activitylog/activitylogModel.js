"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _odm = require("../odm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const pagesSchema = new _mongoose.default.Schema({
  method: String,
  time: Number,
  url: String,
  query: String,
  params: String,
  body: String,
  username: String,
  user: { type: _mongoose.default.Schema.Types.ObjectId, ref: 'users' },
  expireAt: Date });var _default =


(0, _odm.instanceModel)('activitylog', pagesSchema);exports.default = _default;