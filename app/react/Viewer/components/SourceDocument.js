"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _reactRedux = require("react-redux");
var _redux = require("redux");

var _selectionActions = require("../actions/selectionActions");
var _uiActions = require("../actions/uiActions");






var _Document = _interopRequireDefault(require("./Document"));
var _reselect = require("reselect");
var _selectors = require("../selectors");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const selectSourceRange = (0, _reselect.createSelector)(
(s) => s.uiState,
(u) => u.toJS().reference.sourceRange);

const selectActiveRef = (0, _reselect.createSelector)(
(s) => s.uiState,
(u) => u.toJS().activeReference);


const mapStateToProps = (state) => {
  const { user, documentViewer } = state;
  return {
    selectedSnippet: documentViewer.uiState.get('snippet'),
    selection: selectSourceRange(documentViewer),
    doScrollToActive: documentViewer.uiState.get('goToActive'),
    doc: (0, _selectors.selectDoc)(state),
    references: (0, _selectors.selectReferences)(state),
    className: 'sourceDocument',
    activeReference: selectActiveRef(documentViewer),
    executeOnClickHandler: !!documentViewer.targetDoc.get('_id'),
    disableTextSelection: !user.get('_id'),
    panelIsOpen: !!documentViewer.uiState.get('panel'),
    forceSimulateSelection:
    documentViewer.uiState.get('panel') === 'targetReferencePanel' ||
    documentViewer.uiState.get('panel') === 'referencePanel' };

};

function mapDispatchToProps(dispatch) {
  const actions = {
    setSelection: _selectionActions.setSelection,
    unsetSelection: _selectionActions.unsetSelection,
    onClick: _uiActions.resetReferenceCreation,
    highlightReference: _uiActions.highlightReference,
    activateReference: _uiActions.activateReference,
    scrollToActive: _uiActions.scrollToActive,
    deactivateReference: _uiActions.deactivateReference };

  return (0, _redux.bindActionCreators)(actions, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return _objectSpread(_objectSpread(_objectSpread(_objectSpread({},
  stateProps),
  dispatchProps),
  ownProps), {}, {
    unsetSelection: dispatchProps.unsetSelection });

}var _default =
(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(_Document.default);exports.default = _default;