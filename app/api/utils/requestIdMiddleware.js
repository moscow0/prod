"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.requestIdMiddleware = void 0;
var _AppContext = require("./AppContext");

const requestIdMiddleware = (_req, _res, next) => {
  _AppContext.appContext.set('requestId', Math.floor(Math.random() * 10000));
  next();
};exports.requestIdMiddleware = requestIdMiddleware;