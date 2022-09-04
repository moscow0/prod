"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.socket = exports.reconnectSocket = void 0;var _socket2 = _interopRequireDefault(require("socket.io-client"));
var _utils = require("./utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

let _socket = { on: (_event, _listener) => {}, off: (_event, _listener) => {} };

if (_utils.isClient) {
  //only websockets used, this allows for non sticky sessions on load balancer
  _socket = (0, _socket2.default)({ transports: ['websocket'], upgrade: false });
}

const reconnectSocket = () => {
  _socket.disconnect();
  _socket.connect();
};exports.reconnectSocket = reconnectSocket;

const socket = _socket;exports.socket = socket;