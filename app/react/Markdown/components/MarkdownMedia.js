"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactPlayer = _interopRequireDefault(require("react-player"));
var _UI = require("../../UI");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const propsToConfig = (props) => {
  const config = { url: '', options: {} };

  let parsedProps = props.config.replace(/\(|\)/g, '').split(',');
  config.url = parsedProps.shift();

  parsedProps = (parsedProps.join(',') || '{}').replace(/&quot;/g, '"');

  try {
    parsedProps = JSON.parse(parsedProps);
  } catch (error) {
    parsedProps = {};
  }

  config.options = parsedProps;

  return config;
};

class MarkdownMedia extends _react.Component {
  timeLinks(_timelinks) {
    const timelinks = _timelinks || {};
    return Object.keys(timelinks).map((timeKey, index) => {
      const seconds = timeKey.
      split(':').
      reverse().
      reduce((_seconds, n, _index) => _seconds + parseInt(n, 10) * 60 ** _index, 0);
      return /*#__PURE__*/(
        _jsx("div", { className: "timelink", onClick: this.seekTo.bind(this, seconds) }, index, /*#__PURE__*/
        _jsx("b", {}, void 0, /*#__PURE__*/
        _jsx(_UI.Icon, { icon: "play" }), " ", timeKey), /*#__PURE__*/

        _jsx("span", {}, void 0, timelinks[timeKey])));


    });
  }

  seekTo(seconds) {
    this.player.seekTo(seconds);
  }

  render() {
    const config = propsToConfig(this.props);
    const { compact } = this.props;
    const dimensions = { width: '100%' };
    if (compact) {
      dimensions.height = '100%';
    }
    return /*#__PURE__*/(
      _jsx("div", { className: `video-container ${compact ? 'compact' : ''}` }, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _react.default.createElement(_reactPlayer.default, _extends({
        className: "react-player",
        ref: (ref) => {
          this.player = ref;
        },
        url: config.url },
      dimensions, {
        controls: true }))), /*#__PURE__*/


      _jsx("div", {}, void 0, this.timeLinks(config.options.timelinks)), /*#__PURE__*/
      _jsx("p", { className: "print-view-alt" }, void 0, config.url)));


  }}


MarkdownMedia.defaultProps = {
  compact: false };var _default =







MarkdownMedia;exports.default = _default;