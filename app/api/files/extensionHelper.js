"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mimeTypeFromUrl = void 0;var _mimeTypes = _interopRequireDefault(require("mime-types"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const mimeTypeFromUrl = (url) => {var _url$split$0$split$po;
  const acceptedMimeTypes = ['image', 'audio', 'text', 'video'];
  const extension = url === null || url === void 0 ? void 0 : (_url$split$0$split$po = url.split(/[#?]/)[0].split('.').pop()) === null || _url$split$0$split$po === void 0 ? void 0 : _url$split$0$split$po.trim();

  if (extension) {
    const mimetype = _mimeTypes.default.lookup(extension) || 'text/html';
    if (acceptedMimeTypes.includes(mimetype.split('/')[0])) {
      return mimetype;
    }
  }

  return 'text/html';
};exports.mimeTypeFromUrl = mimeTypeFromUrl;