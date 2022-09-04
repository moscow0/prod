"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.uploadMiddleware = void 0;var _path = _interopRequireDefault(require("path"));
var _ = require("./");

var _multer = _interopRequireDefault(require("multer"));


var _fs = require("fs");
var _log = require("../log");
var _tenants = require("../tenants");
var _storage = require("./storage");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // eslint-disable-next-line node/no-restricted-import



const defaultStorage = _multer.default.diskStorage({
  filename(_req, file, cb) {
    cb(null, (0, _.generateFileName)(file));
  } });


const processOriginalFileName = (req) => {var _req$file;
  if (req.body.originalname) {
    return req.body.originalname;
  }

  _log.errorLog.debug(
  `[${
  _tenants.tenants.current().name
  // eslint-disable-next-line max-len
  }] Deprecation warning: providing the filename in the multipart header is deprecated and will stop working in the future. Include an 'originalname' field in the body instead.`);


  return (_req$file = req.file) === null || _req$file === void 0 ? void 0 : _req$file.originalname;
};

const singleUpload =
(type, tmpStorage = defaultStorage) =>
async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      (0, _multer.default)({ storage: tmpStorage }).single('file')(req, res, (err) => {
        if (!err) resolve();
        reject(err);
      });
    });
    if (req.file) {
      req.file.originalname = processOriginalFileName(req);
    }
    if (type) {
      await _storage.storage.storeFile(
      req.file.filename,
      (0, _fs.createReadStream)(_path.default.join(req.file.destination, req.file.filename)),
      type);

    }
    next();
  } catch (e) {
    next(e);
  }
};

const getFieldAndIndex = (fieldname) => {
  const fieldAndIndexPattern = /([a-zA-Z0-9]+)\[([0-9]+)\]/g;
  const groups = fieldAndIndexPattern.exec(fieldname);
  return groups && { field: groups[1], index: parseInt(groups[2], 10) };
};

const applyFilesOriginalnames = (req) => {
  if (req.files) {
    req.files.forEach((file) => {
      const fileField = getFieldAndIndex(file.fieldname);
      if (fileField) {var _req$body;
        const originalnameInBody = (_req$body = req.body[`${fileField.field}_originalname`]) === null || _req$body === void 0 ? void 0 : _req$body[fileField.index];
        if (originalnameInBody) {
          // eslint-disable-next-line no-param-reassign
          file.originalname = originalnameInBody;
        } else {
          _log.errorLog.debug(
          `[${
          _tenants.tenants.current().name
          // eslint-disable-next-line max-len
          }] Deprecation warning: relying on the filename in the multipart header is deprecated and will stop working in the future. Include an '${
          fileField.field
          }_originalname[${fileField.index}]' field in the body instead.`);

        }
      }
    });
  }
};

const multipleUpload = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      (0, _multer.default)({ storage: defaultStorage }).any()(req, res, (err) => {
        if (err) reject(err);
        applyFilesOriginalnames(req);
        resolve();
      });
    });
    next();
  } catch (e) {
    next(e);
  }
};

/**
 * accepts a single file and stores it based on type
 * @param type is optional, when undefined the file will be stored on the os tmp default dir
 */
const uploadMiddleware = (type) => singleUpload(type, defaultStorage);

/**
 * accepts multiple files and places them in req.files array
 * files will not be stored on disk and will be on a buffer on each element of the array.
 */exports.uploadMiddleware = uploadMiddleware;
uploadMiddleware.multiple = () => multipleUpload;

uploadMiddleware.customStorage = (tmpStorage, type) =>
singleUpload(type, tmpStorage);