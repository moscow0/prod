"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _exportNames = { DB: true };Object.defineProperty(exports, "DB", { enumerable: true, get: function () {return _DB.DB;} });var _model = require("./model");Object.keys(_model).forEach(function (key) {if (key === "default" || key === "__esModule") return;if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;if (key in exports && exports[key] === _model[key]) return;Object.defineProperty(exports, key, { enumerable: true, get: function () {return _model[key];} });});
var _models = require("./models");Object.keys(_models).forEach(function (key) {if (key === "default" || key === "__esModule") return;if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;if (key in exports && exports[key] === _models[key]) return;Object.defineProperty(exports, key, { enumerable: true, get: function () {return _models[key];} });});
var _DB = require("./DB");