"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.SegmentationModel = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _odm = require("../../odm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const props = {
  autoexpire: { type: Date, expires: 86400, default: Date.now }, // 24 hours
  fileID: { type: _mongoose.default.Schema.Types.ObjectId, ref: 'File' },
  status: { type: String, enum: ['processing', 'failed', 'ready'], default: 'processing' } };


const mongoSchema = new _mongoose.default.Schema(props, {
  emitIndexErrors: true,
  strict: false });


const SegmentationModel = (0, _odm.instanceModel)('segmentations', mongoSchema);exports.SegmentationModel = SegmentationModel;