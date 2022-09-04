"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.documents = exports.default = void 0;var _utils = require("../utils");
var _files = require("../files");
var _entities = _interopRequireDefault(require("../entities"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const documents = {
  save(doc, params) {
    delete doc.file;
    return _entities.default.save(doc, params);
  },

  async page(_id, page) {
    const [document] = await _files.files.get({ _id }, '+fullText');
    if (!document || !document.fullText) {
      throw (0, _utils.createError)('document does not exists', 404);
    }

    if (typeof document.fullText[page] === 'undefined') {
      throw (0, _utils.createError)('page does not exists', 404);
    }

    const pageNumberMatch = /\[\[(\d+)\]\]/g;
    return document.fullText[page].replace(pageNumberMatch, '');
  },

  get(query, select) {
    return _entities.default.get(query, select);
  },

  getById(sharedId, language) {
    return _entities.default.getById(sharedId, language);
  },

  countByTemplate(templateId) {
    return _entities.default.countByTemplate(templateId);
  },

  delete(id) {
    return _entities.default.delete(id);
  } };exports.documents = documents;var _default =


documents;exports.default = _default;