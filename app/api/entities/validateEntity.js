"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateEntity = void 0;var _validateEntitySchema = require("./validation/validateEntitySchema");
var _validateEntityData = require("./validation/validateEntityData");

const validateEntity = async (entity) => {
  await (0, _validateEntitySchema.validateEntitySchema)(entity);
  await (0, _validateEntityData.validateEntityData)(entity);
};exports.validateEntity = validateEntity;