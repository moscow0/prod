"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _url = _interopRequireDefault(require("url"));



var _tsUtils = require("../../shared/tsUtils");

var _moment = _interopRequireDefault(require("moment"));
var _generatedid = _interopRequireDefault(require("./typeParsers/generatedid"));
var _geolocation = _interopRequireDefault(require("./typeParsers/geolocation"));
var _multiselect = _interopRequireDefault(require("./typeParsers/multiselect"));
var _select = _interopRequireDefault(require("./typeParsers/select"));
var _relationship = _interopRequireDefault(require("./typeParsers/relationship"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const defaultParser = async (
entityToImport,
property) =>
[{ value: entityToImport[(0, _tsUtils.ensure)(property.name)] }];

const parseDateValue = (dateValue, dateFormat) => {
  const allowedFormats = [
  dateFormat.toUpperCase(),
  'LL',
  'YYYY MM DD',
  'YYYY/MM/DD',
  'YYYY-MM-DD',
  'YYYY'];


  return _moment.default.utc(dateValue, allowedFormats).unix();
};

const parseDate = (dateValue, dateFormat) => ({
  value: parseDateValue(dateValue, dateFormat) });


const parseDateRange = (rangeValue, dateFormat) => {
  const [from, to] = rangeValue.split(':');

  return {
    value: {
      from: parseDateValue(from, dateFormat),
      to: parseDateValue(to, dateFormat) } };


};

const parseMultiValue = (values) => values.split('|').filter((value) => value !== '');var _default =

{
  nested: defaultParser,
  preview: defaultParser,
  image: defaultParser,
  media: defaultParser,
  markdown: defaultParser,
  text: defaultParser,
  generatedid: _generatedid.default,
  geolocation: _geolocation.default,
  select: _select.default,
  multiselect: _multiselect.default,
  relationship: _relationship.default,

  async numeric(
  entityToImport,
  property)
  {
    const value = entityToImport[(0, _tsUtils.ensure)(property.name)];
    return Number.isNaN(Number(value)) ? [{ value }] : [{ value: Number(value) }];
  },

  async date(
  entityToImport,
  property,
  dateFormat)
  {
    const date = entityToImport[(0, _tsUtils.ensure)(property.name)];
    return [parseDate(date, dateFormat)];
  },

  async multidate(
  entityToImport,
  property,
  dateFormat)
  {
    const dates = parseMultiValue(entityToImport[(0, _tsUtils.ensure)(property.name)]);
    return dates.map((date) => parseDate(date, dateFormat));
  },

  async daterange(
  entityToImport,
  property,
  dateFormat)
  {
    const range = entityToImport[(0, _tsUtils.ensure)(property.name)];
    return [parseDateRange(range, dateFormat)];
  },

  async multidaterange(
  entityToImport,
  property,
  dateFormat)
  {
    const ranges = parseMultiValue(entityToImport[(0, _tsUtils.ensure)(property.name)]);
    return ranges.map((range) => parseDateRange(range, dateFormat));
  },

  async link(
  entityToImport,
  property)
  {
    let [label, linkUrl] = entityToImport[(0, _tsUtils.ensure)(property.name)].split('|');

    if (!linkUrl) {
      linkUrl = entityToImport[(0, _tsUtils.ensure)(property.name)];
      label = linkUrl;
    }

    if (!_url.default.parse(linkUrl).host) {
      return null;
    }

    return [
    {
      value: {
        label,
        url: linkUrl } }];



  } };exports.default = _default;