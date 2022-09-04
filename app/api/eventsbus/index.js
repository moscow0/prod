"use strict";Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, "AbstractEvent", { enumerable: true, get: function () {return _AbstractEvent.AbstractEvent;} });Object.defineProperty(exports, "EventsBus", { enumerable: true, get: function () {return _EventsBus.EventsBus;} });exports.applicationEventsBus = void 0;var _AbstractEvent = require("./AbstractEvent");
var _EventsBus = require("./EventsBus");

const applicationEventsBus = new _EventsBus.EventsBus();exports.applicationEventsBus = applicationEventsBus;