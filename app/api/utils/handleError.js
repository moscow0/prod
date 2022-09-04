"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.prettifyError = exports.handleError = void 0;var _log = require("../log");
var _ajv = _interopRequireDefault(require("ajv"));
var _index = require("./index");
var _AppContext = require("./AppContext");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const ajvPrettifier = (error) => {
  const errorMessage = [error.message];
  if (error.errors && error.errors.length) {
    error.errors.forEach((oneError) => {
      errorMessage.push(`${oneError.instancePath}: ${oneError.message}`);
    });
  }
  return errorMessage.join('\n');
};

const joiPrettifier = (error, req) => {
  const url = req.originalUrl ? `\nurl: ${req.originalUrl}` : '';
  const body =
  req.body && Object.keys(req.body).length ?
  `\nbody: ${JSON.stringify(req.body, null, ' ')}` :
  '';
  const query =
  req.query && Object.keys(req.query).length ?
  `\nquery: ${JSON.stringify(req.query, null, ' ')}` :
  '';
  const errorString = `\n${error.message || JSON.stringify(error.json)}`;

  let errorMessage = `${url}${body}${query}${errorString}`;

  //if the resulting message is empty, or meaningless combination of characters ('{}')
  if (errorMessage.match(/^[{}\s]*$/g)) {
    errorMessage = JSON.stringify(error, null, 2);
  }

  return errorMessage;
};

const appendOriginalError = (message, originalError) =>
`${message}\noriginal error: ${JSON.stringify(originalError, null, ' ')}`;

const obfuscateCredentials = (req) => {
  const obfuscated = req;
  if (req.body && req.body.password) {
    obfuscated.body.password = '########';
  }

  if (req.body && req.body.username) {
    obfuscated.body.username = '########';
  }

  return obfuscated;
};

// eslint-disable-next-line max-statements
const prettifyError = (error, { req = {}, uncaught = false } = {}) => {
  let result = error;

  if (error instanceof Error) {
    result = { code: 500, message: error.stack };
  }

  if (error instanceof _ajv.default.ValidationError) {
    result = { code: 422, message: error.message, validations: error.errors };
  }

  if (error.name === 'ValidationError') {
    result = { code: 422, message: error.message, validations: error.properties };
  }

  if (error.name === 'MongoError') {
    result.code = 500;
  }

  if (error.message && error.message.match(/Cast to ObjectId failed for value/)) {
    result.code = 400;
  }

  if (error.message && error.message.match(/rison decoder error/)) {
    result.code = 400;
  }

  if (uncaught) {
    result.message = `uncaught exception or unhandled rejection, Node process finished !!\n ${result.message}`;
  }

  const obfuscatedRequest = obfuscateCredentials(req);
  result.prettyMessage = error.ajv ?
  ajvPrettifier(result) :
  joiPrettifier(result, obfuscatedRequest);

  return result;
};exports.prettifyError = prettifyError;

const getErrorMessage = (data, error) => {
  const originalError = data.original || error;
  const prettyMessage = data.requestId ?
  `requestId: ${data.requestId} ${data.prettyMessage}` :
  data.prettyMessage;

  if (originalError instanceof Error) {
    const extendedError = appendOriginalError(prettyMessage, originalError);
    return data.tenantError ?
    `${extendedError}\n[Tenant error] ${data.tenantError.message}` :
    extendedError;
  }

  return prettyMessage;
};

const sendLog = (data, error, errorOptions) => {
  const messageToLog = getErrorMessage(data, error);
  if (data.code === 500) {
    _log.errorLog.error(messageToLog, errorOptions);
  } else if (data.code === 400) {
    _log.debugLog.debug(messageToLog, errorOptions);
  }
};

function simplifyError(result, error) {
  const simplifiedError = _objectSpread({}, result);
  delete simplifiedError.original;

  if (error instanceof Error) {
    simplifiedError.prettyMessage = error.message;
    simplifiedError.error = error.message;
    delete simplifiedError.message;
  } else {
    simplifiedError.prettyMessage = simplifiedError.prettyMessage || error.message;
  }

  return simplifiedError;
}

function setRequestId(result) {
  try {
    return _objectSpread(_objectSpread({}, result), {}, { requestId: _AppContext.appContext.get('requestId') });
  } catch (err) {
    return _objectSpread(_objectSpread({}, result), {}, { tenantError: err });
  }
}

const handleError = (_error, { req = undefined, uncaught = false, useContext = true } = {}) => {
  const errorData = typeof _error === 'string' ? (0, _index.createError)(_error, 500) : _error;

  const error = errorData || new Error('Unexpected error has occurred');
  let result = prettifyError(error, { req, uncaught });

  if (useContext) {
    result = setRequestId(result);
  }

  sendLog(result, error, {});

  return simplifyError(result, error);
};exports.handleError = handleError;