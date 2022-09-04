"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.objectPath = exports.logError = void 0;const objectPath = (path, object) =>
path.split('.').reduce((o, key) => {
  if (!o || !key) {
    return o;
  }
  return o.toJS ? o.get(key) : o[key];
}, object);exports.objectPath = objectPath;

const logError = (err, propValueOf, propLabelOf) => {
  /* eslint-disable no-console */
  console.error('Error on EntityData: ');
  console.error('value-of: ', propValueOf, '; label-of: ', propLabelOf);
  console.error(err);
  /* eslint-enable no-console */
};exports.logError = logError;