"use strict";var _odm = require("./api/odm");
var _config = require("./api/config");
var _tenants = require("./api/tenants");
var _permissionsContext = require("./api/permissions/permissionsContext");
var _OcrManager = require("./api/services/ocr/OcrManager");
var _PDFSegmentation = require("./api/services/pdfsegmentation/PDFSegmentation");
var _DistributedLoop = require("./api/services/tasksmanager/DistributedLoop");
var _TwitterIntegration = require("./api/services/twitterintegration/TwitterIntegration");
var _preserveSync = require("./api/services/preserve/preserveSync");
var _tocService = require("./api/toc_generation/tocService");
var _syncWorker = require("./api/sync/syncWorker");
var _InformationExtraction = require("./api/services/informationextraction/InformationExtraction");
var _setupSockets = require("./api/socketio/setupSockets");

let dbAuth = {};

if (process.env.DBUSER) {
  dbAuth = {
    auth: { authSource: 'admin' },
    user: process.env.DBUSER,
    pass: process.env.DBPASS };

}

_odm.DB.connect(_config.config.DBHOST, dbAuth).
then(async () => {
  await _tenants.tenants.setupTenants();
  (0, _setupSockets.setupWorkerSockets)();

  await _tenants.tenants.run(async () => {
    _permissionsContext.permissionsContext.setCommandContext();

    console.info('==> 📡 starting external services...');
    _OcrManager.ocrManager.start();
    new _InformationExtraction.InformationExtraction().start();

    const segmentationConnector = new _PDFSegmentation.PDFSegmentation();
    segmentationConnector.start();
    const segmentationRepeater = new _DistributedLoop.DistributedLoop(
    'segmentation_repeat',
    segmentationConnector.segmentPdfs,
    { port: _config.config.redis.port, host: _config.config.redis.host, delayTimeBetweenTasks: 5000 });


    // eslint-disable-next-line no-void
    void segmentationRepeater.start();

    const twitterIntegration = new _TwitterIntegration.TwitterIntegration();
    twitterIntegration.start();
    const twitterRepeater = new _DistributedLoop.DistributedLoop(
    'twitter_repeat',
    twitterIntegration.addTweetsRequestsToQueue,
    { port: _config.config.redis.port, host: _config.config.redis.host, delayTimeBetweenTasks: 120000 });


    // eslint-disable-next-line no-void
    void twitterRepeater.start();

    // eslint-disable-next-line no-void
    void new _DistributedLoop.DistributedLoop('preserve_integration', async () => _preserveSync.preserveSync.syncAllTenants(), {
      port: _config.config.redis.port,
      host: _config.config.redis.host,
      delayTimeBetweenTasks: 30000 }).
    start();

    // eslint-disable-next-line no-void
    void new _DistributedLoop.DistributedLoop('toc_service', async () => _tocService.tocService.processAllTenants(), {
      port: _config.config.redis.port,
      host: _config.config.redis.host,
      delayTimeBetweenTasks: 30000 }).
    start();

    // eslint-disable-next-line no-void
    void new _DistributedLoop.DistributedLoop('sync_job', async () => _syncWorker.syncWorker.runAllTenants(), {
      port: _config.config.redis.port,
      host: _config.config.redis.host,
      delayTimeBetweenTasks: 30000 }).
    start();
  });
}).
catch((error) => {
  throw error;
});