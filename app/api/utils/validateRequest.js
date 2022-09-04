"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateAndCoerceRequest = exports.default = void 0;var _ajv = _interopRequireDefault(require("ajv"));
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _tsUtils = require("../../shared/tsUtils");
var _ajvFormats = _interopRequireDefault(require("ajv-formats"));
var _Error = _interopRequireDefault(require("./Error"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_joi.default.objectId = (0, _joiObjectid.default)(_joi.default);

const ajv = new _ajv.default({ allErrors: true });
ajv.addVocabulary(['tsType']);
const coercedAjv = new _ajv.default({ allErrors: true, coerceTypes: 'array' });
coercedAjv.addVocabulary(['tsType']);

(0, _ajvFormats.default)(ajv);

const JoiDeprecatedValidation = (schema, propTovalidate, req, next) => {
  const result = _joi.default.validate(req[propTovalidate], schema);
  if (result.error) {
    next((0, _Error.default)(result.error.toString(), 400));
  }

  if (!result.error) {
    next();
  }
};

const ajvValidation = async (ajvInstance, schema, req, next) => {
  try {
    // do not create a new schema based of this one, this creates a memory leak
    // https://ajv.js.org/guide/managing-schemas.html#using-ajv-instance-cache
    // eslint-disable-next-line no-param-reassign
    schema.$async = true;
    //
    const validator = (0, _tsUtils.wrapValidator)(ajvInstance.compile(schema));
    await validator(req);
    next();
  } catch (e) {
    next((0, _Error.default)(e, 400));
  }
};

const createRequestValidator =
(ajvInstance) =>
(schema, propTovalidate = 'body') =>
async (req, _res, next) => {
  if (schema.isJoi) {
    JoiDeprecatedValidation(schema, propTovalidate, req, next);
    return;
  }

  await ajvValidation(ajvInstance, schema, req, next);
};

const validateAndCoerceRequest = createRequestValidator(coercedAjv);exports.validateAndCoerceRequest = validateAndCoerceRequest;var _default =

createRequestValidator(ajv);exports.default = _default;