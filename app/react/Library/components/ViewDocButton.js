"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ViewDocButton = void 0;exports.mapDispatchToProps = mapDispatchToProps;exports.mapStateToProps = mapStateToProps;

var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _immutable = require("immutable");
var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _BasicReducer = require("../../BasicReducer");
var _url = _interopRequireDefault(require("url"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

function getDocumentUrlQuery(searchTerm, targetReference) {
  const query = {};
  if (searchTerm) {
    query.searchTerm = searchTerm;
  }
  if (targetReference) {
    query.ref = targetReference.get('_id');
  }
  return query;
}

class ViewDocButton extends _react.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.stopPropagation();
    const { targetReference, openReferencesTab } = this.props;
    if (targetReference) {
      openReferencesTab();
    }
  }

  render() {
    const { sharedId, processed, searchTerm, file, targetReference } = this.props;
    const isEntity = !file;

    const pathname = `/entity/${sharedId}`;
    const query = getDocumentUrlQuery(searchTerm, targetReference);
    const documentViewUrl = _url.default.format({
      pathname,
      query });


    if (!processed && !isEntity) {
      return false;
    }

    return /*#__PURE__*/(
      _jsx(_I18N.I18NLink, {
        to: documentViewUrl,
        className: "btn btn-default btn-xs view-doc",
        onClick: this.onClick }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "angle-right", directionAware: true }), " ", (0, _I18N.t)('System', 'View')));


  }}exports.ViewDocButton = ViewDocButton;


ViewDocButton.defaultProps = {
  searchTerm: '',
  processed: false,
  targetReference: null };











function mapStateToProps(state, props) {
  return {
    searchTerm: props.storeKey ? state[props.storeKey].search.searchTerm : '' };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    openReferencesTab: () => (_dispatch) =>
    _dispatch(_BasicReducer.actions.set('viewer.sidepanel.tab', 'references')) },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ViewDocButton);exports.default = _default;