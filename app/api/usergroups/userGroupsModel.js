"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _odm = require("../odm");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const propsWithDBSpecifics = {
  name: { type: String, index: true } };


const mongoSchema = new _mongoose.default.Schema(propsWithDBSpecifics, {
  strict: false });


const Model = (0, _odm.instanceModel)('usergroups', mongoSchema);var _default =

Model;exports.default = _default;