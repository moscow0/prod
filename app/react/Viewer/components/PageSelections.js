"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PageSelections = void 0;var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _lodash = require("lodash");
var _reactTextSelectionHandler = require("react-text-selection-handler");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







const uniqueSelections = (selections, newSelections) => {
  const result = (0, _lodash.uniqBy)([...newSelections, ...selections], 'propertyID');
  return result;
};

const mapStateToProps = (state) => ({
  userSelections: state.documentViewer.metadataExtraction.get('selections'),
  entityDocument: state.documentViewer.doc.get('defaultDoc'),
  isEditing: Boolean(state.documentViewer.sidepanel.metadata._id) });


const connector = (0, _reactRedux.connect)(mapStateToProps);



const PageSelectionsComponent = ({ userSelections, entityDocument, isEditing }) => {var _entityDocument$get;
  if (!isEditing || !(entityDocument !== null && entityDocument !== void 0 && entityDocument.get('_id'))) {
    return null;
  }

  const newSelections = userSelections.toJS();

  const currentSelections = (_entityDocument$get = entityDocument.get('extractedMetadata')) !== null && _entityDocument$get !== void 0 && _entityDocument$get.size ?
  entityDocument.toJS().extractedMetadata.map((currentSelection) => _objectSpread(_objectSpread({},
  currentSelection), {}, {
    isCurrent: true })) :

  [];

  const selections = uniqueSelections(currentSelections, newSelections);

  if (selections.length) {
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null,
      selections.map((selection) => {
        const selected = selection.selection;
        const rectangles = ((selected === null || selected === void 0 ? void 0 : selected.selectionRectangles) || []).map((rectangle) => _objectSpread({
          regionId: rectangle.page },
        rectangle));

        const highlight = {
          text: selected === null || selected === void 0 ? void 0 : selected.text,
          selectionRectangles: rectangles };


        return /*#__PURE__*/(
          _jsx("div", {

            "data-testid": selection.timestamp,
            className: "selection" }, selection.propertyID || selection.name, /*#__PURE__*/

          _jsx(_reactTextSelectionHandler.Highlight, {
            textSelection: highlight,
            color: selection.isCurrent ? '#B1F7A3' : '#F27DA5' })));



      })));


  }

  return null;
};

const container = connector(PageSelectionsComponent);exports.PageSelections = container;