"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.startLegacyServicesNoMultiTenant = startLegacyServicesNoMultiTenant;var _config = require("./api/config");
var _Repeater = require("./api/utils/Repeater");
var _tasks = require("./shared/tasks/tasks");

async function startLegacyServicesNoMultiTenant() {
  if (_config.config.multiTenant || _config.config.clusterMode) {
    return;
  }
  const anHour = 3600000;
  const topicClassificationRepeater = new _Repeater.Repeater(
  () =>
  _tasks.TaskProvider.runAndWait('TopicClassificationSync', 'TopicClassificationSync', {
    mode: 'onlynew',
    noDryRun: true,
    overwrite: true }),

  anHour);

  topicClassificationRepeater.start();
}