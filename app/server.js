"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));
var _compression = _interopRequireDefault(require("compression"));
var _express = _interopRequireDefault(require("express"));
var _expressPromBundle = _interopRequireDefault(require("express-prom-bundle"));

var _helmet = _interopRequireDefault(require("helmet"));
var _http = require("http");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _path = _interopRequireDefault(require("path"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));
var Tracing = _interopRequireWildcard(require("@sentry/tracing"));

var _appContextMiddleware = require("./api/utils/appContextMiddleware");
var _requestIdMiddleware = require("./api/utils/requestIdMiddleware");
var _eventListeners = require("./api/eventListeners");
var _eventsbus = require("./api/eventsbus");
var _message = _interopRequireDefault(require("../message"));
var _api = _interopRequireDefault(require("./api/api"));
var _privateInstanceMiddleware = _interopRequireDefault(require("./api/auth/privateInstanceMiddleware"));
var _routes = _interopRequireDefault(require("./api/auth/routes"));
var _config = require("./api/config");

var _migrator = require("./api/migrations/migrator");
var _error_handling_middleware = _interopRequireDefault(require("./api/utils/error_handling_middleware"));
var _handleError = require("./api/utils/handleError.js");
var _server = _interopRequireDefault(require("./react/server.js"));
var _odm = require("./api/odm");
var _tenantContext = require("./api/tenants/tenantContext");
var _multitenantMiddleware = require("./api/utils/multitenantMiddleware");
var _routesErrorHandler = require("./api/utils/routesErrorHandler");
var _setupSockets = require("./api/socketio/setupSockets");
var _permissionsContext = require("./api/permissions/permissionsContext");

var _startLegacyServicesNoMultiTenant = require("./startLegacyServicesNoMultiTenant");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable no-console */

_mongoose.default.Promise = Promise;

const app = (0, _express.default)();
const metricsMiddleware = (0, _expressPromBundle.default)({
  normalizePath: [
  ['^/api/files/(.*\\..*)', '/api/files/#filename'],
  ['^/uploaded_documents/(.*\\..*)', '/uploaded_documents/#filename'],
  ['^/.*\\.(js|css).*', '/#filename'],
  ['^/public/(.*\\..*)', '/public/#filename'],
  ['^/flags/.*', '/flags/#filename'],
  ['^/assets/(.*\\..*)', '/assets/#filename'],
  ['.*/entity/.*', '/entity/#id'],
  ['.*/document/.*', '/document/#id'],
  ['.*/page/.*', '/page/#id'],
  ['.*/library', '/library/']],

  includeMethod: true,
  includePath: true,
  customLabels: {
    port: _config.config.PORT,
    env: _config.config.ENVIRONMENT },

  promClient: {
    collectDefaultMetrics: {} } });



app.use(metricsMiddleware);
if (_config.config.sentry.dsn) {
  Sentry.init({
    release: _config.config.VERSION,
    dsn: _config.config.sentry.dsn,
    environment: _config.config.ENVIRONMENT,
    integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
    new Tracing.Integrations.Mongo({
      useMongoose: true })],


    tracesSampleRate: _config.config.sentry.tracesSampleRate });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

(0, _routesErrorHandler.routesErrorHandler)(app);
app.use((0, _helmet.default)({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

const http = (0, _http.Server)(app);

const uncaughtError = (error) => {
  (0, _handleError.handleError)(error, { uncaught: true });
  throw error;
};

process.on('unhandledRejection', uncaughtError);
process.on('uncaughtException', uncaughtError);

const oneYear = 31557600;

let maxage = 0;
if (app.get('env') === 'production') {
  maxage = oneYear;
}

app.use((0, _compression.default)());
app.use(_express.default.static(_path.default.resolve(__dirname, '../dist'), { maxage }));
app.use('/public', _express.default.static(_config.config.publicAssets));
app.use(/\/((?!remotepublic).)*/, _bodyParser.default.json({ limit: '1mb' }));

app.use(_appContextMiddleware.appContextMiddleware);

// this middleware should go just before any other that accesses to db
app.use(_multitenantMiddleware.multitenantMiddleware);
app.use(_requestIdMiddleware.requestIdMiddleware);
let dbAuth = {};

if (process.env.DBUSER) {
  dbAuth = {
    auth: { authSource: 'admin' },
    user: process.env.DBUSER,
    pass: process.env.DBPASS };

}

// let hoststring = "mongodb+srv://doadmin:mA4J7j6S53w120WX@uwazidevelopment-60f3e49c.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=uwazidevelopment"
console.info('==> Connecting to', _config.config.DBHOST);
_odm.DB.connect(_config.config.DBHOST, dbAuth).then(async () => {
  await _tenantContext.tenants.setupTenants();
  (0, _routes.default)(app);
  app.use(_privateInstanceMiddleware.default);
  app.use('/flag-images', _express.default.static(_path.default.resolve(__dirname, '../dist/flags')));

  (0, _api.default)(app, http);
  (0, _server.default)(app);
  if (_config.config.sentry.dsn) {
    app.use(Sentry.Handlers.errorHandler());
  }
  app.use(_error_handling_middleware.default);
  (0, _eventListeners.registerEventListeners)(_eventsbus.applicationEventsBus);

  if (_config.config.externalServices) {
    // eslint-disable-next-line global-require
    require("./worker");
  }
  if (!_config.config.multiTenant && !_config.config.clusterMode) {
    await _tenantContext.tenants.run(async () => {
      const shouldMigrate = await _migrator.migrator.shouldMigrate();
      if (shouldMigrate) {
        console.error(
        '\x1b[33m%s\x1b[0m',
        '==> Your database needs to be migrated, please run:\n\n yarn migrate & yarn reindex\n\n');

        process.exit(1);
      }
    });
  }

  const bindAddress = { true: 'localhost' }[process.env.LOCALHOST_ONLY];
  const port = _config.config.PORT;

  http.listen(port, bindAddress, async () => {
    await _tenantContext.tenants.run(async () => {
      _permissionsContext.permissionsContext.setCommandContext();
      await (0, _startLegacyServicesNoMultiTenant.startLegacyServicesNoMultiTenant)();
    });

    console.info(
    '==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.',
    port,
    port);


    if (process.env.HOT) {
      console.info('');
      console.info('==> 📦 webpack is watching...');
      console.info(_message.default);
    }
  });

  process.on('SIGINT', () => {
    process.stdout.write('SIGINT signal received.\r\n');
    http.close((error) => {
      process.stdout.write('Gracefully closing express connections\r\n');
      if (error) {
        process.stderr.write(error.toString());
        process.exit(1);
      }

      _odm.DB.disconnect().then(() => {
        process.stdout.write('Disconnected from database\r\n');
        process.stdout.write('Server closed succesfully\r\n');
        process.exit(0);
      });
    });
    (0, _setupSockets.closeSockets)();
  });
});