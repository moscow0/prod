"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PageReferencesComponent = exports.PageReferences = void 0;var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");


var _reselect = require("reselect");
var _reactTextSelectionHandler = require("react-text-selection-handler");
var _filterUnique = require("../../../shared/filterUnique");const _excluded = ["page"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}








const PageReferencesComponent = (
props) => /*#__PURE__*/

_react.default.createElement(_react.default.Fragment, null,
(props.references[props.page] || []).map((r) => {var _r$_id;
  const color = r._id === props.activeReference ? '#ffd84b' : '#feeeb4';

  if (!r.reference) {
    return false;
  }
  const selectionRectangles = r.reference.selectionRectangles.map(
  (_ref) => {let { page } = _ref,otherProps = _objectWithoutProperties(_ref, _excluded);return _objectSpread({ regionId: page }, otherProps);});

  const highlight = _objectSpread(_objectSpread({}, r.reference), {}, { selectionRectangles });

  return /*#__PURE__*/(
    _jsx("div", {
      "data-id": r._id,

      className: "reference",
      onClick: props.onClick.bind(null, r) }, (_r$_id = r._id) === null || _r$_id === void 0 ? void 0 : _r$_id.toString(), /*#__PURE__*/

    _jsx(_reactTextSelectionHandler.Highlight, { textSelection: highlight, color: color })));


}));exports.PageReferencesComponent = PageReferencesComponent;



const indexdReferencesByPage = (0, _reselect.createSelector)(
(state) =>
state.documentViewer.targetDocReferences.size ?
state.documentViewer.targetDocReferences :
state.documentViewer.references,
(state) =>
state.documentViewer.targetDoc.get('_id') ?
state.documentViewer.targetDoc :
state.documentViewer.doc,
(references, doc) =>
references.
toJS().
reduce(
(mappedReferences, connection) => {
  if (doc.get('sharedId') !== connection.entity) {
    return mappedReferences;
  }

  if (connection.reference) {
    const pages = connection.reference.selectionRectangles.
    map((selection) => selection.page).
    filter(_filterUnique.unique);

    pages.forEach((page) => {
      if (!page) {
        return;
      }

      if (!mappedReferences[page]) {
        // eslint-disable-next-line no-param-reassign
        mappedReferences[page] = [];
      }

      mappedReferences[page].push(connection);
    });
  }
  return mappedReferences;
},
{}));



const mapStateToProps = (state) => ({
  references: indexdReferencesByPage(state),
  activeReference: state.documentViewer.uiState.get('activeReference') });


const PageReferences = (0, _reactRedux.connect)(mapStateToProps)(PageReferencesComponent);exports.PageReferences = PageReferences;