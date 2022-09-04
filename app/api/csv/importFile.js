"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ImportFile = void 0;var _path = _interopRequireDefault(require("path"));

var _filesystem = require("../files/filesystem");
var _utils = require("../utils");
var _zipFile = _interopRequireDefault(require("../utils/zipFile"));

var _fs = require("fs");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const extractFromZip = async (zipPath, fileName) => {
  const readStream = await (0, _zipFile.default)(zipPath).findReadStream((entry) => entry === fileName);

  if (!readStream) {
    throw (0, _utils.createError)(`${fileName} file not found`);
  }

  return readStream;
};

class ImportFile {


  constructor(filePath) {_defineProperty(this, "filePath", void 0);
    this.filePath = filePath;
  }

  async readStream(fileName = 'import.csv') {
    if (_path.default.extname(this.filePath) === '.zip') {
      return extractFromZip(this.filePath, fileName);
    }
    return (0, _fs.createReadStream)(this.filePath);
  }

  async extractFile(fileName) {
    const generatedName = (0, _filesystem.generateFileName)({ originalname: fileName });

    await (0, _filesystem.fileFromReadStream)(generatedName, await this.readStream(fileName), '/tmp');

    return {
      destination: '/tmp',
      path: `/tmp/${generatedName}`,
      originalname: fileName,
      filename: generatedName };

  }}exports.ImportFile = ImportFile;


const importFile = (filePath) => new ImportFile(filePath);var _default =

importFile;exports.default = _default;