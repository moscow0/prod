"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _worldCountries = _interopRequireDefault(require("world-countries"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const CountryList = new Map(
_worldCountries.default.map((obj) => [obj.cca3, { cca2: obj.cca2, label: obj.name.common, cca3: obj.cca3 }]));var _default =


CountryList;exports.default = _default;