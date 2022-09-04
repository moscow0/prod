"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _settings = _interopRequireDefault(require("./settings"));

var _authMiddleware = _interopRequireDefault(require("../auth/authMiddleware"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

(app) => {
  app.post('/api/settings', (0, _authMiddleware.default)(), (req, res, next) => {
    _settings.default.
    save(req.body).
    then((response) => res.json(response)).
    catch(next);
  });

  app.get('/api/settings', (req, res, next) => {
    const select = req.user && req.user.role === 'admin' ? '+publicFormDestination' : {};
    _settings.default.
    get({}, select).
    then((response) => res.json(response)).
    catch(next);
  });
};exports.default = _default;