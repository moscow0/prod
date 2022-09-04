"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.OcrStatus = exports.OcrModel = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _odm = require("../../odm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var


OcrStatus;exports.OcrStatus = OcrStatus;(function (OcrStatus) {OcrStatus["NONE"] = "noOCR";OcrStatus["PROCESSING"] = "inQueue";OcrStatus["ERROR"] = "cannotProcess";OcrStatus["READY"] = "withOCR";OcrStatus["UNSUPPORTED_LANGUAGE"] = "unsupported_language";})(OcrStatus || (exports.OcrStatus = OcrStatus = {}));







const props = {
  sourceFile: { type: _mongoose.default.Schema.Types.ObjectId, ref: 'File' },
  resultFile: { type: _mongoose.default.Schema.Types.ObjectId, ref: 'File' },
  language: { type: String },
  status: { type: String, enum: OcrStatus, default: 'processing' },
  lastUpdated: { type: Number } };











const mongoSchema = new _mongoose.default.Schema(props, {
  emitIndexErrors: true,
  strict: false });


const OcrModel = (0, _odm.instanceModel)('ocr_record', mongoSchema);exports.OcrModel = OcrModel;