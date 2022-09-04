"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _suggestions = require("../../suggestions/suggestions");
var _IXModelSchema = require("../../../shared/types/IXModelSchema");

var _IXModelsModel = require("./IXModelsModel");var _default =

{
  get: _IXModelsModel.IXModelsModel.get.bind(_IXModelsModel.IXModelsModel),
  delete: _IXModelsModel.IXModelsModel.delete.bind(_IXModelsModel.IXModelsModel),
  save: async (ixmodel) => {
    const saved = await _IXModelsModel.IXModelsModel.save(ixmodel);
    if (ixmodel.status === _IXModelSchema.ModelStatus.ready) {
      await _suggestions.Suggestions.setObsolete({ propertyName: saved.propertyName });
    }
    return saved;
  } };exports.default = _default;