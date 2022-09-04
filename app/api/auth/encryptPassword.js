"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.comparePasswords = void 0;var _bcryptjs = _interopRequireDefault(require("bcryptjs"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const saltRounds = 10;

const encryptPassowrd = async (plainPassword) => _bcryptjs.default.hash(plainPassword, saltRounds);
const comparePasswords = async (plain, hashed) => _bcryptjs.default.compare(plain, hashed);exports.comparePasswords = comparePasswords;var _default =

encryptPassowrd;exports.default = _default;