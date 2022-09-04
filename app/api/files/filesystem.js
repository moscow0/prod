"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.customUploadsPath = exports.createDirIfNotExists = exports.attachmentsPath = exports.activityLogPath = void 0;exports.deleteFile = deleteFile;exports.deleteFiles = deleteFiles;exports.uploadsPath = exports.testingUploadPaths = exports.temporalFilesPath = exports.streamToString = exports.setupTestUploadedPaths = exports.generateFileName = exports.fileFromReadStream = exports.fileExistsOnPath = void 0;var _path = _interopRequireDefault(require("path"));


var _uniqueID = _interopRequireDefault(require("../../shared/uniqueID"));

var _promises = _interopRequireWildcard(require("fs/promises"));
var _tenantContext = require("../tenants/tenantContext");
var _testingTenants = require("../utils/testingTenants");



var _fs = require("fs");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // eslint-disable-next-line node/no-restricted-import
// eslint-disable-next-line node/no-restricted-import



const uploadsPath = (fileName = '') =>
_path.default.join(_tenantContext.tenants.current().uploadedDocuments, fileName);exports.uploadsPath = uploadsPath;

const attachmentsPath = (fileName = '') =>
_path.default.join(_tenantContext.tenants.current().attachments, fileName);exports.attachmentsPath = attachmentsPath;

const customUploadsPath = (fileName = '') =>
_path.default.join(_tenantContext.tenants.current().customUploads, fileName);exports.customUploadsPath = customUploadsPath;

const temporalFilesPath = (fileName = '') =>
_path.default.join(_tenantContext.tenants.current().temporalFiles, fileName);exports.temporalFilesPath = temporalFilesPath;

const activityLogPath = (fileName = '') =>
_path.default.join(_tenantContext.tenants.current().activityLogs, fileName);exports.activityLogPath = activityLogPath;

async function deleteFile(file) {
  try {
    await _promises.default.unlink(file);
  } catch (err) {
    if (err && err.code !== 'ENOENT') {
      throw err;
    }
  }
}

async function deleteFiles(files) {
  return Promise.all(files.map(async (file) => deleteFile(file)));
}

const createDirIfNotExists = async (dirPath) => {
  try {
    await _promises.default.mkdir(dirPath);
  } catch (e) {
    if (!e.message.match(/file already exists/)) {
      throw e;
    }
  }
};exports.createDirIfNotExists = createDirIfNotExists;

const testingUploadPaths = async (subPath = '') => {
  if (subPath) {
    await createDirIfNotExists(`${__dirname}/specs/uploads/${subPath}`);
    await createDirIfNotExists(`${__dirname}/specs/customUploads/${subPath}`);
  }
  return {
    uploadedDocuments: `${__dirname}/specs/uploads/${subPath}`,
    attachments: `${__dirname}/specs/uploads/${subPath}`,
    customUploads: `${__dirname}/specs/customUploads/${subPath}`,
    temporalFiles: `${__dirname}/specs/uploads/${subPath}`,
    activityLogs: `${__dirname}/specs/uploads/${subPath}` };

};exports.testingUploadPaths = testingUploadPaths;

const setupTestUploadedPaths = async (subFolder = '') => {
  _testingTenants.testingTenants.changeCurrentTenant(await testingUploadPaths(subFolder));
};exports.setupTestUploadedPaths = setupTestUploadedPaths;

const generateFileName = ({ originalname = '' }) =>
Date.now() + (0, _uniqueID.default)() + _path.default.extname(originalname);

/**
 * Create a file from a read stream and save it to one of uwazi filesystem paths
 * @param destination by default this will be uploadsPaths,
 * if you want another one you can pass filesystem destinatations
 * e.g. attachmentsPath()
 *
 */exports.generateFileName = generateFileName;
const fileFromReadStream = async (
fileName,
readStream,
destination = undefined) =>

new Promise((resolve, reject) => {
  const filePath = _path.default.join(destination || uploadsPath(), fileName);
  const writeStream = (0, _fs.createWriteStream)(filePath);
  readStream.
  pipe(writeStream).
  on('finish', () => resolve(filePath)).
  on('error', reject);
});exports.fileFromReadStream = fileFromReadStream;

const streamToString = async (stream) =>
new Promise((resolve, reject) => {
  const chunks = [];
  stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
  stream.on('error', reject);
  stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
});exports.streamToString = streamToString;

const fileExistsOnPath = async (filePath) => {
  try {
    await (0, _promises.access)(filePath);
  } catch (err) {
    if ((err === null || err === void 0 ? void 0 : err.code) === 'ENOENT') {
      return false;
    }
    if (err) {
      throw err;
    }
  }
  return true;
};exports.fileExistsOnPath = fileExistsOnPath;