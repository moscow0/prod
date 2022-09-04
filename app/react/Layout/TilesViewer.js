"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TilesViewer = void 0;var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");

var _Doc = _interopRequireDefault(require("../Library/components/Doc"));

var _Lists = require("./Lists");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}




class TilesViewerComponent extends _react.default.Component {
  render() {
    return /*#__PURE__*/(
      _jsx(_Lists.RowList, { zoomLevel: this.props.rowListZoomLevel }, void 0,
      this.props.documents.get('rows').map((doc, index) => /*#__PURE__*/
      _jsx(_Doc.default, {
        doc: doc,
        storeKey: this.props.storeKey,

        onClick: this.props.clickOnDocument,
        onSnippetClick: this.props.onSnippetClick,
        deleteConnection: this.props.deleteConnection,
        searchParams: this.props.search }, index))));




  }}


const mapStateToProps = (state, props) => ({
  documents: state[props.storeKey].documents,
  search: state[props.storeKey].search });


const TilesViewer = (0, _reactRedux.connect)(mapStateToProps)(TilesViewerComponent);exports.TilesViewer = TilesViewer;