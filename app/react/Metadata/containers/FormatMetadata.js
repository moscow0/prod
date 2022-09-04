"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.FormatMetadata = void 0;exports.mapStateToProps = mapStateToProps;var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _immutable = _interopRequireDefault(require("immutable"));
var _selectors = require("../selectors");
var _Metadata = _interopRequireDefault(require("../components/Metadata"));const _excluded = ["templates", "thesauris", "settings", "excludePreview"],_excluded2 = ["additionalMetadata", "sortedProperty", "entity", "relationships"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

const removeUneededProps = (_ref) => {let { templates, thesauris, settings, excludePreview } = _ref,rest = _objectWithoutProperties(_ref, _excluded);return rest;};

const BaseFormatMetadata = (_ref2) => {let {
    additionalMetadata,
    sortedProperty,
    entity,
    relationships } = _ref2,
  props = _objectWithoutProperties(_ref2, _excluded2);return /*#__PURE__*/(

    _react.default.createElement(_Metadata.default, _extends({
      metadata: additionalMetadata.concat(
      _selectors.metadataSelectors.formatMetadata(props, entity, sortedProperty, relationships, {
        excludePreview: props.excludePreview })),


      templateId: entity.template,
      compact: !!sortedProperty },
    removeUneededProps(props))));};



BaseFormatMetadata.defaultProps = {
  sortedProperty: '',
  additionalMetadata: [],
  relationships: _immutable.default.fromJS([]),
  excludePreview: false };



























function mapStateToProps(state, { entity, sortedProperty = '' }) {
  return {
    templates: state.templates,
    thesauris: state.thesauris,
    settings: state.settings.collection,
    entity,
    sortedProperty };

}

const FormatMetadata = (0, _reactRedux.connect)(mapStateToProps)(BaseFormatMetadata);exports.FormatMetadata = FormatMetadata;