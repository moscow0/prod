"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /** @format */

const { SEMANTIC_SEARCH_URL } = process.env;var _default =
SEMANTIC_SEARCH_URL || 'http://localhost:5000/semanticSearch/searchOneDoc';exports.default = _default;