"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.filterOptions = filterOptions;var _diacritics = require("diacritics");

function matchesFilter(subject, filter) {
  return (0, _diacritics.remove)(subject.toLowerCase()).includes((0, _diacritics.remove)(filter.toLowerCase()));
}

function filterOptions(filter, options, optionsLabel = 'label') {
  return options.filter(
  (opt) =>
  matchesFilter(opt[optionsLabel], filter) ||
  opt.options && opt.options.some((childOpt) => matchesFilter(childOpt[optionsLabel], filter)));

}var _default =

{
  filterOptions };exports.default = _default;