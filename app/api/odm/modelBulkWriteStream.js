"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ModelBulkWriteStream = void 0;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


class ModelBulkWriteStream {








  constructor(uwaziModel, stackLimit, ordered) {_defineProperty(this, "db", void 0);_defineProperty(this, "stackLimit", void 0);_defineProperty(this, "ordered", void 0);_defineProperty(this, "actions", void 0);
    this.db = uwaziModel.db;
    this.actions = [];
    this.stackLimit = stackLimit || 1000;
    this.ordered = ordered;
  }

  async flush() {
    const toPerform = this.actions;
    this.actions = [];
    return this.db.bulkWrite(toPerform, { ordered: this.ordered });
  }

  async check() {
    if (this.actions.length >= this.stackLimit) {
      return this.flush();
    }
    return null;
  }

  async insert(document) {
    this.actions.push({ insertOne: { document } });
    return this.check();
  }

  async delete(filter, collation) {
    this.actions.push({ deleteOne: { filter, collation } });
    return this.check();
  }

  async update(
  filter,
  update,
  upsert,
  collation,
  arrayFilters,
  hint)
  {
    this.actions.push({ updateOne: { filter, update, upsert, collation, arrayFilters, hint } });
    return this.check();
  }}exports.ModelBulkWriteStream = ModelBulkWriteStream;