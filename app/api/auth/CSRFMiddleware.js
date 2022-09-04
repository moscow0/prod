"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =

(req, res, next) => {
  if (!['POST', 'DELETE', 'PUT'].includes(req.method)) {
    return next();
  }
  if (req.get('X-Requested-With') === 'XMLHttpRequest') {
    return next();
  }
  res.status(403);
  return res.json({
    error: 'Forbidden',
    message: 'X-Requested-With header was not sent!' });

};exports.default = _default;