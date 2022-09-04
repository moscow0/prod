"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.isSameDate = void 0;var _moment = _interopRequireDefault(require("moment"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const isSameDate = (first, second) =>
_moment.default.unix(first).utc().isSame(_moment.default.unix(second).utc(), 'day');exports.isSameDate = isSameDate;