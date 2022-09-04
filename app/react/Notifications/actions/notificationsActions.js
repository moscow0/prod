"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.notify = notify;exports.removeNotification = removeNotification;var actions = _interopRequireWildcard(require("./actionTypes"));
var _uniqueID = _interopRequireDefault(require("../../../shared/uniqueID"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function removeNotification(id) {
  return {
    type: actions.REMOVE_NOTIFICATION,
    id };

}

function notify(message, type, delay = 6000) {
  return (dispatch) => {
    const id = (0, _uniqueID.default)();
    dispatch({ type: actions.NOTIFY, notification: { message, type, id } });
    if (delay) {
      setTimeout(() => {
        dispatch(removeNotification(id));
      }, delay);
    }
    return id;
  };
}