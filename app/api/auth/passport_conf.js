"use strict";var _passport = _interopRequireDefault(require("passport"));
var _passportLocal = _interopRequireDefault(require("passport-local"));
var _users = _interopRequireDefault(require("../users/users"));
var _tenantContext = require("../tenants/tenantContext");
var _AppContext = require("../utils/AppContext");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const getDomain = (req) => `${req.protocol}://${req.get('host')}`;

_passport.default.use(
'local',
new _passportLocal.default(
{
  passReqToCallback: true },

(req, username, password, done) => {
  const token = req.body ? req.body.token : undefined;
  _users.default.
  login({ username, password, token }, getDomain(req)).
  then((user) => done(null, user)).
  catch((e) => done(e));
}));



_passport.default.serializeUser((user, done) => {
  done(null, `${user._id}///${_tenantContext.tenants.current().name}`);
});

_passport.default.deserializeUser(async (serializeUser, done) => {
  const currentTenant = _tenantContext.tenants.current().name;
  const [id, serializedTenant] = serializeUser.split('///');
  if (serializedTenant !== currentTenant) {
    return done(null, false);
  }

  const user = await _users.default.getById(id, '-password', true);
  _AppContext.appContext.set('user', user);
  done(null, user);
});