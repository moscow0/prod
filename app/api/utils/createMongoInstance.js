"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.createMongoInstance = void 0;var _mongodbMemoryServer = require("mongodb-memory-server");

//eslint-disable-next-line consistent-return
const createMongoInstance = async (dbName = '') => {
  try {
    return await _mongodbMemoryServer.MongoMemoryServer.create({ instance: { dbName } });
  } catch (e) {
    if (e.message.match('valid binary path')) {
      e.message = `You are using an invalid mongodb version or do not have the binaries installed,
reinstall by removing node_modules and executing yarn install\n\n${e.message}`;
      throw e;
    }
  }
};exports.createMongoInstance = createMongoInstance;