"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getFileExtension = void 0;const getFileExtension = (filename) =>
filename ? filename.substr(filename.lastIndexOf('.') + 1) : '';exports.getFileExtension = getFileExtension;