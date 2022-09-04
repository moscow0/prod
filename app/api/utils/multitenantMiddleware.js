"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.multitenantMiddleware = void 0;
var _AppContext = require("./AppContext");
var _config = require("../config");

const multitenantMiddleware = (req, _res, next) => {
  _AppContext.appContext.set('tenant', req.get('tenant') || _config.config.defaultTenant.name);
  next();
};exports.multitenantMiddleware = multitenantMiddleware;