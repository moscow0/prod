"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.selectTemplates = void 0;var _reselect = require("reselect");

const selectTemplates = (0, _reselect.createSelector)(
(s) => s.templates,
(t) => t.toJS());exports.selectTemplates = selectTemplates;