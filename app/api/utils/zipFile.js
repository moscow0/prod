"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;var _yauzl = _interopRequireDefault(require("yauzl"));

var _filesystem = require("../files/filesystem");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



function _default(zipFile) {
  return {
    async getFileContent(matchFile) {
      const stream = await this.findReadStream(matchFile);
      if (stream) {
        return (0, _filesystem.streamToString)(stream);
      }
      return null;
    },

    async findReadStream(matchFile) {
      let found = false;
      return new Promise((resolve, reject) => {
        _yauzl.default.open(zipFile, { lazyEntries: true }, (err, zipfile) => {
          if (err) {
            reject(err);
          }
          if (zipfile) {
            zipfile.readEntry();
            zipfile.on('end', () => {
              if (!found) {
                resolve(null);
              }
            });
            zipfile.on('entry', (entry) => {
              if (matchFile(entry.fileName)) {
                found = true;
                zipfile.openReadStream(entry, (error, readStream) => {
                  if (error) reject(error);
                  resolve(readStream || null);
                });
                zipfile.close();
                return;
              }
              zipfile.readEntry();
            });
          }
        });
      });
    } };

}