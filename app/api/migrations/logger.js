"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.logTypes = exports.default = void 0;var _activitylogModel = _interopRequireDefault(require("../activitylog/activitylogModel"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const logTypes = {
  FIELD_PARSE_ERROR: 'fieldParseError' };exports.logTypes = logTypes;


function log(body) {
  const time = Date.now();
  const entry = {
    url: '',
    method: 'MIGRATE',
    params: '',
    query: '',
    body: JSON.stringify(body),
    user: null,
    username: 'System',
    time };

  _activitylogModel.default.save(entry);
}

function logFieldParseError(
{ template, sharedId, title, propertyName, value },
migrationName = 'unknown migration')
{
  log({
    type: logTypes.FIELD_PARSE_ERROR,
    migrationName,
    template,
    sharedId,
    title,
    propertyName,
    value });

}var _default =

{
  logFieldParseError };exports.default = _default;