"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.downloadRedis = void 0;

var _fs = _interopRequireDefault(require("fs"));
var _child_process = require("child_process");
var _path = _interopRequireDefault(require("path"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable no-console */ //eslint-disable-next-line node/no-restricted-import

const downloadRedis = () => {
  const redisVersion = (0, _child_process.execSync)('cat .redis_version').toString().replace('\n', '');
  const pathToBin = _path.default.join(__dirname, '../../../redis-bin/redis-stable/src/redis-server');
  console.log(pathToBin);
  if (_fs.default.existsSync(pathToBin)) {
    return;
  }
  console.log('Downloading redis...');

  (0, _child_process.execSync)('mkdir -p redis-bin', { stdio: 'ignore' });
  (0, _child_process.execSync)(
  `cd redis-bin && curl -O http://download.redis.io/releases/redis-${redisVersion}.tar.gz`,
  { stdio: 'ignore' });

  (0, _child_process.execSync)(`cd redis-bin && tar xzvf redis-${redisVersion}.tar.gz`, { stdio: 'ignore' });
  (0, _child_process.execSync)(`cd redis-bin && mv redis-${redisVersion} redis-stable`, { stdio: 'ignore' });

  console.log('Downloading redis... Done');
  console.log('Installing redis...');
  (0, _child_process.execSync)(
  `cd redis-bin &&
       cd redis-stable &&
       make distclean &&
       make`,
  { stdio: 'ignore' });

  console.log('Installing redis... Done');
};exports.downloadRedis = downloadRedis;