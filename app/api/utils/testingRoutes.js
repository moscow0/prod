"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.socketEmit = exports.setUpApp = exports.iosocket = void 0;var _bodyParser = _interopRequireDefault(require("body-parser"));
var _express = _interopRequireDefault(require("express"));


var _error_handling_middleware = _interopRequireDefault(require("./error_handling_middleware"));
var _languageMiddleware = _interopRequireDefault(require("./languageMiddleware"));
var _routesErrorHandler = require("./routesErrorHandler");
var _supertestExtensions = require("./supertestExtensions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

(0, _supertestExtensions.extendSupertest)();

const iosocket = { emit: jasmine.createSpy('emit') };exports.iosocket = iosocket;

const setUpApp = (
route,
...customMiddleware) =>
{
  const app = (0, _express.default)();
  (0, _routesErrorHandler.routesErrorHandler)(app);
  app.use(_bodyParser.default.json());
  app.use((req, _res, next) => {
    req.emitToSessionSocket = (event, ...args) => iosocket.emit(event, ...args);
    req.sockets = {
      emitToCurrentTenant: (event, ...args) => iosocket.emit(event, ...args) };

    next();
  });

  app.use(_languageMiddleware.default);
  customMiddleware.forEach((middlewareElement) => app.use(middlewareElement));

  route(app);
  app.use(_error_handling_middleware.default);
  return app;
};exports.setUpApp = setUpApp;




const socketEmit = async (eventName, performRequest) => {
  const eventEmited = new Promise((resolve) => {
    iosocket.emit.and.callFake((event) => {
      if (event === eventName) {
        resolve(event);
      }
    });
  });

  const res = await performRequest();
  if (res.error) {
    throw new Error(res.error.text);
  }

  await eventEmited;

  return res;
};exports.socketEmit = socketEmit;