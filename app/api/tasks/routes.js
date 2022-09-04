"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.TASKS_ENDPOINT = void 0;


var _auth = require("../auth");
var _utils = require("../utils");

var _tasks = require("../../shared/tasks/tasks"); /**
 * Uwazi routes that start and inspect tasks.
 */const TASKS_ENDPOINT = 'tasks';exports.TASKS_ENDPOINT = TASKS_ENDPOINT;
const tasksPrefix = `/api/${TASKS_ENDPOINT}`;var _default =

(app) => {
  app.get(
  tasksPrefix,
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        properties: {
          name: { type: 'string' } } } } }),





  async (req, res) => {var _req$query;
    if ((_req$query = req.query) !== null && _req$query !== void 0 && _req$query.name) {var _req$query2, _task$status;
      const task = _tasks.TaskProvider.getByName((_req$query2 = req.query) === null || _req$query2 === void 0 ? void 0 : _req$query2.name);
      return res.json((_task$status = task === null || task === void 0 ? void 0 : task.status) !== null && _task$status !== void 0 ? _task$status : { state: 'undefined' });
    }
    return res.json(_tasks.TaskProvider.taskInstances);
  });


  app.post(
  tasksPrefix,
  (0, _auth.needsAuthorization)(),
  _utils.validation.validateRequest({
    type: 'object',
    required: ['query', 'body'],
    properties: {
      query: {
        type: 'object',
        required: ['name', 'type'],
        properties: {
          name: { type: 'string' },
          type: { type: 'string' } } },


      body: {} } }),



  async (req, res) => {var _req$query3, _req$query4, _task$status2;
    const task = _tasks.TaskProvider.getOrCreate((_req$query3 = req.query) === null || _req$query3 === void 0 ? void 0 : _req$query3.name, (_req$query4 = req.query) === null || _req$query4 === void 0 ? void 0 : _req$query4.type);
    if (task.status.state === 'created') {var _req$body;
      task.start((_req$body = req.body) !== null && _req$body !== void 0 ? _req$body : {});
    }
    return res.json((_task$status2 = task === null || task === void 0 ? void 0 : task.status) !== null && _task$status2 !== void 0 ? _task$status2 : { state: 'undefined' });
  });

};exports.default = _default;