"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));
var _requestState = require("./helpers/requestState");
var _MapView = require("./components/MapView");
var _LibraryLayout = _interopRequireDefault(require("./LibraryLayout"));
var _Library = _interopRequireDefault(require("./Library"));
var _LibraryModeToggleButtons = _interopRequireDefault(require("./components/LibraryModeToggleButtons"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class LibraryMap extends _Library.default {
  static async requestState(requestParams, globalResources) {
    return (0, _requestState.requestState)(requestParams, globalResources, { geolocation: true });
  }

  render() {
    return /*#__PURE__*/(
      _jsx(_LibraryLayout.default, { className: "library-map-layout" }, void 0, /*#__PURE__*/
      _jsx(_LibraryModeToggleButtons.default, { storeKey: "library", mapViewMode: true }), /*#__PURE__*/
      _react.default.createElement(_MapView.MapView, {
        storeKey: "library",
        ref: (ref) => {
          this.mapView = ref;
        } })));



  }}exports.default = LibraryMap;