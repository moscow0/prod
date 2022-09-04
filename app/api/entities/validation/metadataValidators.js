"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validators = exports.customErrorMessages = void 0;var _util = require("util");
var _propertyTypes = require("../../../shared/propertyTypes");

const validateSingleWrappedValue = (validationFn) => (value) => {
  if (value.length !== 1) {
    return !value.length;
  }

  if (value[0].value === null) {
    return true;
  }

  const [{ value: pureValue }] = value;
  return validationFn(pureValue);
};

const isEmpty = (value) =>
(0, _util.isNull)(value) || (0, _util.isUndefined)(value) || !value.length || !value.some((v) => v.value);

const isNonArrayObject = (value) => (0, _util.isObject)(value) && !Array.isArray(value);

const validateDateProperty = (value) => (0, _util.isNumber)(value);

const isValidDateRange = (value) => {
  if (!isNonArrayObject(value)) {
    return false;
  }

  if (validateDateProperty(value.from) && validateDateProperty(value.to)) {
    return value.from <= value.to;
  }

  if ((0, _util.isString)(value.from) || (0, _util.isString)(value.to)) {
    return false;
  }

  return true;
};

const isValidSelect = (value) => (0, _util.isString)(value);

const isValidGeolocation = (value) => (0, _util.isNumber)(value.lat) && (0, _util.isNumber)(value.lon);

const validateRequiredProperty = (property, value) => {
  if (property.required) {
    if (property.type === 'numeric') {
      return value[0] && value[0].value === 0 || !isEmpty(value);
    }

    return !isEmpty(value);
  }
  return true;
};

const isValidLinkField = (value) =>
(0, _util.isString)(value.label) && (0, _util.isString)(value.url) && (value.label && value.url || !value.label);

const validateNumericProperty = (value) =>
(0, _util.isNumber)(value) || value === '' || (0, _util.isString)(value) && `${parseInt(value, 10)}` === value;

const validateMultiDateProperty = (value) =>
Array.isArray(value) && value.every((item) => (0, _util.isNumber)(item.value) || (0, _util.isNull)(item.value));

const validateMultiDateRangeProperty = (value) =>
Array.isArray(value) && value.every((item) => isValidDateRange(item.value));

const validateGeolocationProperty = (value) =>
Array.isArray(value) && value.every((item) => isValidGeolocation(item.value));

const validateMultiSelectProperty = (value) =>
Array.isArray(value) && value.every((item) => isValidSelect(item.value) && item.value);

const validateLuceneBytesLimit = (value) => {
  const LUCENE_BYTES_LIMIT = 32766;
  const bytes = Buffer.from(JSON.stringify(value));
  return bytes.length < LUCENE_BYTES_LIMIT;
};

const customErrorMessages = {
  required: 'property is required',
  length_exceeded: 'maximum field length exceeded',
  property_not_allowed: 'property is not configured on the template, it is not allowed',
  relationship_wrong_foreign_id: 'related entities do not exist or belong to another template',
  dictionary_wrong_foreing_id: 'related dictionary value/s does not exists',
  relationship_values_should_match:
  'relationships with the same configuration should have the same values',
  [_propertyTypes.propertyTypes.date]: 'should be number',
  [_propertyTypes.propertyTypes.multidate]: 'should be an array of numbers',
  [_propertyTypes.propertyTypes.daterange]:
  'should be a "{ to: number, from: number }" object, "to" should be greater than "from"',
  [_propertyTypes.propertyTypes.multidaterange]:
  'should be a "[ { to: number, from: number } ]" collection, "to" should be greater than "from"',
  [_propertyTypes.propertyTypes.text]: 'should be a string',
  [_propertyTypes.propertyTypes.markdown]: 'should be a string',
  [_propertyTypes.propertyTypes.media]: 'should be a string',
  [_propertyTypes.propertyTypes.image]: 'should be a string',
  [_propertyTypes.propertyTypes.select]: 'should be a "[ { value: string } ]" with a single object',
  [_propertyTypes.propertyTypes.multiselect]: 'should be an array of non empty strings',
  [_propertyTypes.propertyTypes.relationship]: 'should be an array of non empty strings',
  [_propertyTypes.propertyTypes.numeric]: 'should be number',
  [_propertyTypes.propertyTypes.link]:
  'should be a "{ label: string, url: string }" object properties can not be blank',
  [_propertyTypes.propertyTypes.geolocation]:
  'should be a "[ { lat: number, lon: number, label: string } ]" collection, lat and lon are required' };exports.customErrorMessages = customErrorMessages;


const validators = {
  [_propertyTypes.propertyTypes.date]: validateSingleWrappedValue(validateDateProperty),
  [_propertyTypes.propertyTypes.multidate]: validateMultiDateProperty,
  [_propertyTypes.propertyTypes.daterange]: validateSingleWrappedValue(isValidDateRange),
  [_propertyTypes.propertyTypes.multidaterange]: validateMultiDateRangeProperty,
  [_propertyTypes.propertyTypes.text]: validateSingleWrappedValue(_util.isString),
  [_propertyTypes.propertyTypes.markdown]: validateSingleWrappedValue(_util.isString),
  [_propertyTypes.propertyTypes.media]: validateSingleWrappedValue(_util.isString),
  [_propertyTypes.propertyTypes.image]: validateSingleWrappedValue(_util.isString),
  [_propertyTypes.propertyTypes.select]: validateSingleWrappedValue(isValidSelect),
  [_propertyTypes.propertyTypes.numeric]: validateSingleWrappedValue(validateNumericProperty),
  [_propertyTypes.propertyTypes.multiselect]: validateMultiSelectProperty,
  [_propertyTypes.propertyTypes.relationship]: validateMultiSelectProperty,
  [_propertyTypes.propertyTypes.link]: validateSingleWrappedValue(isValidLinkField),
  [_propertyTypes.propertyTypes.geolocation]: validateGeolocationProperty,
  validateRequiredProperty,
  validateLuceneBytesLimit };exports.validators = validators;