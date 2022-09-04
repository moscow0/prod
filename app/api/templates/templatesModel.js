"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _odm = require("../odm");
var _mongoose = _interopRequireDefault(require("mongoose"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const mongoSchema = new _mongoose.default.Schema(
{
  color: { type: String, default: '' },
  properties: [new _mongoose.default.Schema({ id: String, content: String }, { strict: false })],
  commonProperties: [new _mongoose.default.Schema({ id: String }, { strict: false })],
  entityViewPage: { type: String, default: '' } },

{
  emitIndexErrors: true,
  strict: false });var _default =



(0, _odm.instanceModel)('templates', mongoSchema);exports.default = _default;