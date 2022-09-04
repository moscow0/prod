"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  filterBaseProperties: (data) => {
    const properties = [
    '_id',
    'language',
    'metadata',
    'suggestedMetadata',
    'sharedId',
    'template',
    'title',
    'icon',
    'type',
    'attachments',
    'documents'];

    return Object.assign({}, ...properties.map((p) => ({ [p]: data[p] })));
  } };exports.default = _default;