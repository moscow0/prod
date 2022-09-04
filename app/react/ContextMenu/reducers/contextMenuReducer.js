"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = contextMenuReducer;var _immutable = _interopRequireDefault(require("immutable"));

var actions = _interopRequireWildcard(require("../actions/actionTypes"));
var ViewerActions = _interopRequireWildcard(require("../../Viewer/actions/actionTypes"));
var UploadActions = _interopRequireWildcard(require("../../Uploads/actions/actionTypes"));
var LibraryActions = _interopRequireWildcard(require("../../Library/actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const initialState = { open: false, menu: null };

const panels = {
  referencePanel: 'ViewerSaveReferenceMenu',
  targetReferencePanel: 'ViewerSaveTargetReferenceMenu',
  viewMetadataPanel: 'MetadataPanelMenu' };


function contextMenuReducer(state = initialState, action = {}) {
  if (action.type === actions.OPEN_MENU) {
    return state.set('open', true);
  }

  if (action.type === actions.CLOSE_MENU) {
    return state.set('open', false);
  }

  if (action.type === ViewerActions.SET_SELECTION) {
    return state.set('type', 'ViewerTextSelectedMenu');
  }

  if (action.type === LibraryActions.ENTER_LIBRARY) {
    return state.set('type', 'LibraryMenu');
  }

  if (action.type === UploadActions.ENTER_UPLOADS_SECTION) {
    return state.set('type', 'UploadsMenu');
  }

  if (action.type === ViewerActions.OPEN_PANEL) {
    return state.set('type', panels[action.panel]);
  }

  if (
  action.type === ViewerActions.UNSET_SELECTION ||
  action.type === ViewerActions.LOAD_DEFAULT_VIEWER_MENU ||
  action.type === ViewerActions.ADD_REFERENCE ||
  action.type === ViewerActions.CLOSE_PANEL ||
  action.type === 'viewer/targetDoc/SET')
  {
    return state.set('type', 'ViewerDefaultMenu');
  }

  return _immutable.default.fromJS(state);
}