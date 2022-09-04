"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.IXSuggestionsModel = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _odm = require("../odm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const props = {
  status: { type: String, enum: ['processing', 'failed', 'ready'], default: 'processing' },
  entityId: { type: String } };


const mongoSchema = new _mongoose.default.Schema(props, {
  emitIndexErrors: true,
  strict: false });


// @ts-ignore
mongoSchema.index({ entityId: 1 });
mongoSchema.index({ fileId: 1 });
mongoSchema.index({ propertyName: 1, entityId: 1, fileId: 1 });
mongoSchema.index({ propertyName: 1, date: 1, state: -1 });

const IXSuggestionsModel = (0, _odm.instanceModel)('ixsuggestions', mongoSchema);exports.IXSuggestionsModel = IXSuggestionsModel;