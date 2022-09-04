"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.synchronizer = void 0;var _urlJoin = _interopRequireDefault(require("url-join"));

var _JSONRequest = _interopRequireDefault(require("../../shared/JSONRequest"));
var _files = require("../files");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}




const uploadFile = async (
url,
filename,
cookie,
type = 'document') =>
{
  let apiEndpoint = 'api/sync/upload';
  if (type === 'custom') {
    apiEndpoint = 'api/sync/upload/custom';
  }

  const file = await _files.storage.fileContents(filename, type);
  return _JSONRequest.default.uploadFile((0, _urlJoin.default)(url, apiEndpoint), filename, file, cookie);
};

const synchronizer = {
  async syncDelete(change, url, cookie) {
    await this.syncData(
    {
      url,
      change,
      data: { _id: change.mongoId },
      cookie },

    'delete');

  },

  async syncData(
  {
    url,
    change,
    data,
    cookie },

  action)
  {
    await _JSONRequest.default[action](
    (0, _urlJoin.default)(url, 'api/sync'),
    { namespace: change.namespace, data },
    { cookie });


    if (change.namespace === 'files' && data.filename) {
      await uploadFile(url, data.filename, cookie, data.type);
    }
  } };exports.synchronizer = synchronizer;