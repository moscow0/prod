"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _immutable = require("immutable");
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _server = require("react-dom/server");
var _reactHelmet = require("react-helmet");
var _react = _interopRequireDefault(require("react"));

var _I18N = require("./I18N");
var _JSONUtils = _interopRequireDefault(require("../shared/JSONUtils"));
var _RouteHandler = _interopRequireDefault(require("./App/RouteHandler"));
var _api = _interopRequireDefault(require("./utils/api"));
var _settings = _interopRequireDefault(require("../api/settings"));
var _JSONRequest = require("../shared/JSONRequest");

var _RequestParams = require("./utils/RequestParams");
var _utils = require("./utils");
var _Provider = _interopRequireDefault(require("./App/Provider"));
var _Root = _interopRequireDefault(require("./App/Root"));
var _Routes = _interopRequireDefault(require("./Routes"));
var _settings2 = _interopRequireDefault(require("../api/settings/settings"));
var _store = _interopRequireDefault(require("./store"));
var _translations = _interopRequireDefault(require("../api/i18n/translations"));
var _utils2 = require("../api/utils");const _excluded = ["lang"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

let assets = {};

function renderComponentWithRoot(
componentProps,
data,
user,
language,
actions = [],
isRedux = false)
{
  let initialStore = (0, _store.default)({});

  let initialData = data;
  const Component = _reactRouter.RouterContext;
  if (isRedux) {
    initialStore = (0, _store.default)(initialData);
    if (actions.forEach) {
      actions.forEach((action) => {
        initialStore.dispatch(action);
      });
    }
    initialData = initialStore.getState();
  }
  // to prevent warnings on some client libs that use window global var
  global.window = {};
  //
  _I18N.t.resetCachedTranslation();
  _I18N.Translate.resetCachedTranslation();
  const componentHtml = (0, _server.renderToString)( /*#__PURE__*/
  _jsx(_reactRedux.Provider, { store: initialStore }, void 0, /*#__PURE__*/
  _jsx(_Provider.default, { initialData: initialData, user: user, language: language }, void 0, /*#__PURE__*/
  _react.default.createElement(Component, componentProps))));




  const head = _reactHelmet.Helmet.rewind();

  let reduxData = {};

  if (isRedux) {
    reduxData = initialData;
  }

  return `<!doctype html>\n${(0, _server.renderToString)( /*#__PURE__*/
  _jsx(_Root.default, {
    language: language,
    content: componentHtml,
    head: head,
    user: user,
    reduxData: reduxData,
    assets: assets }))

  }`;
}

function handle404(res) {
  res.redirect(301, '/404');
}

function respondError(res, error, req) {var _error$json;
  if (!(error instanceof _JSONRequest.FetchResponseError)) {
    (0, _utils2.handleError)(error, { req });
  }
  const code = error.status || 500;
  res.status(code);
  const requestId = ((_error$json = error.json) === null || _error$json === void 0 ? void 0 : _error$json.requestId) || '';
  if (!req.url.startsWith('/error/500')) {
    res.redirect(`/error/${code}?requestId=${requestId}`);
  } else {
    res.send(`<pre>An unexpected error has occurred. Request id: ${requestId}</pre>`);
  }
}

function handleRedirect(res, redirectLocation) {
  res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function onlySystemTranslations(AllTranslations) {
  const rows = AllTranslations.map((translation) => {
    const systemTranslation = translation.contexts.find((c) => c.id === 'System');
    return _objectSpread(_objectSpread({}, translation), {}, { contexts: [systemTranslation] });
  });

  return { json: { rows } };
}

function handleRoute(res, renderProps, req) {
  const routeProps = (0, _utils.getPropsFromRoute)(renderProps, ['requestState']);

  function renderPage(actions, initialData, isRedux) {
    const wholeHtml = renderComponentWithRoot(
    renderProps,
    initialData,
    req.user,
    initialData.locale,
    actions,
    isRedux);

    res.status(200).send(wholeHtml);
  }

  _RouteHandler.default.renderedFromServer = true;
  let query;
  if (renderProps.location && Object.keys(renderProps.location.query).length > 0) {
    query = _JSONUtils.default.parseNested(renderProps.location.query);
  }

  let locale;
  return _settings2.default.
  get().
  then((settings) => {
    const { languages } = settings;
    const urlLanguage =
    renderProps.params && renderProps.params.lang ? renderProps.params.lang : req.language;
    locale = _I18N.I18NUtils.getLocale(urlLanguage, languages, req.cookies);
    // api.locale(locale);

    return settings;
  }).
  then((settingsData) => {
    if (settingsData.private && !req.user) {
      return Promise.all([
      Promise.resolve({ json: {} }),
      Promise.resolve({ json: { languages: [], private: settingsData.private } }),
      _translations.default.get().then(onlySystemTranslations),
      Promise.resolve({ json: { rows: [] } }),
      Promise.resolve({ json: { rows: [] } }),
      Promise.resolve({ json: { rows: [] } })]);

    }

    const headers = {
      'Content-Language': locale,
      Cookie: `connect.sid=${req.cookies['connect.sid']}`,
      tenant: req.get('tenant') };


    const requestParams = new _RequestParams.RequestParams({}, headers);
    return Promise.all([
    _api.default.get('user', requestParams),
    _api.default.get('settings', requestParams),
    _api.default.get('translations', requestParams),
    _api.default.get('templates', requestParams),
    _api.default.get('thesauris', requestParams),
    _api.default.get('relationTypes', requestParams)]);

  }).
  then(([user, settings, translations, templates, thesauris, relationTypes]) => {
    const globalResources = {
      user: user.json,
      settings: { collection: settings.json },
      translations: translations.json.rows,
      templates: templates.json.rows,
      thesauris: thesauris.json.rows,
      relationTypes: relationTypes.json.rows };


    globalResources.settings.collection.links = globalResources.settings.collection.links || [];

    const _renderProps$params = renderProps.params,{ lang } = _renderProps$params,params = _objectWithoutProperties(_renderProps$params, _excluded);
    const headers = {
      'Content-Language': locale,
      Cookie: `connect.sid=${req.cookies['connect.sid']}`,
      tenant: req.get('tenant') };


    const requestParams = new _RequestParams.RequestParams(_objectSpread(_objectSpread({}, query), params), headers);

    return Promise.all([
    routeProps.requestState(requestParams, {
      user: (0, _immutable.fromJS)(user.json),
      templates: (0, _immutable.fromJS)(globalResources.templates),
      thesauris: (0, _immutable.fromJS)(globalResources.thesauris),
      relationTypes: (0, _immutable.fromJS)(globalResources.relationTypes),
      settings: { collection: (0, _immutable.fromJS)(globalResources.settings.collection) } }),

    globalResources]);

  }).
  then(([initialData, globalResources]) => {
    renderPage(
    initialData,
    {
      locale,
      user: globalResources.user,
      settings: globalResources.settings,
      translations: globalResources.translations,
      templates: globalResources.templates,
      thesauris: globalResources.thesauris,
      relationTypes: globalResources.relationTypes },

    true);

  }).
  catch((error) => {
    if (error.status === 401) {
      return res.redirect(302, '/login');
    }

    if (error.status === 404) {
      return res.redirect(404, '/404');
    }

    return respondError(res, error, req);
  });
}

const allowedRoute = (user = {}, url = '') => {
  const isAdmin = user.role === 'admin';
  const isAuthenticatedUser = ['editor', 'collaborator'].includes(user.role);
  const authRoutes = ['/uploads', '/settings/account'];

  const adminRoutes = [
  '/settings/users',
  '/settings/collection',
  '/settings/navlink',
  '/settings/pages',
  '/settings/translations',
  '/settings/filters',
  '/settings/templates',
  '/settings/dictionaries',
  '/settings/connections'];


  const isAdminRoute = adminRoutes.reduce(
  (found, authRoute) => found || url.indexOf(authRoute) !== -1,
  false);


  const isAuthRoute = authRoutes.reduce(
  (found, authRoute) => found || url.indexOf(authRoute) !== -1,
  false);


  return (
    isAdminRoute && isAdmin ||
    isAuthRoute && (isAdmin || isAuthenticatedUser) ||
    !isAdminRoute && !isAuthRoute);

};

function routeMatch(req, res, location, languages) {
  _settings.default.get().then((settings) => {
    (0, _store.default)({
      user: req.user,
      settings: { collection: settings } });

    try {
      (0, _reactRouter.match)({ routes: _Routes.default, location }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
          return handleRedirect(res, redirectLocation);
        }
        if (
        renderProps &&
        renderProps.params.lang &&
        !languages.includes(renderProps.params.lang))
        {
          return handle404(res);
        }
        if (error) {
          return respondError(res, error);
        }
        if (renderProps) {
          return handleRoute(res, renderProps, req);
        }

        return handle404(res);
      });
    } catch (err) {
      return handle404(res);
    }
  });
}

function getAssets() {
  if (process.env.HOT) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    _fs.default.readFile(`${__dirname}/../../dist/webpack-assets.json`, (err, data) => {
      if (err) {
        reject(
        new Error(`${err}\nwebpack-assets.json do not exists or is malformed !,
                          you probably need to build webpack with the production configuration`));

      }
      try {
        assets = JSON.parse(data);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
}

function ServerRouter(req, res) {
  if (!allowedRoute(req.user, req.url)) {
    const url = req.user ? '/' : '/login';
    return res.redirect(401, url);
  }

  const { PORT } = process.env;
  _api.default.APIURL(`http://localhost:${PORT || 3000}/api/`);

  const location = req.url;

  Promise.all([_settings2.default.get(), getAssets()]).then(([settings]) => {
    const languages = settings.languages.map((l) => l.key);
    routeMatch(req, res, location, languages);
  });
}var _default =

ServerRouter;exports.default = _default;