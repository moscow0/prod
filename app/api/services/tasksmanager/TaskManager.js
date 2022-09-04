"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TaskManager = void 0;
var _rsmq = _interopRequireDefault(require("rsmq"));
var _redis = _interopRequireDefault(require("redis"));
var _Repeater = require("../../utils/Repeater");
var _config = require("../../config");
var _utils = require("../../utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





























class TaskManager {












  constructor(service) {_defineProperty(this, "redisSMQ", void 0);_defineProperty(this, "service", void 0);_defineProperty(this, "taskQueue", void 0);_defineProperty(this, "resultsQueue", void 0);_defineProperty(this, "repeater", void 0);_defineProperty(this, "redisClient", void 0);
    this.service = service;
    this.taskQueue = `${service.serviceName}_tasks`;
    this.resultsQueue = `${service.serviceName}_results`;
    const redisUrl = `redis://${_config.config.redis.host}:${_config.config.redis.port}`;
    this.redisClient = _redis.default.createClient(redisUrl);
    this.redisSMQ = new _rsmq.default({ client: this.redisClient });

    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.redisClient.on('error', (error) => {
      if (error && error.code !== 'ECONNREFUSED') {
        throw error;
      }
    });

    this.redisClient.on('connect', () => {
      this.redisSMQ.createQueue({ qname: this.taskQueue }, (err) => {
        if (err && err.name !== 'queueExists') {
          throw err;
        }
      });
      this.redisSMQ.createQueue({ qname: this.resultsQueue }, (err) => {
        if (err && err.name !== 'queueExists') {
          throw err;
        }
      });
    });
  }

  async countPendingTasks() {
    const queueAttributes = await this.redisSMQ.getQueueAttributesAsync({
      qname: this.taskQueue });

    return queueAttributes.msgs;
  }

  subscribeToResults() {
    this.repeater = new _Repeater.Repeater(this.checkForResults.bind(this), 500);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.repeater.start();
  }

  async checkForResults() {var _this$redisClient;
    if (!((_this$redisClient = this.redisClient) !== null && _this$redisClient !== void 0 && _this$redisClient.connected)) {
      return;
    }

    try {
      const message = await this.redisSMQ.receiveMessageAsync({
        qname: this.resultsQueue,
        vt: this.service.processResultsMessageHiddenTime });


      if (message.id && this.service.processResults) {
        await this.redisSMQ.deleteMessageAsync({
          qname: this.resultsQueue,
          id: message.id });


        const processedMessage = JSON.parse(message.message);

        await this.service.processResults(processedMessage);
      }
    } catch (e) {
      (0, _utils.handleError)(e, { useContext: false });
    }
  }

  async startTask(taskMessage) {
    if (!this.redisClient.connected) {
      throw new Error('Redis is not connected');
    }

    return this.redisSMQ.sendMessageAsync({
      qname: this.taskQueue,
      message: JSON.stringify(taskMessage) });

  }

  async stop() {
    await this.repeater.stop();
    await this.redisClient.end(true);
  }}exports.TaskManager = TaskManager;