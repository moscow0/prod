"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.FetchResponseError = void 0;exports.toUrlParams = toUrlParams;require("isomorphic-fetch");
var _superagent = _interopRequireDefault(require("superagent"));
var _url = require("url");

var _risonNode = _interopRequireDefault(require("rison-node"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

let cookie;

class FetchResponseError extends Error {
  // eslint-disable-next-line no-shadow
  constructor(message, { json, status, cookie, headers } = {}) {
    super(message);
    this.name = 'FetchResponseError';
    this.json = json;
    this.status = status;
    this.cookie = cookie;
    this.headers = headers;
  }}exports.FetchResponseError = FetchResponseError;


const attemptRisonDecode = (string) => {
  const errcb = (e) => {
    throw Error(`rison decoder error: ${e}`);
  };

  const risonParser = new _risonNode.default.parser(errcb); // eslint-disable-line new-cap
  risonParser.error = (message) => {
    (void 0).message = message;
  };

  risonParser.parse(string);
};

function toUrlParams(_data) {
  if (typeof _data === 'string') {
    return `?${_data}`;
  }

  const data = _objectSpread({}, _data);
  if (!data || Object.keys(data).length === 0) {
    return '';
  }

  return `?${Object.keys(data).
  map((key) => {
    if (typeof data[key] === 'undefined' || data[key] === null) {
      return;
    }

    if (typeof data[key] === 'object') {
      data[key] = JSON.stringify(data[key]);
    }

    let encodedValue = encodeURIComponent(data[key]);

    if (encodeURIComponent(key) === 'q') {
      try {
        attemptRisonDecode(data[key]);
        encodedValue = data[key];
      } catch (err) {
        encodedValue = encodeURIComponent(data[key]);
      }
    }
    return `${encodeURIComponent(key)}=${encodedValue}`;
  }).
  filter((param) => param).
  join('&')}`;
}

const removeUndefinedKeys = (obj) => {
  //eslint-disable-next-line no-param-reassign
  Object.keys(obj).forEach((key) => obj[key] === undefined ? delete obj[key] : {});
};

const _fetch = (url, data, method, _headers) => {
  let response;
  let params = '';
  let body;

  const headers = _objectSpread({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Cookie: cookie },
  _headers);


  if (method === 'GET' || method === 'DELETE') {
    params = toUrlParams(data);
  }

  if (method === 'POST' || method === 'PUT') {
    body = JSON.stringify(data);
  }

  if (_url.URLSearchParams && data instanceof _url.URLSearchParams) {
    body = data;
  }

  removeUndefinedKeys(headers);

  return fetch(url + params, {
    method,
    headers,
    credentials: 'same-origin',
    body }).

  then((res) => {
    let setCookie;
    if (res.headers.get('set-cookie')) {
      setCookie = res.headers.get('set-cookie');
    }
    response = res;
    // Failed .json() parsing usually indicates a non-success http status,
    // so we rather return that failure status than throw our own parsin
    // error.
    return Promise.all([res.json().catch(() => ({})), setCookie, res.headers]);
  }).
  then(([json, setCookie, responseHeaders]) => {
    const processedResponse = {
      json,
      status: response.status,
      cookie: setCookie,
      headers: responseHeaders };


    if (response.status > 399) {
      throw new FetchResponseError(
      `Fetch returned a response with status ${response.status}.`,
      processedResponse);

    }

    return processedResponse;
  });
};var _default =

{
  post: (url, data, headers) => _fetch(url, data, 'POST', headers),

  put: (url, data, headers) => _fetch(url, data, 'PUT', headers),

  get: (url, data, headers) => _fetch(url, data, 'GET', headers),

  delete: (url, data, headers) => _fetch(url, data, 'DELETE', headers),

  head: (url, data, headers) => _fetch(url, data, 'HEAD', headers),

  // TEST!!!!! Fully untested function
  uploadFile: (url, filename, file, _cookie) =>
  new Promise((resolve, reject) => {
    _superagent.default.
    post(url).
    set('Accept', 'application/json').
    set('X-Requested-With', 'XMLHttpRequest').
    set('Cookie', _cookie || cookie || '').
    attach('file', file, filename).
    then((response) => {
      resolve(response);
    }).
    catch((err) => {
      reject(err);
    });
  }),

  cookie: (c) => {
    cookie = c;
  } };exports.default = _default;