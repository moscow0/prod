"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;var _immutable = _interopRequireDefault(require("immutable"));
var types = _interopRequireWildcard(require("../actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const initialState = { reference: {}, snippet: {} };

const unsetPanelsWhenUnsetSelections = ['targetReferencePanel', 'referencePanel'];

function _default(state = initialState, action = {}) {
  if (action.type === types.HIGHLIGHT_REFERENCE) {
    return state.set('highlightedReference', action.reference);
  }

  if (action.type === types.SELECT_SNIPPET) {
    return state.set('snippet', action.snippet);
  }

  if (action.type === types.GO_TO_ACTIVE) {
    return state.set('goToActive', action.value);
  }

  if (action.type === types.DEACTIVATE_REFERENCE) {
    return state.remove('activeReference');
  }

  if (action.type === types.ACTIVE_REFERENCE) {
    return state.set('activeReference', action.reference);
  }

  if (action.type === types.OPEN_PANEL) {
    return state.set('panel', action.panel);
  }

  if (action.type === types.RESET_REFERENCE_CREATION) {
    return state.set('reference', _immutable.default.fromJS({}));
  }

  if (action.type === types.SET_SELECTION) {
    return state.
    setIn(['reference', 'sourceRange'], action.sourceRange).
    setIn(['reference', 'sourceFile'], action.sourceFile);
  }

  if (action.type === types.SET_TARGET_SELECTION) {
    return state.
    setIn(['reference', 'targetRange'], action.targetRange).
    setIn(['reference', 'targetFile'], action.targetFile);
  }

  if (action.type === types.UNSET_TARGET_SELECTION) {
    return state.setIn(['reference', 'targetRange'], null).setIn(['reference', 'targetFile'], null);
  }

  if (action.type === types.UNSET_SELECTION) {
    const newState = state.
    setIn(['reference', 'sourceRange'], null).
    setIn(['reference', 'sourceFile'], null);
    if (unsetPanelsWhenUnsetSelections.indexOf(state.get('panel')) !== -1) {
      return newState.set('panel', false);
    }
    return newState;
  }

  if (action.type === 'viewer/targetDocHTML/SET' || action.type === types.CLOSE_PANEL) {
    return state.set('panel', false);
  }

  if (action.type === types.ADD_REFERENCE) {
    return state.set('reference', _immutable.default.fromJS({})).set('panel', false);
  }

  if (action.type === 'viewer/documentResults/SET') {
    let newState = state;
    const selectedInResults = action.value.find(
    (result) => result._id === state.getIn(['reference', 'targetDocument']));

    if (!selectedInResults) {
      newState = state.deleteIn(['reference', 'targetDocument']);
    }
    return newState.set('viewerSearching', false);
  }

  if (action.type === types.SELECT_TARGET_DOCUMENT) {
    return state.setIn(['reference', 'targetDocument'], action.id);
  }

  if (action.type === types.RESET_DOCUMENT_VIEWER) {
    return _immutable.default.fromJS(initialState);
  }

  return _immutable.default.fromJS(state);
}