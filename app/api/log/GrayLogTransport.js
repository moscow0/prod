"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _graylog = _interopRequireDefault(require("graylog2"));
var _winston = _interopRequireDefault(require("winston"));
var _infoFormat = require("./infoFormat");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class GrayLogTransport extends _winston.default.Transport {
  constructor(opts) {
    super(opts);

    this.instanceName = opts.instance_name;
    // eslint-disable-next-line new-cap
    this.graylog = new _graylog.default.graylog({
      servers: [{ host: opts.server, port: 12201 }],
      hostname: this.instanceName,
      facility: 'Uwazi instances' });


    this.graylog.on('error', (error) => {
      console.error('Error while trying to write to graylog2:', error); //eslint-disable-line no-console
    });
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    this.graylog.log((0, _infoFormat.formatInfo)((0, _infoFormat.addTenant)(info, { instanceName: this.instanceName })));
    callback();
  }}exports.default = GrayLogTransport;