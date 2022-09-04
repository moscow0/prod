"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.FavoriteBanner = void 0;var _react = _interopRequireWildcard(require("react"));
var _I18N = require("../../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}








const getUwaziFavorites = () =>
localStorage.getItem('uwaziFavorites') ? localStorage.getItem('uwaziFavorites').split(',') : [];

class FavoriteBanner extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
    this.toggleClick = this.toggleClick.bind(this);
  }

  componentDidMount() {
    const { sharedId } = this.props;
    const shouldBeSelected = getUwaziFavorites().includes(sharedId);
    if (shouldBeSelected) {
      this.setState({ selected: shouldBeSelected });
    }
  }

  toggleClick(e) {
    const { sharedId } = this.props;
    const uwaziFavorites = getUwaziFavorites();
    e.stopPropagation();
    e.preventDefault();
    if (uwaziFavorites.includes(sharedId)) {
      const itemIndex = uwaziFavorites.indexOf(sharedId);
      uwaziFavorites.splice(itemIndex, 1);
    } else {
      uwaziFavorites.push(sharedId);
    }
    localStorage.setItem('uwaziFavorites', uwaziFavorites.join(','));
    this.setState({ selected: getUwaziFavorites().includes(sharedId) });
  }

  render() {
    const { selected } = this.state;

    return /*#__PURE__*/(
      _jsx("button", {
        className: `btn favoriteBanner ${selected ? 'selected' : ''}`,
        onClick: this.toggleClick,
        type: "button",
        suppressHydrationWarning: true }, void 0, /*#__PURE__*/

      _jsx("span", { className: "tab-link-tooltip" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Add / remove favorite"))));



  }}exports.FavoriteBanner = FavoriteBanner;