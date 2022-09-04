"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.OneUpTitleBarBase = exports.OneUpTitleBar = void 0;var _I18N = require("../../I18N");

var _actions = require("../actions/actions");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _UI = require("../../UI");
var _common = require("../common");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const defaultProps = {
  isPristine: true,
  oneUpState: {},
  switchOneUpEntity: (_delta, _save) => {} };




class OneUpTitleBarBase extends _react.Component {






  backToThesaurus() {
    const { oneUpState, isPristine } = this.props;
    if (oneUpState.reviewThesaurusName) {
      return /*#__PURE__*/(
        _jsx(_I18N.I18NLink, {
          to: `/settings/dictionaries/cockpit/${oneUpState.reviewThesaurusId}`,
          className: "btn btn-default",
          confirmTitle: isPristine ? '' : 'Confirm discard changes',
          confirmMessage:
          isPristine ?
          '' :
          'There are unsaved changes. Are you sure you want to discard them and navigate away?' }, void 0, /*#__PURE__*/


        _jsx(_UI.Icon, { icon: "arrow-left" }), /*#__PURE__*/
        _jsx("span", { className: "btn-label" }, void 0,
        (0, _I18N.t)('System', 'Back to'), " ", /*#__PURE__*/_jsx("span", {}, void 0, `'${oneUpState.reviewThesaurusName}'`))));



    }
    return null;
  }

  navButtons() {
    const { oneUpState, isPristine } = this.props;
    const prevClass = oneUpState.indexInDocs > 0 ? '' : ' btn-disabled';
    const nextClass = oneUpState.indexInDocs < oneUpState.totalDocs - 1 ? '' : ' btn-disabled';
    const navAction = isPristine ?
    (delta) => () => this.props.switchOneUpEntity(delta, false) :
    (delta) => () =>
    this.context.confirm({
      accept: () => this.props.switchOneUpEntity(delta, false),
      title: 'Confirm discard changes',
      message:
      'There are unsaved changes. Are you sure you want to discard them and switch to a different document?' });

    return /*#__PURE__*/(
      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", onClick: navAction(-1), className: `btn btn-default${prevClass}` }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "arrow-left" })), /*#__PURE__*/

      _jsx("button", { type: "button", onClick: navAction(+1), className: `btn btn-default${nextClass}` }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "arrow-right" }))));



  }

  render() {
    const { oneUpState } = this.props;

    return /*#__PURE__*/(
      _jsx("div", { className: "content-header-title" }, void 0,
      this.backToThesaurus(),
      oneUpState.reviewThesaurusValues && oneUpState.reviewThesaurusValues.length === 1 ? /*#__PURE__*/
      _jsx("span", { className: "large" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "space8" }),
      (0, _I18N.t)('System', 'Documents including suggestion:'), ' ', /*#__PURE__*/
      _jsx("b", {}, void 0, `'${oneUpState.reviewThesaurusValues[0]}'`), /*#__PURE__*/
      _jsx("span", { className: "separator" })) : /*#__PURE__*/


      _jsx("span", { className: "large" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "space8" }),
      (0, _I18N.t)('System', 'Documents for custom filter'), /*#__PURE__*/
      _jsx("span", { className: "separator" })),


      oneUpState.totalDocs ? /*#__PURE__*/
      _jsx("div", {}, void 0,
      (0, _I18N.t)('System', 'Document'), " ", /*#__PURE__*/_jsx("span", {}, void 0, oneUpState.indexInDocs + 1), " ", (0, _I18N.t)('System', 'of'), ' ', /*#__PURE__*/
      _jsx("span", {}, void 0,
      oneUpState.totalDocs >= oneUpState.maxTotalDocs ?
      `>${oneUpState.totalDocs - 1}` :
      `${oneUpState.totalDocs}`), /*#__PURE__*/

      _jsx("span", { className: "space8" })) :


      (0, _I18N.t)('System', 'No Documents found'),

      this.navButtons()));


  }}exports.OneUpTitleBarBase = OneUpTitleBarBase;_defineProperty(OneUpTitleBarBase, "defaultProps", defaultProps);_defineProperty(OneUpTitleBarBase, "contextTypes", { confirm: _propTypes.default.func });


const mapStateToProps = (state) => {var _selectOneUpState;return {
    isPristine: (0, _common.selectIsPristine)(state),
    oneUpState: (_selectOneUpState = (0, _common.selectOneUpState)(state)) !== null && _selectOneUpState !== void 0 ? _selectOneUpState : {} };};


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    switchOneUpEntity: _actions.switchOneUpEntity,
    toggleOneUpFullEdit: _actions.toggleOneUpFullEdit },

  dispatch);

}

const OneUpTitleBar = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OneUpTitleBarBase);exports.OneUpTitleBar = OneUpTitleBar;