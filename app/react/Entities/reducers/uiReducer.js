"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.initialState = exports.default = void 0;var _immutable = _interopRequireDefault(require("immutable"));
var types = _interopRequireWildcard(require("../actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const initialState = { userSelectedTab: false };exports.initialState = initialState;

const reducer = (state = initialState, action = {}) => {
  if (action.type === types.SHOW_TAB) {
    return state.set('tab', action.tab).set('userSelectedTab', true).set('showFilters', false);
  }

  if (action.type === types.RESET_USER_SELECTED_TAB) {
    return state.set('userSelectedTab', false);
  }

  if (action.type === types.HIDE_FILTERS) {
    return state.set('showFilters', false);
  }

  if (action.type === types.SHOW_FILTERS) {
    return state.set('tab', 'connections').set('showFilters', true);
  }

  return _immutable.default.fromJS(state);
};var _default =

reducer;exports.default = _default;