"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.registerEventListeners = void 0;
var _eventListeners = require("./services/pdfsegmentation/eventListeners");
var _suggestions = require("./suggestions/suggestions");

const registerEventListeners = (eventsBus) => {
  _suggestions.Suggestions.registerEventListeners(eventsBus);
  (0, _eventListeners.registerEventListeners)(eventsBus);
};exports.registerEventListeners = registerEventListeners;