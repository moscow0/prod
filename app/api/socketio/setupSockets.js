"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.setupWorkerSockets = exports.setupApiSockets = exports.emitToTenant = exports.closeSockets = void 0;var _redis = require("redis");
var _cookie = _interopRequireDefault(require("cookie"));
var _http = require("http");
var _socket = require("socket.io");
var _express = require("express");
var _config = require("../config");
var _tenantContext = require("../tenants/tenantContext");
var _redisAdapter = require("@socket.io/redis-adapter");
var _utils = require("../utils");
var _redisEmitter = require("@socket.io/redis-emitter");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


















let io;
const emitToTenant = (tenantName, event, ...data) => {
  if (!io) {
    throw new Error('Socket.io Server not initialized');
  }
  // @ts-ignore
  io.to(tenantName).emit(event, ...data);
};exports.emitToTenant = emitToTenant;

const setupApiSockets = (server, app) => {
  io = new _socket.Server(server);

  io.on('connection', (socket) => {
    //eslint-disable-next-line @typescript-eslint/no-floating-promises
    socket.join(socket.request.headers.tenant || _config.config.defaultTenant.name);
    const socketCookie = _cookie.default.parse(socket.request.headers.cookie || '');
    if (socketCookie) {
      //eslint-disable-next-line @typescript-eslint/no-floating-promises
      socket.join(socketCookie['connect.sid']);
    }
  });

  const sockets = {
    emitToCurrentTenant: (event, ...args) => {
      // @ts-ignore
      io.to(_tenantContext.tenants.current().name).emit(event, ...args);
    } };


  if (_config.config.redis.activated) {
    const pubClient = new _redis.RedisClient({ host: _config.config.redis.host, port: _config.config.redis.port });
    const subClient = pubClient.duplicate();
    // @ts-ignore
    io.adapter((0, _redisAdapter.createAdapter)(pubClient, subClient));
    io.of('/').adapter.on('error', (e) => {
      (0, _utils.handleError)(e, { useContext: false });
    });
  }

  app.use((req, _res, next) => {
    req.sockets = sockets;
    next();
  });

  app.use((req, _res, next) => {
    req.emitToSessionSocket = (event, ...args) => {
      const cookies = _cookie.default.parse(req.get('cookie') || '');
      // @ts-ignore
      io.to(cookies['connect.sid']).emit(event, ...args);
    };

    next();
  });
};exports.setupApiSockets = setupApiSockets;

const setupWorkerSockets = () => {
  if (io) {
    return;
  }
  const redisClient = (0, _redis.createClient)({ host: _config.config.redis.host, port: _config.config.redis.port });
  redisClient.on('error', (error) => {
    throw error;
  });

  redisClient.on('ready', () => {
    io = new _redisEmitter.Emitter(redisClient);
  });
};exports.setupWorkerSockets = setupWorkerSockets;

const closeSockets = () => {
  io.disconnectSockets();
};exports.closeSockets = closeSockets;