"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.debugLog = exports.createDebugLog = void 0;var _winston = _interopRequireDefault(require("winston"));
var _infoFormat = require("./infoFormat");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let DATABASE_NAME = 'localhost';
let LOGS_DIR = './log';

const createDebugLog = () => {
  DATABASE_NAME = process.env.DATABASE_NAME || DATABASE_NAME;
  LOGS_DIR = process.env.LOGS_DIR || LOGS_DIR;

  return _winston.default.createLogger({
    transports: [
    new _winston.default.transports.File({
      filename: `${LOGS_DIR}/debug.log`,
      level: 'debug',
      format: (0, _infoFormat.formatter)(DATABASE_NAME) })] });



};exports.createDebugLog = createDebugLog;

const debugLog = createDebugLog();exports.debugLog = debugLog;