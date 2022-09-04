"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _joi = _interopRequireDefault(require("joi"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _svgCaptcha = _interopRequireDefault(require("svg-captcha"));
var _settings = _interopRequireDefault(require("../settings"));
var _urlJoin = _interopRequireDefault(require("url-join"));
var _odm = require("../odm");
var _config = require("../config");
var _cors = _interopRequireDefault(require("cors"));
var _JSONRequest = _interopRequireDefault(require("../../shared/JSONRequest"));
var _CaptchaModel = require("./CaptchaModel");

var _utils = require("../utils");

require("./passport_conf.js");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const MongoStore = (0, _connectMongo.default)(_expressSession.default);var _default =

(app) => {
  app.use((0, _cookieParser.default)());

  app.use(
  (0, _expressSession.default)({
    secret: app.get('env') === 'production' ? _config.config.userSessionSecret : 'harvey&lola',
    store: new MongoStore({
      mongooseConnection: _odm.DB.connectionForDB(_config.config.SHARED_DB, {
        useCache: true,
        noListener: false }) }),


    resave: false,
    saveUninitialized: false }));



  app.use(_passport.default.initialize());
  app.use(_passport.default.session());

  app.post(
  '/api/login',

  _utils.validation.validateRequest(
  _joi.default.object({
    username: _joi.default.string().required(),
    password: _joi.default.string().required(),
    token: _joi.default.string() }).
  required()),


  (req, res, next) => {
    _passport.default.authenticate('local', (err, user) => {
      if (err) {
        next(err);
        return;
      }
      req.logIn(user, (error) => {
        if (error) {
          next(err);
          return;
        }
        res.status(200);
        res.json({ success: true });
      });
    })(req, res, next);
  });


  app.get('/api/user', (req, res) => {
    res.json(req.user || {});
  });

  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  const corsOptions = {
    origin: true,
    methods: 'GET',
    credentials: true,
    optionsSuccessStatus: 200 };


  app.get('/api/captcha', (0, _cors.default)(corsOptions), async (_req, res) => {
    const captcha = _svgCaptcha.default.create({ ignoreChars: '0OoiILluvUV' });
    const text = process.env.DATABASE_NAME !== 'uwazi_e2e' ? captcha.text : '42hf';
    const storedCaptcha = await _CaptchaModel.CaptchaModel.save({ text });

    res.json({ svg: captcha.data, id: storedCaptcha._id.toString() });
  });

  app.get('/api/remotecaptcha', async (_req, res) => {
    const { publicFormDestination } = await _settings.default.get({}, { publicFormDestination: 1 });
    const remoteResponse = await _JSONRequest.default.get((0, _urlJoin.default)(publicFormDestination, '/api/captcha'));
    res.json(remoteResponse.json);
  });
};exports.default = _default;