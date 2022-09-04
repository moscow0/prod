"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.processDocument = void 0;

var _files = require("./files");
var _PDF = require("./PDF");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const processDocument = async (
entitySharedId,
file,
detectLanguage = true) =>
{
  const pdf = new _PDF.PDF(file);
  const upload = await _files.files.save(_objectSpread(_objectSpread({},
  file), {}, {
    entity: entitySharedId,
    type: 'document',
    status: 'processing' }));


  try {
    const conversion = await pdf.convert();
    if (!detectLanguage) {
      conversion.language = file.language;
    }

    const thumbnail = await pdf.createThumbnail(upload._id.toString());

    await _files.files.save({
      entity: entitySharedId,
      type: 'thumbnail',
      language: conversion.language,
      filename: thumbnail,
      mimetype: 'image/jpeg' });


    const saved = await _files.files.save(_objectSpread(_objectSpread(_objectSpread({},
    upload),
    conversion), {}, {
      status: 'ready' }));


    return saved;
  } catch (e) {
    await _files.files.save(_objectSpread(_objectSpread({},
    upload), {}, {
      status: 'failed' }));

    throw e;
  }
};exports.processDocument = processDocument;