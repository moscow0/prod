"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TemplateAsPageControl = void 0;var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");


var _Layout = require("../../Layout");
var _ToggleChildren = require("../../Settings/components/ToggleChildren");
var _ReactReduxForms = require("../../ReactReduxForms");
var _I18N = require("../../I18N");
var _pageActions = require("../../Pages/actions/pageActions");
var _templateActions = require("../actions/templateActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const mapStateToProps = ({ pages }, ownProps) => ({
  pages: (pages === null || pages === void 0 ? void 0 : pages.filter((p) => p.get('entityView'))) || [],
  selectedPage: ownProps.selectedPage });


const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)({ loadPages: _pageActions.loadPages, updateValue: _templateActions.updateValue }, dispatch);

const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);



const TemplateAsPageControl = ({ pages, loadPages, selectedPage, updateValue }) => {
  (0, _react.useEffect)(() => {
    loadPages();
  }, []);

  return /*#__PURE__*/(
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx("label", {}, void 0,
    pages.size > 0 ?
    (0, _I18N.t)('System', 'Display entity view from page') :
    (0, _I18N.t)('System', 'There are no pages enabled for entity view'), /*#__PURE__*/
    _jsx(_Layout.Tip, { icon: "info-circle", position: "right" }, void 0,
    (0, _I18N.t)(
    'System',
    'Entities can be displayed in a custom page. For that, a custom page needs to be created in Pages, and then selected here.'))),



    pages.size > 0 && /*#__PURE__*/
    _jsx(_ToggleChildren.ToggleChildren, {
      toggled: Boolean(selectedPage),
      onToggleOff: () => updateValue('.entityViewPage', '') }, void 0, /*#__PURE__*/

    _jsx(_ReactReduxForms.Select, {
      model: ".entityViewPage",
      optionsValue: "sharedId",
      optionsLabel: "title",
      options: pages.toJS() }))));





};

const container = connector(TemplateAsPageControl);exports.TemplateAsPageControl = container;