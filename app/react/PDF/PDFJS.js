"use strict";Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, "EventBus", { enumerable: true, get: function () {return _pdf_viewer.EventBus;} });exports.textLayerFactory = exports.default = void 0;
var _utils = require("../utils");
var _pdf_viewer = require("pdfjs-dist/web/pdf_viewer");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

let PDFJS = {};
let pdfjsLib = {};
let textLayerFactory = {};exports.textLayerFactory = textLayerFactory;
if (_utils.isClient) {
  require("../../../node_modules/pdfjs-dist/web/pdf_viewer.css");

  PDFJS = require("../../../node_modules/pdfjs-dist/web/pdf_viewer.js");
  if (process.env.HOT || process.env.NODE_ENV === 'test') {
    pdfjsLib = require('pdfjs-dist');
  } else {
    pdfjsLib = require('pdfjs-dist/webpack');
  }
  pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');
  exports.textLayerFactory = textLayerFactory = new PDFJS.DefaultTextLayerFactory();
}var _default = _objectSpread(_objectSpread({},

PDFJS), pdfjsLib);exports.default = _default;