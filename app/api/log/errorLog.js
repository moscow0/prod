"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.errorLog = exports.createErrorLog = void 0;var _winston = _interopRequireDefault(require("winston"));
var _GrayLogTransport = _interopRequireDefault(require("./GrayLogTransport"));
var _infoFormat = require("./infoFormat");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let DATABASE_NAME = 'localhost';
let LOGS_DIR = './log';





const createFileTransport = () =>
new _winston.default.transports.File({
  filename: `${LOGS_DIR}/error.log`,
  handleExceptions: true,
  level: 'error',
  format: (0, _infoFormat.formatter)(DATABASE_NAME) });


const createConsoleTransport = () =>
new _winston.default.transports.Console({
  handleExceptions: true,
  level: 'error',
  format: (0, _infoFormat.formatter)(DATABASE_NAME) });


const createErrorLog = () => {
  DATABASE_NAME = process.env.DATABASE_NAME ? process.env.DATABASE_NAME : 'localhost';
  LOGS_DIR = process.env.LOGS_DIR ? process.env.LOGS_DIR : './log';

  const logger = _winston.default.createLogger({
    transports: [createFileTransport(), createConsoleTransport()] });


  logger.closeGraylog = (cb = () => {}) => {
    cb();
  };

  if (process.env.USE_GRAYLOG) {
    const graylogTransport = new _GrayLogTransport.default({
      format: (0, _infoFormat.formatter)(DATABASE_NAME),
      instance_name: DATABASE_NAME,
      server: process.env.USE_GRAYLOG });

    //@ts-ignore
    logger.add(graylogTransport);
    logger.closeGraylog = graylogTransport.graylog.close.bind(graylogTransport.graylog);
  }

  return logger;
};exports.createErrorLog = createErrorLog;

const errorLog = createErrorLog();exports.errorLog = errorLog;