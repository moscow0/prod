"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _risonNode = _interopRequireDefault(require("rison-node"));
var _I18N = require("../I18N");
var _components = require("./components");
var _CustomHooks = _interopRequireDefault(require("./CustomHooks"));

var _markdownToReact = _interopRequireDefault(require("./markdownToReact"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class MarkdownViewer extends _react.Component {
  static errorHtml(index, message) {
    return /*#__PURE__*/(
      _jsx("p", { className: "error" }, index, /*#__PURE__*/
      _jsx("br", {}), /*#__PURE__*/
      _jsx("strong", {}, void 0, /*#__PURE__*/
      _jsx("i", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Custom component error" }, void 0, "Custom component markup error: unsuported values! Please check your configuration"))), /*#__PURE__*/




      _jsx("br", {}),
      message, /*#__PURE__*/
      _jsx("br", {})));


  }

  static customHook(config, index) {
    const props = _risonNode.default.decode(config);
    if (!_CustomHooks.default[props.component]) {
      throw new Error('Invalid  component');
    }
    const Element = _CustomHooks.default[props.component];
    return /*#__PURE__*/_react.default.createElement(Element, _extends({}, props, { key: index }));
  }

  inlineComponent(type, config, index) {
    const { compact } = this.props;
    let result;
    if (type === 'list') {
      result = this.list(config, index);
    }

    if (type === 'link') {
      result = /*#__PURE__*/_react.default.createElement(_components.MarkdownLink, _extends({}, _risonNode.default.decode(config), { key: index }));
    }

    if (type === 'searchbox') {
      result = /*#__PURE__*/_react.default.createElement(_components.SearchBox, _extends({}, _risonNode.default.decode(config), { key: index }));
    }

    if (['vimeo', 'youtube', 'media'].includes(type)) {
      result = /*#__PURE__*/
      _jsx("div", {}, index, /*#__PURE__*/
      _jsx(_components.MarkdownMedia, { config: config, compact: compact }, index));


    }

    if (type === 'customhook') {
      result = MarkdownViewer.customHook(config, index);
    }
    return result;
  }

  customComponent(type, config, index, children) {
    try {
      if (typeof type === 'function' || typeof type === 'object') {
        const Element = type;
        return /*#__PURE__*/(
          _react.default.createElement(Element, _extends({}, config, { key: index }),
          children));


      }

      if (type) {
        return this.inlineComponent(type, config, index);
      }
    } catch (error) {
      return MarkdownViewer.errorHtml(index, error.message);
    }

    return false;
  }

  list(_config, index) {
    const listData = this.props.lists[this.renderedLists] || {};
    const output = /*#__PURE__*/
    _jsx(_components.ItemList, {

      link: `/library/${listData.params}`,
      items: listData.items,
      options: listData.options }, index);


    this.renderedLists += 1;
    return output;
  }

  render() {
    this.renderedLists = 0;

    const ReactFromMarkdown = (0, _markdownToReact.default)(
    this.props.markdown,
    this.customComponent.bind(this),
    this.props.html);


    if (!ReactFromMarkdown) {
      return false;
    }

    return /*#__PURE__*/_jsx("div", { className: "markdown-viewer" }, void 0, ReactFromMarkdown);
  }}


MarkdownViewer.defaultProps = {
  lists: [],
  markdown: '',
  html: false,
  compact: false };var _default =









MarkdownViewer;exports.default = _default;