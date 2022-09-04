"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.appContext = void 0;var _async_hooks = require("async_hooks");function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





class AppContext {constructor() {_defineProperty(this, "storage",
    new _async_hooks.AsyncLocalStorage());}

  getContextObject() {
    const data = this.storage.getStore();
    if (!data) {
      throw new Error('Accessing nonexistent async context');
    }
    return data;
  }

  async run(cb, data = {}) {
    return new Promise((resolve, reject) => {
      this.storage.run(data, () => {
        cb().then(resolve).catch(reject);
      });
    });
  }

  get(key) {
    return this.getContextObject()[key];
  }

  set(key, value) {
    this.getContextObject()[key] = value;
  }}


const appContext = new AppContext();exports.appContext = appContext;