"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.headTag = exports.default = void 0;var _config = require("../../api/config");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _serializeJavascript = _interopRequireDefault(require("serialize-javascript"));

var _languagesList = require("../../shared/languagesList");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const determineHotAssets = (query) => ({
  JS: [
  'http://localhost:8080/nprogress.js',
  'http://localhost:8080/main.js',
  'http://localhost:8080/vendor.js'],

  CSS: [
  `http://localhost:8080/CSS/vendor.css${query}`,
  `http://localhost:8080/CSS/main.css${query}`] });



const determineAssets = (assets, languageData) => ({
  JS: [assets.nprogress.js, assets.vendor.js, assets.main.js],
  CSS: [assets.vendor.css[languageData.rtl ? 1 : 0], assets.main.css[languageData.rtl ? 1 : 0]] });


const googelFonts = /*#__PURE__*/
_jsx("link", {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css?family=Roboto+Mono:100,300,400,500,700|Roboto+Slab:100,300,400,700|Roboto:100,300,400,500,700,900" });



const getFaviconURL = (reduxData) => {
  const favicon = reduxData.settings.collection.get('favicon');

  if (!favicon || favicon === '') {
    return '/public/favicon.ico';
  }

  return favicon;
};

const headTag = (head, CSS, reduxData) => /*#__PURE__*/
_jsx("head", {}, void 0,
head.title.toComponent(),
head.meta.toComponent(),
head.link.toComponent(), /*#__PURE__*/
_jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
CSS.map((style, key) => /*#__PURE__*/
_jsx("link", { href: style, rel: "stylesheet", type: "text/css" }, key)), /*#__PURE__*/

_jsx("style", {
  type: "text/css",
  dangerouslySetInnerHTML: { __html: reduxData.settings.collection.get('customCSS') } }),

googelFonts, /*#__PURE__*/
_jsx("link", { rel: "shortcut icon", href: getFaviconURL(reduxData) }));exports.headTag = headTag;



class Root extends _react.Component {
  renderInitialData() {
    let innerHtml = '';
    if (this.props.reduxData) {
      innerHtml += `window.__reduxData__ = ${(0, _serializeJavascript.default)(this.props.reduxData, { isJSON: true })};`;
    }

    if (this.props.user) {
      innerHtml += `window.__user__ = ${(0, _serializeJavascript.default)(this.props.user, { isJSON: true })};`;
    }

    return /*#__PURE__*/(
      _jsx("script", { dangerouslySetInnerHTML: { __html: innerHtml } }) //eslint-disable-line
    );
  }

  render() {
    const isHotReload = process.env.HOT;
    const { head, language, assets, reduxData, content } = this.props;

    const languageData = _languagesList.availableLanguages.find((l) => l.key === language);
    const query = languageData && languageData.rtl ? '?rtl=true' : '';

    const { JS, CSS } = isHotReload ?
    determineHotAssets(query) :
    determineAssets(assets, languageData);

    return /*#__PURE__*/(
      _jsx("html", { lang: language }, void 0,
      headTag(head, CSS, reduxData), /*#__PURE__*/
      _jsx("body", {}, void 0, /*#__PURE__*/
      _jsx("div", { id: "root", dangerouslySetInnerHTML: { __html: content } }), /*#__PURE__*/
      _jsx("script", {
        //eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML: {
          __html: `window.UWAZI_ENVIRONMENT = "${_config.config.ENVIRONMENT}";window.UWAZI_VERSION = "${_config.config.VERSION}"` } }),


      process.env.SENTRY_APP_DSN && /*#__PURE__*/
      _jsx("script", {
        //eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML: {
          __html: `window.SENTRY_APP_DSN = "${process.env.SENTRY_APP_DSN}"` } }),



      this.renderInitialData(),
      head.script.toComponent(),
      JS.map((file, index) => /*#__PURE__*/
      _jsx("script", { src: file }, index)))));




  }}var _default =












Root;exports.default = _default;