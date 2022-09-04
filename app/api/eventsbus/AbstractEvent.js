"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.AbstractEvent = void 0;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class AbstractEvent {


  constructor(data) {_defineProperty(this, "data", void 0);
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getName() {
    return this.constructor.name;
  }}exports.AbstractEvent = AbstractEvent;