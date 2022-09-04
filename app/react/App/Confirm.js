"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Confirm = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _I18N = require("../I18N");

var _Modal = _interopRequireDefault(require("../Layout/Modal"));
var _Loader = _interopRequireDefault(require("../components/Elements/Loader"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Confirm extends _react.Component {
  static getDerivedStateFromProps(newProps, state) {
    if (newProps.accept !== state.accept) {
      return { isOpen: true, accept: newProps.accept };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      isLoading: props.isLoading,
      confirmInputValue: '' };


    this.accept = this.accept.bind(this);
    this.cancel = this.cancel.bind(this);
    this.close = this.close.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  close() {
    this.setState({ isOpen: false, confirmInputValue: '', isLoading: false });
  }

  accept() {
    if (this.props.accept) {
      const actionResponse = this.props.accept();
      if (actionResponse && actionResponse instanceof Promise) {
        this.setState({ isLoading: true });
        actionResponse.then(this.close);
        actionResponse.catch(this.close);
        return;
      }
    }
    this.close();
  }

  cancel() {
    if (this.props.cancel) {
      this.props.cancel();
    }
    this.close();
  }

  handleInput(e) {
    this.setState({ confirmInputValue: e.target.value });
  }

  renderExtraConfirm() {
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "If you want to continue, please type"), " '",
      this.props.extraConfirmWord, "'", ' '), /*#__PURE__*/

      _jsx("input", { type: "text", onChange: this.handleInput, value: this.state.confirmInputValue })));


  }

  render() {
    const { type, acceptLabel, zIndex, message, title, messageKey } = this.props;
    return /*#__PURE__*/(
      _jsx(_Modal.default, { isOpen: this.state.isOpen, type: type, zIndex: zIndex }, void 0, /*#__PURE__*/
      _jsx(_Modal.default.Body, {}, void 0, /*#__PURE__*/
      _jsx("h4", {}, void 0,
      typeof title !== 'string' && title,
      typeof title === 'string' && /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, title)), /*#__PURE__*/

      _jsx("p", {}, void 0,
      typeof message !== 'string' && message,
      typeof message === 'string' && /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: messageKey }, void 0, message)),


      this.props.extraConfirm && !this.state.isLoading && this.renderExtraConfirm(),
      this.state.isLoading && /*#__PURE__*/_jsx(_Loader.default, {})),


      !this.state.isLoading && /*#__PURE__*/
      _jsx(_Modal.default.Footer, {}, void 0,
      !this.props.noCancel && /*#__PURE__*/
      _jsx("button", { type: "button", className: "btn btn-default cancel-button", onClick: this.cancel }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Cancel")), /*#__PURE__*/


      _jsx("button", {
        type: "button",
        disabled:
        this.props.extraConfirm &&
        this.state.confirmInputValue !== this.props.extraConfirmWord,

        className: `btn confirm-button btn-${type}`,
        onClick: this.accept }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, acceptLabel)))));





  }}exports.Confirm = Confirm;


Confirm.defaultProps = {
  isLoading: false,
  extraConfirm: false,
  isOpen: false,
  noCancel: false,
  type: 'danger',
  title: 'Confirm action',
  messageKey: '',
  message: 'Are you sure you want to continue?',
  extraConfirmWord: 'CONFIRM',
  acceptLabel: 'Accept',
  zIndex: 99 };var _default =



















Confirm;exports.default = _default;