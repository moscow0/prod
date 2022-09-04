"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _moment = _interopRequireDefault(require("moment"));

var _anyDateParser = _interopRequireDefault(require("any-date-parser"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // @ts-ignore
var _default =
{
  currentUTC() {
    return _moment.default.utc().toDate().getTime();
  },

  descriptionToTimestamp(date) {
    if (date === 'last-day-last-month') {
      return _moment.default.utc().subtract(1, 'months').endOf('month').unix();
    }

    if (date === 'first-day-last-month') {
      return _moment.default.utc().subtract(1, 'months').startOf('month').unix();
    }

    return date;
  },

  addYearsToCurrentDate(yearsToAdd) {
    const newDate = new Date();
    newDate.setHours(0, 0, 0, 0);
    newDate.setFullYear(newDate.getFullYear() + yearsToAdd);
    return newDate;
  },

  dateToSeconds(value, locale) {
    const parsedValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let getDate = _anyDateParser.default.fromString(parsedValue, locale);
    if (getDate.invalid) {
      getDate = Date.parse(`${parsedValue} GMT`);
    }
    const formattedDate = getDate / 1000;
    return formattedDate;
  } };exports.default = _default;