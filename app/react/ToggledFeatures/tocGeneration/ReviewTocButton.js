"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ReviewTocButton = void 0;var _react = _interopRequireDefault(require("react"));
var _UI = require("../../UI");
var _FeatureToggle = require("../../components/Elements/FeatureToggle");
var _reactRedux = require("react-redux");
var _redux = require("redux");

var _actions = require("./actions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}






const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)({ onClick: _actions.tocGenerationActions.reviewToc }, dispatch);

const connector = (0, _reactRedux.connect)(null, mapDispatchToProps);




const ReviewTocButton = ({ file, onClick, children }) => /*#__PURE__*/
_jsx(_FeatureToggle.FeatureToggle, { feature: "tocGeneration" }, void 0,
file.generatedToc && /*#__PURE__*/
_jsx("button", { type: "button", onClick: () => onClick(file._id), className: "edit-toc btn btn-success" }, void 0, /*#__PURE__*/
_jsx(_UI.Icon, { icon: "tasks" }), /*#__PURE__*/
_jsx("span", { className: "btn-label" }, void 0, children)));





const container = connector(ReviewTocButton);exports.ReviewTocButton = container;