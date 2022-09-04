"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.S3Storage = void 0;var _clientS = require("@aws-sdk/client-s3");





var _config = require("../config");
var _tenants = require("../tenants");function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class S3Storage {


  constructor() {_defineProperty(this, "client", void 0);
    this.client = new _clientS.S3Client({
      apiVersion: 'latest',
      region: 'placeholder-region',
      endpoint: _config.config.s3.endpoint,
      credentials: _config.config.s3.credentials,
      forcePathStyle: true });

  }

  static bucketName() {
    return _tenants.tenants.current().name.replace('_', '-');
  }

  async upload(key, body) {
    return this.client.send(
    new _clientS.PutObjectCommand({ Bucket: S3Storage.bucketName(), Key: key, Body: body }));

  }

  async get(key) {
    const response = await this.client.send(
    new _clientS.GetObjectCommand({
      Bucket: S3Storage.bucketName(),
      Key: key }));



    return response;
  }

  async delete(key) {
    await this.client.send(
    new _clientS.DeleteObjectCommand({
      Bucket: S3Storage.bucketName(),
      Key: key }));


  }}exports.S3Storage = S3Storage;