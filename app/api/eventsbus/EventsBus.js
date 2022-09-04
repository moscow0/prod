"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.EventsBus = void 0;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}












class EventsBus {constructor() {_defineProperty(this, "listeners",
    {});}

  async emit(event) {
    if (this.listeners[event.getName()]) {
      await Promise.all(
      this.listeners[event.getName()].map(async (listener) => listener(event.getData())));

    }
  }

  on(event, listener) {
    if (!this.listeners[event.name]) {
      this.listeners[event.name] = [];
    }

    this.listeners[event.name].push(listener);
  }}exports.EventsBus = EventsBus;