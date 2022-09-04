"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.DistributedLoop = void 0;var _redis = _interopRequireDefault(require("redis"));
var _redlock = _interopRequireDefault(require("redlock"));
var _handleError = require("../../utils/handleError");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class DistributedLoop {




















  constructor(
  lockName,
  task,
  options)






  {_defineProperty(this, "lockName", void 0);_defineProperty(this, "task", void 0);_defineProperty(this, "redlock", void 0);_defineProperty(this, "stopTask", void 0);_defineProperty(this, "redisClient", void 0);_defineProperty(this, "maxLockTime", void 0);_defineProperty(this, "delayTimeBetweenTasks", void 0);_defineProperty(this, "retryDelay", void 0);_defineProperty(this, "port", void 0);_defineProperty(this, "host", void 0);
    const _options = _objectSpread({
      maxLockTime: 2000,
      delayTimeBetweenTasks: 1000,
      retryDelay: 200,
      port: 6379,
      host: 'localhost' },
    options);

    this.maxLockTime = _options.maxLockTime;
    this.retryDelay = _options.retryDelay;
    this.delayTimeBetweenTasks = _options.delayTimeBetweenTasks;
    this.lockName = `locks:${lockName}`;
    this.task = task;
    this.port = _options.port;
    this.host = _options.host;
  }

  async start() {
    this.redisClient = await _redis.default.createClient(`redis://${this.host}:${this.port}`);
    this.redlock = await new _redlock.default([this.redisClient], {
      retryJitter: 0,
      retryDelay: this.retryDelay });

    this.redisClient.on('error', (error) => {
      if (error.code !== 'ECONNREFUSED') {
        throw error;
      }
    });

    // eslint-disable-next-line no-void
    void this.lockTask();
  }

  async waitBetweenTasks(delay = this.delayTimeBetweenTasks) {
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  async runTask() {
    try {
      await this.task();
    } catch (error) {
      (0, _handleError.handleError)(error, { useContext: false });
    }

    await this.waitBetweenTasks();
  }

  async stop() {var _this$redlock, _this$redisClient;
    await new Promise((resolve) => {
      this.stopTask = resolve;
    });

    await ((_this$redlock = this.redlock) === null || _this$redlock === void 0 ? void 0 : _this$redlock.quit());
    await ((_this$redisClient = this.redisClient) === null || _this$redisClient === void 0 ? void 0 : _this$redisClient.end(true));
  }

  async lockTask() {
    try {
      const lock = await this.redlock.lock(
      this.lockName,
      this.maxLockTime + this.delayTimeBetweenTasks);


      if (this.stopTask) {
        this.stopTask();
        return;
      }

      await this.runTask();
      await lock.unlock();
    } catch (error) {
      if (error instanceof Error && error.name !== 'LockError') {
        throw error;
      }
    }

    // eslint-disable-next-line no-void
    void this.lockTask();
  }}exports.DistributedLoop = DistributedLoop;