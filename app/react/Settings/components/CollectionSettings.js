"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.CollectionSettings = void 0;

var _react = _interopRequireDefault(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");

var _I18N = require("../../I18N");

var _reactHookForm = require("react-hook-form");
var _BasicReducer = require("../../BasicReducer");
var _Notifications = require("../../Notifications");
var _UI = require("../../UI");
var _Forms = require("../../Forms");
var _RequestParams = require("../../utils/RequestParams");
var _SettingsAPI = _interopRequireDefault(require("../SettingsAPI"));
var _FeatureToggle = require("../../components/Elements/FeatureToggle");
var _routeHelpers = require("../../utils/routeHelpers");
var _ToggleChildren = require("./ToggleChildren");
var tips = _interopRequireWildcard(require("./collectionSettingsTips"));
var _SettingsFormElement = require("./SettingsFormElement");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const mapStateToProps = ({ settings, templates }) => ({
  collectionSettings: settings.collection,
  templates });


const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)(
{
  setSettings: _BasicReducer.actions.set.bind(null, 'settings/collection'),
  notify: _Notifications.notificationActions.notify },

dispatch);


const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);



const CollectionSettings = ({
  collectionSettings,
  templates,
  setSettings,
  notify }) =>
{
  const collectionSettingsObject = collectionSettings.toJS();
  const templatesObject = templates.toJS();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors } } =
  (0, _reactHookForm.useForm)({
    defaultValues: collectionSettingsObject,
    mode: 'onSubmit' });


  register('private');
  register('openPublicEndpoint');
  register('allowedPublicTemplates');
  register('mapStartingPoint');
  register('cookiepolicy');
  register('newNameGeneration');
  register('ocrServiceEnabled');
  register('home_page', {
    validate: (val) => (0, _routeHelpers.validateHomePageRoute)(val) || val === '' });

  register('tilesProvider');
  register('mapApiKey', {
    pattern: /^[a-zA-Z0-9._]+$/ });


  const save = async (newCollectionSettings) => {var _newCollectionSetting;
    const saveParameters = new _RequestParams.RequestParams(_objectSpread(_objectSpread(_objectSpread({},
    collectionSettingsObject),
    newCollectionSettings), {}, {
      mapApiKey: (_newCollectionSetting = newCollectionSettings.mapApiKey) === null || _newCollectionSetting === void 0 ? void 0 : _newCollectionSetting.replace(/\s+/g, ' ').trim() }));

    const result = await _SettingsAPI.default.save(saveParameters);
    setSettings(result);
    notify((0, _I18N.t)('System', 'Settings updated', null, false), 'success');
  };
  const year = (0, _I18N.t)('System', 'Year', null, false);
  const month = (0, _I18N.t)('System', 'Month', null, false);
  const day = (0, _I18N.t)('System', 'Day', null, false);

  return /*#__PURE__*/(
    _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "panel panel-default collection-settings" }, void 0, /*#__PURE__*/
    _jsx("form", { id: "collectionSettings", className: "", onSubmit: handleSubmit(save) }, void 0, /*#__PURE__*/
    _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Collection")), /*#__PURE__*/

    _jsx("h2", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "General")), /*#__PURE__*/


    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Collection name" }, void 0, /*#__PURE__*/
    _react.default.createElement("input", { type: "text", name: "site_name", ref: register, className: "form-control" })), /*#__PURE__*/


    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Custom favicon", tip: tips.customFavIcon }, void 0, /*#__PURE__*/
    _jsx(_ToggleChildren.ToggleChildren, {
      toggled: Boolean(watch('favicon')),
      onToggleOff: () => {
        setValue('favicon', '');
      } }, void 0, /*#__PURE__*/

    _react.default.createElement("input", { type: "text", name: "favicon", ref: register, className: "form-control" }))), /*#__PURE__*/



    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Use custom landing page", tip: tips.landingPageTip }, void 0, /*#__PURE__*/
    _jsx(_ToggleChildren.ToggleChildren, {
      toggled: Boolean(watch('home_page')),
      onToggleOff: () => {
        setValue('home_page', '');
      } }, void 0, /*#__PURE__*/

    _jsx("div", { className: `input-group ${errors.home_page ? 'has-error' : ''}` }, void 0, /*#__PURE__*/
    _jsx("span", { className: "input-group-addon", id: "basic-addon1" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "https://yourdomain")), /*#__PURE__*/

    _react.default.createElement("input", { type: "text", className: "form-control", name: "home_page", ref: register })), /*#__PURE__*/

    _jsx("div", { className: "has-error" }, void 0,
    errors.home_page && /*#__PURE__*/
    _jsx("div", { className: "error-message" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Invalid home page url"))))), /*#__PURE__*/





    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Default view" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "col-xs-12 col-lg-3 col-no-gutters" }, void 0, /*#__PURE__*/
    _react.default.createElement("select", { name: "defaultLibraryView", className: "form-control", ref: register }, /*#__PURE__*/
    _jsx("option", { value: "cards" }, void 0, (0, _I18N.t)('System', 'Cards', null, false)), /*#__PURE__*/
    _jsx("option", { value: "table" }, void 0, (0, _I18N.t)('System', 'Table', null, false)), /*#__PURE__*/
    _jsx("option", { value: "map" }, void 0, (0, _I18N.t)('System', 'Map', null, false))))), /*#__PURE__*/




    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Date format" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "col-xs-12 col-lg-3 col-no-gutters" }, void 0, /*#__PURE__*/
    _react.default.createElement("select", { name: "dateFormat", className: "form-control", ref: register }, /*#__PURE__*/
    _jsx("option", { value: "yyyy/MM/dd" }, void 0, "2021/02/26 (",
    year, ", ", month, ", ", day, ")"), /*#__PURE__*/

    _jsx("option", { value: "dd/MM/yyyy" }, void 0, "26/02/2021 (",
    day, ", ", month, ", ", year, ")"), /*#__PURE__*/

    _jsx("option", { value: "MM/dd/yyyy" }, void 0, "02/26/2021 (",
    month, ", ", day, ", ", year, ")"), /*#__PURE__*/

    _jsx("option", { value: "yyyy-MM-dd" }, void 0, "2021-02-26 (",
    year, ", ", month, ", ", day, ")"), /*#__PURE__*/

    _jsx("option", { value: "dd-MM-yyyy" }, void 0, "26-02-2021 (",
    day, ", ", month, ", ", year, ")"), /*#__PURE__*/

    _jsx("option", { value: "MM-dd-yyyy" }, void 0, "02-26-2021 (",
    month, ", ", day, ", ", year, ")")))), /*#__PURE__*/





    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Private instance", tip: tips.publicSharing }, void 0, /*#__PURE__*/
    _jsx(_UI.ToggleButton, {
      checked: Boolean(watch('private')),
      onClick: () => {
        setValue('private', !getValues('private'));
      } })), /*#__PURE__*/



    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Show cookie policy", tip: tips.cookiePolicy }, void 0, /*#__PURE__*/
    _jsx(_UI.ToggleButton, {
      checked: Boolean(watch('cookiepolicy')),
      onClick: () => {
        setValue('cookiepolicy', !getValues('cookiepolicy'));
      } })),



    !collectionSettingsObject.newNameGeneration && /*#__PURE__*/
    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Non-latin characters support", tip: tips.characterSupport }, void 0, /*#__PURE__*/
    _jsx(_UI.ToggleButton, {
      checked: Boolean(watch('newNameGeneration')),
      onClick: () => {
        setValue('newNameGeneration', !getValues('newNameGeneration'));
      } })), /*#__PURE__*/




    _jsx("h2", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Website analytics")), /*#__PURE__*/


    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Google Analytics", tip: tips.analytics }, void 0, /*#__PURE__*/
    _jsx(_ToggleChildren.ToggleChildren, {
      toggled: Boolean(watch('analyticsTrackingId')),
      onToggleOff: () => {
        setValue('analyticsTrackingId', '');
      } }, void 0, /*#__PURE__*/

    _react.default.createElement("input", {
      type: "text",
      name: "analyticsTrackingId",
      ref: register,
      className: "form-control" }))), /*#__PURE__*/




    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Matomo Analytics", tip: tips.analytics }, void 0, /*#__PURE__*/
    _jsx(_ToggleChildren.ToggleChildren, {
      toggled: Boolean(watch('matomoConfig')),
      onToggleOff: () => {
        setValue('matomoConfig', '');
      } }, void 0, /*#__PURE__*/

    _react.default.createElement("input", { type: "text", name: "matomoConfig", ref: register, className: "form-control" }))), /*#__PURE__*/



    _jsx(_FeatureToggle.FeatureToggle, { feature: "ocr.url" }, void 0, /*#__PURE__*/
    _jsx("h2", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Services")), /*#__PURE__*/


    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Document OCR trigger", tip: tips.ocrTrigger }, void 0, /*#__PURE__*/
    _jsx(_UI.ToggleButton, {
      checked: Boolean(watch('ocrServiceEnabled')),
      onClick: () => {
        setValue('ocrServiceEnabled', !getValues('ocrServiceEnabled'));
      } }))), /*#__PURE__*/




    _jsx("h2", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Forms and email configuration")), /*#__PURE__*/


    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Contact Form", tip: tips.emails[0] }, void 0, /*#__PURE__*/
    _jsx(_ToggleChildren.ToggleChildren, {
      toggled: Boolean(watch('contactEmail') || watch('senderEmail')),
      onToggleOff: () => {
        setValue('contactEmail', '');
        setValue('senderEmail', '');
      } }, void 0, /*#__PURE__*/

    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Receiving email", tip: tips.emails[1] }, void 0, /*#__PURE__*/
    _react.default.createElement("input", { type: "text", ref: register, name: "contactEmail", className: "form-control" })), /*#__PURE__*/


    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Sending email", tip: tips.emails[2] }, void 0, /*#__PURE__*/
    _react.default.createElement("input", {
      type: "text",
      ref: register,
      name: "senderEmail",
      placeholder: "no-reply@uwazi.io",
      className: "form-control" })))), /*#__PURE__*/





    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Public Endpoints", tip: tips.publicForm[0] }, void 0, /*#__PURE__*/
    _jsx(_ToggleChildren.ToggleChildren, {
      toggled: Boolean(
      (watch('allowedPublicTemplates') || []).length || watch('publicFormDestination')),

      onToggleOff: () => {
        setValue('publicFormDestination', '');
        setValue('allowedPublicTemplates', []);
      } }, void 0, /*#__PURE__*/

    _jsx(_SettingsFormElement.SettingsFormElement, {
      label: "Public Form submit URL",
      tip: tips.publicForm[1],
      labelClassName: "larger-label",
      inputsClassName: "smaller-inputs" }, void 0, /*#__PURE__*/

    _react.default.createElement("input", {
      type: "text",
      name: "publicFormDestination",
      ref: register,
      className: "form-control" })), /*#__PURE__*/



    _jsx(_SettingsFormElement.SettingsFormElement, {
      label: "Whitelisted Templates",
      tip: tips.publicForm[2],
      labelClassName: "larger-label",
      inputsClassName: "smaller-inputs" }, void 0, /*#__PURE__*/

    _jsx(_Forms.MultiSelect, {
      value: watch('allowedPublicTemplates'),
      options: templatesObject.map((template) => ({
        label: template.name,
        value: template._id })),

      onChange: (newValues) => {
        setValue('allowedPublicTemplates', newValues);
      } })))), /*#__PURE__*/





    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Allow captcha bypass", tip: tips.openPublicForm }, void 0, /*#__PURE__*/
    _jsx(_UI.ToggleButton, {
      checked: Boolean(watch('openPublicEndpoint')),
      onClick: () => {
        setValue('openPublicEndpoint', !getValues('openPublicEndpoint'));
      } })), /*#__PURE__*/



    _jsx("h2", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Maps")), /*#__PURE__*/

    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Map provider" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "col-xs-12 col-lg-3 col-no-gutters" }, void 0, /*#__PURE__*/
    _react.default.createElement("select", { name: "tilesProvider", className: "form-control", ref: register }, /*#__PURE__*/
    _jsx("option", { value: "mapbox" }, void 0, (0, _I18N.t)('System', 'MapBox', null, false)), /*#__PURE__*/
    _jsx("option", { value: "google" }, void 0, (0, _I18N.t)('System', 'Google Maps', null, false))))), /*#__PURE__*/



    _jsx("div", { className: `${errors.mapApiKey ? 'has-error' : ''}` }, void 0, /*#__PURE__*/
    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Map api key", tip: tips.mapApiKey }, void 0, /*#__PURE__*/
    _react.default.createElement("input", { type: "text", name: "mapApiKey", ref: register, className: "form-control" }))), /*#__PURE__*/


    _jsx(_SettingsFormElement.SettingsFormElement, { label: "Custom starting location", tip: tips.mapAxis }, void 0, /*#__PURE__*/
    _jsx("div", { className: "settings-map" }, void 0, /*#__PURE__*/
    _jsx(_Forms.Geolocation, {
      value: watch('mapStartingPoint'),
      onChange: (values) => {
        setValue('mapStartingPoint', values);
      } })))), /*#__PURE__*/





    _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
    _jsx("button", {
      type: "submit",
      form: "collectionSettings",
      className: "btn btn-success btn-extra-padding" }, void 0, /*#__PURE__*/

    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Save"))))))));







};

const container = connector(CollectionSettings);exports.CollectionSettings = container;