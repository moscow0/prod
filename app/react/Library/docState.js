"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _reselect = require("reselect");

const docState = (0, _reselect.createSelector)(
(state, props) => state.progress.get(props.doc.get('sharedId')),
(_state, props) => {
  if (!props.doc.get('documents')) {
    return null;
  }
  if (!props.doc.get('documents').size) {
    return null;
  }
  return props.doc.get('documents').reduce((_processed, d) => d.get('status'), 'ready');
},
(_state, props) => props.doc.get('documents') && !props.doc.get('documents').size,
(_state, props) => props.doc.get('template'),
(progress, docsStatus, isEntity, template) => {
  if (!template && (docsStatus === 'ready' || isEntity)) {
    return {
      progress,
      status: 'warning',
      message: 'No type selected' };

  }

  if (progress >= 0 && progress < 100) {
    return {
      progress,
      status: 'processing',
      message: 'Uploading...' };

  }

  if (docsStatus === 'failed' && !isEntity) {
    return {
      status: 'danger',
      message: 'Conversion failed' };

  }

  if (docsStatus === 'processing' && !isEntity) {
    return {
      progress: 100,
      status: 'processing',
      message: 'Processing...' };

  }

  return {};
});var _default =


docState;exports.default = _default;