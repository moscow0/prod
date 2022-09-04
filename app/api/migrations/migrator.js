"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.sortByDelta = exports.migrator = exports.getMigrations = void 0;

var _path = _interopRequireDefault(require("path"));

var _promises = _interopRequireDefault(require("fs/promises"));
var _migrationsModel = _interopRequireDefault(require("./migrationsModel"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable import/no-dynamic-require, global-require */ // eslint-disable-next-line node/no-restricted-import

const promiseInSequence = (funcs) =>
funcs.reduce(
(promise, func) => promise.then((result) => func().then(Array.prototype.concat.bind(result))),
Promise.resolve([]));


const sortByDelta = (migrations) => migrations.sort((a, b) => a.delta - b.delta);exports.sortByDelta = sortByDelta;

const getMigrations = async (migrationsDir) => {
  const [lastMigration] = await _migrationsModel.default.get({}, null, { limit: 1, sort: { delta: -1 } });
  const files = await _promises.default.readdir(migrationsDir);
  let migrations = files.map((migration) => require(_path.default.join(migrationsDir, migration)).default);
  migrations = sortByDelta(migrations);
  if (lastMigration) {
    migrations = migrations.map((m) => m.delta > lastMigration.delta ? m : null).filter((m) => m);
  }
  return migrations;
};exports.getMigrations = getMigrations;

const saveMigration = (migration) => _migrationsModel.default.save(migration);

const migrator = {
  migrationsDir: `${__dirname}/migrations/`,

  async migrate(db) {
    return getMigrations(this.migrationsDir).then((migrations) =>
    promiseInSequence(
    migrations.map((migration) => () => migration.up(db).then(() => saveMigration(migration)))));


  },
  shouldMigrate() {
    return getMigrations(this.migrationsDir).then((migrations) => Boolean(migrations.length));
  } };exports.migrator = migrator;