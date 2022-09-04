"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.LibraryTable = void 0;var _RouteHandler = _interopRequireDefault(require("../App/RouteHandler"));
var _react = _interopRequireDefault(require("react"));
var _TableViewer = require("../Layout/TableViewer");
var _Library = _interopRequireDefault(require("./Library"));
var _requestState = require("./helpers/requestState");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

/* TODO: This class is a temporal approach to be removed when we can
   make Library and LibraryTable subclasses of the same base class. */
class LibraryOverrideRequestState extends _Library.default {
  static async requestState(requestParams, globalResources) {
    return (0, _requestState.requestState)(requestParams, globalResources, { calculateTableColumns: true });
  }}


class LibraryTable extends _RouteHandler.default {
  render() {
    return /*#__PURE__*/(
      _jsx(LibraryOverrideRequestState, {
        viewer: _TableViewer.TableViewer,
        location: this.props.location,
        sidePanelMode: "unpinned-mode",
        noScrollable: true }));


  }}exports.LibraryTable = LibraryTable;