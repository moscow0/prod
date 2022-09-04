"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.tenants = void 0;var _config = require("../config");
var _utils = require("../utils");
var _AppContext = require("../utils/AppContext");
var _tenantsModel = require("./tenantsModel");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}















class Tenants {




  constructor(defaultTenant) {_defineProperty(this, "tenants", void 0);_defineProperty(this, "defaultTenant", void 0);
    this.defaultTenant = defaultTenant;
    this.tenants = {
      [_config.config.defaultTenant.name]: defaultTenant };

  }

  async setupTenants() {
    const model = await (0, _tenantsModel.tenantsModel)();
    model.on('change', () => {
      this.updateTenants(model).catch(_utils.handleError);
    });
    await this.updateTenants(model);
  }

  async updateTenants(model) {
    const tenants = await model.get();

    tenants.forEach((tenant) => {
      this.add(tenant.toObject());
    });
  }

  /**
   * This is a proxy to the context run method using only the tenant information.
   * It is here for backwards compatibility after refactoring.
   * @param cb The callback to run in the context
   * @param tenantName Tenant name
   */
  // eslint-disable-next-line class-methods-use-this
  async run(
  cb,
  tenantName = _config.config.defaultTenant.name)
  {
    return _AppContext.appContext.run(cb, {
      tenant: tenantName });

  }

  current() {
    const tenantName = _AppContext.appContext.get('tenant');

    if (!tenantName) {
      throw new Error('There is no tenant on the current async context');
    }
    if (!this.tenants[tenantName]) {
      throw new Error(
      `the tenant set to run the current async context -> [${tenantName}] its not available in the current process`);

    }
    return this.tenants[tenantName];
  }

  add(tenant) {
    this.tenants[tenant.name] = _objectSpread(_objectSpread({}, this.defaultTenant), tenant);
  }}


const tenants = new Tenants(_config.config.defaultTenant);exports.tenants = tenants;