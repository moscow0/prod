"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.formatters = exports.formatFile = exports.formatDocuments = exports.formatDate = exports.formatCreationDate = exports.formatAttachments = exports.formatAttachment = void 0;var _momentTimezone = _interopRequireDefault(require("moment-timezone"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const defaultDateFormat = 'YYYY-MM-DD';

const mapFormatToMoment = (format) => format.replace('dd', 'DD').replace('yyyy', 'YYYY');

const formatDate = (timestamp, format = defaultDateFormat) =>
_momentTimezone.default.unix(timestamp).utc().format(mapFormatToMoment(format));exports.formatDate = formatDate;

const formatFile = (fileName) => `/files/${fileName}`;exports.formatFile = formatFile;

const formatAttachment = (fileName, entityId) =>
`/api/attachments/download?_id=${entityId}&file=${fileName}`;exports.formatAttachment = formatAttachment;

const formatRelationship = (field) =>
field.
map((relationship) => {
  if (relationship.inheritedValue && relationship.inheritedValue.length) {
    return relationship.inheritedValue[0].value;
  }
  return relationship.label;
}).
join('|');










const formatters =

{
  select: (field) => field[0] && field[0].value && field[0].label ? field[0].label : '',
  multiselect: (field, options) => field.map((item) => formatters.select([item], options)).join('|'),
  date: (field, options) =>
  field[0] && field[0].value ? formatDate(field[0].value, options === null || options === void 0 ? void 0 : options.dateFormat) : '',
  daterange: (field, options) =>
  field[0] && field[0].value ?
  `${formatDate(field[0].value.from, options === null || options === void 0 ? void 0 : options.dateFormat)}~${formatDate(
  field[0].value.to,
  options === null || options === void 0 ? void 0 : options.dateFormat)
  }` :
  '',
  geolocation: (field) =>
  field[0] && field[0].value ? `${field[0].value.lat}|${field[0].value.lon}` : '',
  link: (field) =>
  field[0] && field[0].value ? `${field[0].value.label}|${field[0].value.url}` : '',
  multidate: (field, options) => field.map((item) => formatters.date([item], options)).join('|'),
  multidaterange: (field, options) =>
  field.map((item) => formatters.daterange([item], options)).join('|'),
  numeric: (field) =>
  field[0] && (field[0].value || field[0].value === 0) ? field[0].value : '',
  relationship: (field) => formatRelationship(field),
  default: (field) => field[0] && field[0].value ? field[0].value : '' };exports.formatters = formatters;


const formatDocuments = (row) =>
(row.documents || []).map((item) => formatFile(item.filename)).join('|');exports.formatDocuments = formatDocuments;
const formatAttachments = (row) =>
(row.attachments || []).map((item) => formatAttachment(item.filename, row._id)).join('|');exports.formatAttachments = formatAttachments;
const formatCreationDate = (row, options) =>
(0, _momentTimezone.default)(row.creationDate).format(mapFormatToMoment(options.dateFormat || defaultDateFormat));exports.formatCreationDate = formatCreationDate;