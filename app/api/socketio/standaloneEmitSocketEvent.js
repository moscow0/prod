"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.emitSocketEvent = void 0;var _redisEmitter = require("@socket.io/redis-emitter");
var _redis = require("redis");
var _config = require("../config");

const emitSocketEvent = async (
event,
tenant = '',
data = undefined) =>

new Promise((resolve, reject) => {
  const redisClient = (0, _redis.createClient)({ host: _config.config.redis.host, port: _config.config.redis.port });

  redisClient.on('error', reject);
  redisClient.on('end', resolve);

  redisClient.on('ready', () => {
    const io = new _redisEmitter.Emitter(redisClient);
    if (tenant === '') {
      io.emit(event, data);
    } else {
      io.to(tenant).emit(event, data);
    }
    redisClient.quit();
  });
});exports.emitSocketEvent = emitSocketEvent;