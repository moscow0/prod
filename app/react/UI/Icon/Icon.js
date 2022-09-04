"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");

var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _languagesList = require("../../../shared/languagesList");
var _library = require("./library");const _excluded = ["locale", "directionAware"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

(0, _library.loadIcons)();

const Icon = (_ref) => {let { locale, directionAware } = _ref,ownProps = _objectWithoutProperties(_ref, _excluded);
  const languageData = _languagesList.availableLanguages.find((l) => l.key === locale);
  return /*#__PURE__*/(
    _react.default.createElement(_reactFontawesome.FontAwesomeIcon, _extends({}, ownProps, { flip: languageData && languageData.rtl ? 'horizontal' : null })));

};

Icon.defaultProps = {
  locale: '',
  directionAware: false };







const mapStateToProps = ({ locale }) => ({ locale });exports.mapStateToProps = mapStateToProps;var _default =

(0, _reactRedux.connect)(mapStateToProps, () => ({}))(Icon);exports.default = _default;