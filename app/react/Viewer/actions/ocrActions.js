"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.postToOcr = exports.getOcrStatus = void 0;var _api = _interopRequireDefault(require("../../utils/api"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const postToOcr = async (filename) => {
  await _api.default.post(`files/${filename}/ocr`);
};exports.postToOcr = postToOcr;

const getOcrStatus = async (filename) => {
  const {
    json: { status, lastUpdated } } =
  await _api.default.get(`files/${filename}/ocr`);

  return { status, lastUpdated };
};exports.getOcrStatus = getOcrStatus;