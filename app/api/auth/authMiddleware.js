"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = require("express");var _default =











(roles = ['admin']) =>
(req, res, next) => {
  if (req.user && roles.includes(req.user.role || '')) {
    return next();
  }
  res.status(401);
  return res.json({ error: 'Unauthorized', message: 'Unauthorized' });
};exports.default = _default;