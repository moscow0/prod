"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;var _immutable = require("immutable");

var viewerTypes = _interopRequireWildcard(require("../../Viewer/actions/actionTypes"));

var types = _interopRequireWildcard(require("../actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const initialState = {
  template: '',
  targetDocument: '',
  sourceDocument: '',
  sourceFile: '',
  targetFile: '' };


const resetState = (state) => {
  const propertiesToReset = ['template', 'targetDocument', 'sourceDocument'];
  const newState = state.toJS();
  propertiesToReset.forEach((key) => {
    newState[key] = '';
  });
  return (0, _immutable.fromJS)(newState);
};

function _default(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case types.OPEN_CONNECTION_PANEL:
      newState = resetState(state.set('type', action.connectionType));

      return newState.set('sourceDocument', action.sourceDocument);

    case types.SET_RELATION_TYPE:
      return state.set('template', action.template);

    case types.SET_TARGET_DOCUMENT:
      return state.set('targetDocument', action.id);

    case 'connections/searchResults/SET':
      if (!action.value.find((v) => v.sharedId === state.get('targetDocument'))) {
        return state.delete('targetDocument');
      }
      return state;

    case viewerTypes.SET_SELECTION:
      return state.set('sourceRange', action.sourceRange).set('sourceFile', action.sourceFile);

    case viewerTypes.UNSET_SELECTION:
    case types.CONNECTION_CREATED:
      return state.delete('sourceRange');

    default:
      return (0, _immutable.fromJS)(state);}

}