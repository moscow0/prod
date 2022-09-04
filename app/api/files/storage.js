"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.storage = void 0;var _clientS = require("@aws-sdk/client-s3");
var _config = require("../config");
var _tenants = require("../tenants");
var _log = require("../log");

var _fs = require("fs");

var _promises = require("fs/promises");


var _filesystem = require("./filesystem");






var _S3Storage = require("./S3Storage"); // eslint-disable-next-line node/no-restricted-import
// eslint-disable-next-line node/no-restricted-import


let s3Instance;
const s3 = () => {
  if (_config.config.s3.endpoint && !s3Instance) {
    s3Instance = new _S3Storage.S3Storage();
  }
  return s3Instance;
};

const paths = {
  custom: _filesystem.customUploadsPath,
  document: _filesystem.uploadsPath,
  segmentation: (filename) => (0, _filesystem.uploadsPath)(`segmentation/${filename}`),
  thumbnail: _filesystem.uploadsPath,
  attachment: _filesystem.attachmentsPath,
  activitylog: _filesystem.activityLogPath };


const streamToBuffer = async (stream) =>
new Promise((resolve, reject) => {
  const _buf = [];
  stream.on('data', (chunk) => _buf.push(chunk));
  stream.on('end', () => resolve(Buffer.concat(_buf)));
  stream.on('error', (err) => reject(err));
});

const s3KeyWithPath = (filename, type) =>
paths[type](filename).split('/').slice(-2).join('/');

const readFromS3 = async (filename, type) => {
  try {
    const response = await s3().get(s3KeyWithPath(filename, type));
    return response.Body;
  } catch (e) {
    if (e instanceof _clientS.NoSuchKey) {
      const start = Date.now();
      s3().
      upload(s3KeyWithPath(filename, type), await (0, _promises.readFile)(paths[type](filename))).
      then(() => {
        const finish = Date.now();
        _log.errorLog.debug(
        `File "${filename}" uploaded to S3 in ${(finish - start) / 1000} for tenant ${
        _tenants.tenants.current().name
        }`);

      }).
      catch((error) => {
        _log.errorLog.error(
        `File "${filename}" Failed to be uploaded to S3 with error: ${
        error.message
        } for tenant ${_tenants.tenants.current().name}`);

      });

      return (0, _fs.createReadStream)(paths[type](filename));
    }
    throw e;
  }
};

const storage = {
  async readableFile(filename, type) {var _tenants$current$feat;
    if ((_tenants$current$feat = _tenants.tenants.current().featureFlags) !== null && _tenants$current$feat !== void 0 && _tenants$current$feat.s3Storage) {
      return readFromS3(filename, type);
    }
    return (0, _fs.createReadStream)(paths[type](filename));
  },
  async fileContents(filename, type) {
    return streamToBuffer(await this.readableFile(filename, type));
  },
  async removeFile(filename, type) {var _tenants$current$feat2;
    await (0, _filesystem.deleteFile)(paths[type](filename));
    if ((_tenants$current$feat2 = _tenants.tenants.current().featureFlags) !== null && _tenants$current$feat2 !== void 0 && _tenants$current$feat2.s3Storage) {
      await s3().delete(s3KeyWithPath(filename, type));
    }
  },
  async storeFile(filename, file, type) {var _tenants$current$feat3;
    file.pipe((0, _fs.createWriteStream)(paths[type](filename)));
    await new Promise((resolve) => {
      file.on('close', resolve);
    });

    if ((_tenants$current$feat3 = _tenants.tenants.current().featureFlags) !== null && _tenants$current$feat3 !== void 0 && _tenants$current$feat3.s3Storage) {
      await s3().upload(
      s3KeyWithPath(filename, type),
      await streamToBuffer((0, _fs.createReadStream)(paths[type](filename))));

    }
  },
  async fileExists(filename, type) {
    try {
      await (0, _promises.access)(paths[type](filename));
    } catch (err) {
      if ((err === null || err === void 0 ? void 0 : err.code) === 'ENOENT') {
        return false;
      }
      if (err) {
        throw err;
      }
    }
    return true;
  } };exports.storage = storage;