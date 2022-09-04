"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ActionButton = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _immutable = require("immutable");
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _actions = require("../actions/actions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ActionButton extends _react.Component {
  onClick(enabled, connection) {
    if (enabled) {
      if (this.props.action === 'save') {
        this.props.saveConnection(connection, this.props.onCreate);
      }
      if (this.props.action === 'connect') {
        this.props.selectRangedTarget(connection, this.props.onRangedConnect);
      }
    }
  }

  renderContent() {
    let buttonIcon = 'arrow-right';
    if (this.props.busy) {
      buttonIcon = 'spinner';
    }
    if (this.props.action === 'save') {
      buttonIcon = 'save';
      return /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Save");
    }
    return /*#__PURE__*/_jsx(_UI.Icon, { icon: buttonIcon, spin: !!this.props.busy });
  }

  render() {
    const connection = this.props.connection.toJS();

    let connectionValid =
    connection.sourceDocument && connection.targetDocument && connection.template;

    if (this.props.type === 'basic') {
      delete connection.sourceRange;
    }

    if (this.props.type !== 'basic') {
      connectionValid = connectionValid && connection.sourceRange;
    }

    const enabled = connectionValid && !this.props.busy;
    const buttonClass =
    this.props.action === 'save' ? 'btn btn-success' : 'edit-metadata btn btn-success';

    return /*#__PURE__*/(
      _jsx("button", {
        className: buttonClass,
        disabled: !enabled,
        type: "button",
        onClick: this.onClick.bind(this, enabled, connection) }, void 0,

      this.renderContent()));


  }}exports.ActionButton = ActionButton;


ActionButton.defaultProps = {
  onCreate: () => {},
  onRangedConnect: () => {},
  type: '',
  busy: false };













function mapStateToProps({ connections }) {
  return {
    type: connections.connection.get('type'),
    connection: connections.connection,
    busy: connections.uiState.get('creating') || connections.uiState.get('connecting') };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ saveConnection: _actions.saveConnection, selectRangedTarget: _actions.selectRangedTarget }, dispatch);
}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ActionButton);exports.default = _default;