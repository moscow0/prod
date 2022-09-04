"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _activitylogMiddleware = _interopRequireDefault(require("./activitylog/activitylogMiddleware"));
var _CSRFMiddleware = _interopRequireDefault(require("./auth/CSRFMiddleware"));
var _languageMiddleware = _interopRequireDefault(require("./utils/languageMiddleware"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable global-require */var _default =

(app, server) => {
  //common middlewares
  app.use(_CSRFMiddleware.default);
  app.use(_languageMiddleware.default);
  app.use(_activitylogMiddleware.default);

  require("./socketio/setupSockets").setupApiSockets(server, app);

  require("./auth2fa/routes").default(app);
  require("./relationships/routes").default(app);
  require("./activitylog/routes").default(app);
  require("./users/routes").default(app);
  require("./templates/routes").default(app);
  require("./search/deprecatedRoutes").default(app);
  require("./search/routes").default(app);
  require("./search.v2/routes").searchRoutes(app);
  require("./topicclassification/routes").default(app);
  require("./thesauri/routes").default(app);
  require("./relationtypes/routes").default(app);
  require("./documents/deprecatedRoutes").default(app);
  require("./documents/routes").documentRoutes(app);
  require("./contact/routes").default(app);
  require("./entities/routes").default(app);
  require("./pages/routes").default(app);
  require("./files/jsRoutes.js").default(app);
  require("./files/routes").default(app);
  require("./files/exportRoutes").default(app);
  require("./files/ocrRoutes").ocrRoutes(app);
  require("./settings/routes").default(app);
  require("./i18n/routes").default(app);
  require("./sync/routes").default(app);
  require("./swagger/swaggerconfig").default(app);
  require("./tasks/routes").default(app);
  require("./usergroups/routes").default(app);
  require("./permissions/routes").permissionRoutes(app);
  require("./suggestions/routes").suggestionsRoutes(app);
  require("./preserve/routes").PreserveRoutes(app);
};exports.default = _default;