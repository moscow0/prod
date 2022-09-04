"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Preserve = void 0;
var _thesauri = _interopRequireDefault(require("../thesauri"));
var _settings = _interopRequireDefault(require("../settings"));
var _templates = _interopRequireDefault(require("../templates"));
var _JSONRequest = _interopRequireDefault(require("../../shared/JSONRequest"));
var _Error = _interopRequireDefault(require("../utils/Error"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






const Preserve = {
  async setup(language, user) {var _currentSettings$feat, _preserve$config;
    const currentSettings = await _settings.default.get({});
    const preserve = currentSettings === null || currentSettings === void 0 ? void 0 : (_currentSettings$feat = currentSettings.features) === null || _currentSettings$feat === void 0 ? void 0 : _currentSettings$feat.preserve;

    if (!preserve) {
      throw (0, _Error.default)('Preserve configuration not found', 402);
    }

    let userConfig = (_preserve$config = preserve.config) === null || _preserve$config === void 0 ? void 0 : _preserve$config.find((conf) => {var _conf$user;return ((_conf$user = conf.user) === null || _conf$user === void 0 ? void 0 : _conf$user.toString()) === user._id.toString();});

    if (userConfig) {
      return userConfig;
    }

    userConfig = await this.createUserConfig(preserve, language, user);

    await _settings.default.save(_objectSpread(_objectSpread({},
    currentSettings), {}, {
      features: _objectSpread(_objectSpread({},
      currentSettings.features), {}, {
        preserve: {
          host: preserve.host,
          masterToken: preserve.masterToken,
          config: [...(preserve.config || []), userConfig] } }) }));



    return userConfig;
  },

  async createUserConfig(preserve, language, user) {var _preserve$config2;
    let templateId;
    if ((_preserve$config2 = preserve.config) !== null && _preserve$config2 !== void 0 && _preserve$config2.length) {
      templateId = preserve.config[0].template;
    } else {
      templateId = await (await this.createTemplate(language))._id;
    }
    const token = await this.requestToken(preserve.host, {
      Authorization: preserve.masterToken });


    return {
      template: templateId,
      token,
      user: user._id };

  },

  async requestToken(host, headers) {
    const resp = await _JSONRequest.default.post(`${host}/api/tokens`, {}, headers);
    return resp.json.data.token;
  },

  async createTemplate(language) {
    const fetchedThesauri = await Preserve.createEmptyThesauri();
    const toSave = {
      name: 'Preserve',
      commonProperties: [
      { label: 'Title', name: 'title', type: 'text' },
      { name: 'creationDate', label: 'Date added', type: 'date' },
      { name: 'editDate', label: 'Date modified', type: 'date' }],

      properties: [
      { type: 'link', name: 'url', label: 'Url' },
      {
        type: 'select',
        name: 'source',
        label: 'Source',
        content: fetchedThesauri._id.toString() }] };



    return _templates.default.save(toSave, language);
  },

  async createEmptyThesauri(name) {
    const internalName = name || 'Preserve';
    const toSave = {
      name: internalName,
      values: [] };

    const createdThesauri = await _thesauri.default.save(toSave);
    return createdThesauri;
  } };exports.Preserve = Preserve;