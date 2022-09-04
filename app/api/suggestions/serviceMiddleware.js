"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.serviceMiddleware = void 0;
var _settings = _interopRequireDefault(require("../settings/settings"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const serviceMiddleware = async (_req, res, next) => {var _features$metadataExt;
  const { features } = await _settings.default.get();
  if (features !== null && features !== void 0 && (_features$metadataExt = features.metadataExtraction) !== null && _features$metadataExt !== void 0 && _features$metadataExt.url) {
    next();
    return;
  }

  res.status(404).send({});
};exports.serviceMiddleware = serviceMiddleware;