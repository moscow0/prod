"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.preserveSyncModel = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));

var _odm = require("../../odm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const preserveSyncSchema = new _mongoose.default.Schema({
  lastImport: String,
  token: String });


const preserveSyncModel = (0, _odm.instanceModel)('preserveSync', preserveSyncSchema);exports.preserveSyncModel = preserveSyncModel;