"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.IXModelsModel = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _odm = require("../../odm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const props = {};

const mongoSchema = new _mongoose.default.Schema(props, {
  emitIndexErrors: true,
  strict: false });


const IXModelsModel = (0, _odm.instanceModel)('ixmodels', mongoSchema);exports.IXModelsModel = IXModelsModel;