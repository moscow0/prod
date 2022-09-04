"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.DB = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = require("../config");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

let connection;

// setting this on createConnection directly is not working, maybe mongoose bug?
_mongoose.default.set('useCreateIndex', true);

const DB = {
  async connect(uri = _config.config.DBHOST, auth = {}) {
    connection = await _mongoose.default.createConnection(uri, _objectSpread(_objectSpread({},
    auth), {}, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      poolSize: _config.config.mongo_connection_pool_size }));


    return this.getConnection();
  },

  async disconnect() {
    return _mongoose.default.disconnect();
  },

  connectionForDB(dbName, options = { useCache: true, noListener: true }) {
    return this.getConnection().useDb(dbName, options);
  },

  getConnection() {
    return connection;
  } };exports.DB = DB;