"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = templatesUI;var _immutable = _interopRequireDefault(require("immutable"));

var actions = _interopRequireWildcard(require("../actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const initialState = { thesauris: [], templates: [], propertyBeingDeleted: null };

function templatesUI(state = initialState, action = {}) {
  if (action.type === actions.EDIT_PROPERTY) {
    return state.set('editingProperty', action.id);
  }

  if (action.type === actions.SET_THESAURIS) {
    return state.set('thesauris', action.thesauris);
  }

  if (action.type === actions.SET_TEMPLATES) {
    return state.set('templates', action.templates);
  }

  if (action.type === actions.SAVING_TEMPLATE) {
    return state.set('savingTemplate', true);
  }

  if (action.type === actions.TEMPLATE_SAVED) {
    return state.set('savingTemplate', false);
  }

  return _immutable.default.fromJS(state);
}