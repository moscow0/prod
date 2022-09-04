"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _csvtojson = _interopRequireDefault(require("csvtojson"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}





const csv = (readStream, stopOnError = false) => ({
  reading: false,
  onRowCallback: async (_row, _index) => {},
  onErrorCallback: async (_error, _row, _index) => {},

  onRow(onRowCallback) {
    this.onRowCallback = onRowCallback;
    return this;
  },

  onError(onErrorCallback) {
    this.onErrorCallback = onErrorCallback;
    return this;
  },

  async read() {
    this.reading = true;
    return (0, _csvtojson.default)({ delimiter: [',', ';'] }).
    fromStream(readStream).
    subscribe(async (row, index) => {
      if (!this.reading) {
        return;
      }
      try {
        await this.onRowCallback(row, index);
      } catch (e) {
        await this.onErrorCallback(e, row, index);
        if (stopOnError) {
          this.reading = false;
          readStream.unpipe();
          readStream.destroy();
        }
      }
    });
  } });var _default =


csv;exports.default = _default;