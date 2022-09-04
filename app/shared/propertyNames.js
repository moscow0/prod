"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.safeName = void 0;const generateNewSafeName = (label) =>
label.
trim().
replace(/[#|\\|/|*|?|"|<|>|=|||\s|:|.|[|\]|%]/gi, '_').
replace(/^[_|\-|+|$]/, '').
toLowerCase();

const safeName = (label, newNameGeneration = false) => {
  if (newNameGeneration) {
    return generateNewSafeName(label);
  }
  return label.
  trim().
  replace(/[^a-z0-9]/gi, '_').
  toLowerCase();
};exports.safeName = safeName;