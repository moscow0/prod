"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.RedisServer = void 0;var _child_process = require("child_process");function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class RedisServer {






  constructor(port = 6379) {_defineProperty(this, "server", void 0);_defineProperty(this, "port", void 0);_defineProperty(this, "pathToBin", void 0);
    this.pathToBin = 'redis-bin/redis-stable/src/redis-server';
    this.port = port;
  }

  start() {
    try {
      this.server = (0, _child_process.spawn)(this.pathToBin, ['--port', this.port.toString()]);
    } catch (err) {
      console.log(err);
    }
  }

  async stop() {
    return new Promise((resolve, _reject) => {
      this.server.on('close', () => {
        resolve();
      });
      this.server.kill('SIGINT');
    });
  }}exports.RedisServer = RedisServer;