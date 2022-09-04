"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _activitylogMiddleware = require("../../../activitylog/activitylogMiddleware");
var _date = _interopRequireDefault(require("../../../utils/date"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

{
  delta: 29,

  name: 'activity_log_sanitization',

  description: 'remove activity log entries that do not contain relevant content',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    const deletedEntriesByMethod = await db.
    collection('activitylogs').
    deleteMany({ method: { $in: ['GET', 'OPTIONS', 'HEAD'] } });
    process.stdout.write(
    `${deletedEntriesByMethod.result.n} activity log entries deleted with unneeded methods\r\n`);


    const deletedEntriesByEndpoint = await db.
    collection('activitylogs').
    deleteMany({ url: { $in: _activitylogMiddleware.IGNORED_ENDPOINTS } });
    process.stdout.write(
    `${deletedEntriesByEndpoint.result.n} activity log entries deleted with unneeded endpoints\r\n`);


    const deletedUploadEntriesWithoutBody = await db.
    collection('activitylogs').
    deleteMany({ url: { $in: _activitylogMiddleware.BODY_REQUIRED_ENDPOINTS }, body: '{}' });
    process.stdout.write(
    `${deletedUploadEntriesWithoutBody.result.n} activity log POST entries deleted with empty bodies\r\n`);


    const deletedUpdateLogsForActivityLog = await db.
    collection('updatelogs').
    deleteMany({ namespace: 'activitylog' });
    process.stdout.write(
    `${deletedUpdateLogsForActivityLog.result.n} updatelogs deleted for activitylog namespace\r\n`);


    await db.collection('activitylogs').createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
    process.stdout.write('TTL index added over expireAt\r\n');

    const nextYear = _date.default.addYearsToCurrentDate(1);
    const updatedEntries = await db.
    collection('activitylogs').
    updateMany({}, { $set: { expireAt: nextYear } });

    process.stdout.write(
    `${updatedEntries.result.n} activity log entries updated with expiration date\r\n`);


    process.stdout.write('\r\n');
  } };exports.default = _default;