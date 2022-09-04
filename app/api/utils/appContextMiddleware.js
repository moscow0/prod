"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.appContextMiddleware = void 0;
var _AppContext = require("./AppContext");

const appContextMiddleware = (_req, _res, next) => {
  _AppContext.appContext.
  run(async () => {
    next();
  }).
  catch(next);
};exports.appContextMiddleware = appContextMiddleware;