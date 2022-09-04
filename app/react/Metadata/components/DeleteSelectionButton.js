"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.DeleteSelectionButton = void 0;var _react = _interopRequireDefault(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _lodash = require("lodash");



var _I18N = require("../../I18N");
var _metadataExtractionActions = require("../actions/metadataExtractionActions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}






const checkPropertySelections = (property, selections) =>
selections === null || selections === void 0 ? void 0 : selections.filter((selection) => {
  if (selection.deleteSelection) {
    return false;
  }
  return (
    property === 'title' && selection.name === 'title' || selection.propertyID === property);

});

const mapStateToProps = (state) => {
  const entityDocument = state.documentViewer.doc.get('defaultDoc');
  const newSelections = state.documentViewer.metadataExtraction.get('selections');
  return {
    entityDocument,
    newSelections };

};

const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)(
{
  deleteSelectionAction: _metadataExtractionActions.deleteSelection },

dispatch);


const mergeProps = (
stateProps,



dispatchProps,


ownProps) => (
{
  onClickFunction: () =>
  dispatchProps.deleteSelectionAction(
  stateProps.entityDocument,
  ownProps.propertyName,
  ownProps.propertyID),

  ownProps,
  stateProps });


const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps);



const DeleteSelectionButtonComponent = ({ onClickFunction, ownProps, stateProps }) => {var _stateProps$newSelect, _stateProps$entityDoc, _stateProps$entityDoc2;
  const property = ownProps.propertyName === 'title' ? 'title' : ownProps.propertyID;

  const selections = (0, _lodash.uniqBy)(
  [
  ...(((_stateProps$newSelect = stateProps.newSelections) === null || _stateProps$newSelect === void 0 ? void 0 : _stateProps$newSelect.toJS()) || []),
  ...(((_stateProps$entityDoc = stateProps.entityDocument) === null || _stateProps$entityDoc === void 0 ? void 0 : (_stateProps$entityDoc2 = _stateProps$entityDoc.get('extractedMetadata')) === null || _stateProps$entityDoc2 === void 0 ? void 0 : _stateProps$entityDoc2.toJS()) || [])],

  'propertyID');


  const hasSelections = property ? checkPropertySelections(property, selections) : false;

  if (!hasSelections || !hasSelections.length) {
    return null;
  }

  return /*#__PURE__*/(
    _jsx("button", { type: "button", className: "delete-selection", onClick: onClickFunction }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "Clear PDF selection" }, void 0, "Clear PDF selection")));


};

const container = connector(DeleteSelectionButtonComponent);exports.DeleteSelectionButton = container;