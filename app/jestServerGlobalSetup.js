"use strict";var _createMongoInstance = require("./api/utils/createMongoInstance.js");
var _downloadRedis = require("./api/utils/downloadRedis.js");

module.exports = async () => {
  const mongod = await (0, _createMongoInstance.createMongoInstance)();
  await mongod.stop();
  (0, _downloadRedis.downloadRedis)();
};