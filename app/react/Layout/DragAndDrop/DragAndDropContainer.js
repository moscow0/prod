"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.containerTarget = exports.DragAndDropContainer = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _uniqueID = _interopRequireDefault(require("../../../shared/uniqueID"));
var _I18N = require("../../I18N");
var _DragAndDropItem = _interopRequireDefault(require("./DragAndDropItem"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class DragAndDropContainer extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { id: props.id || (0, _uniqueID.default)() };
    this.container = { id: this.state.id };
    this.moveItem = this.moveItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  moveItem(_dragIndex, hoverIndex, item) {
    const dragIndex = _dragIndex;
    const items = this.props.items.concat();
    if (!items.find((_item) => _item.id === item.id)) {
      return;
    }
    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, item.originalItem || item);
    this.props.onChange(items);
  }

  removeItem(id) {
    let items = this.props.items.concat();
    items = items.filter((item) => item.id !== id);
    this.props.onChange(items);
  }

  renderItem(item, index) {
    if (this.props.renderItem) {
      return this.props.renderItem(item, index);
    }

    return item.content;
  }

  render() {
    const { connectDropTarget, items, iconHandle } = this.props;
    return /*#__PURE__*/(
      _jsx("div", {}, void 0,
      connectDropTarget( /*#__PURE__*/
      _jsx("ul", { className: "list-group" }, void 0,
      items.map((item, index) => /*#__PURE__*/
      _jsx(_DragAndDropItem.default, {
        moveItem: this.moveItem,
        removeItem: this.removeItem,
        index: index,
        iconHandle: iconHandle || !!item.items,

        name: item.name,
        container: this.container,
        items: item.items,
        id: item.id,
        originalItem: item }, item.id,

      this.renderItem)), /*#__PURE__*/


      _jsx("div", { className: "no-properties" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "no-properties-wrap" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Drag items here")))))));






  }}exports.DragAndDropContainer = DragAndDropContainer;


DragAndDropContainer.defaultProps = {
  iconHandle: false };












const containerTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    if (item.id === component.state.id) {
      return;
    }
    if (!monitor.getDropResult() || !monitor.getDropResult().id) {
      const items = props.items.concat();
      if (!items.find((_item) => _item.id === item.id)) {
        items.push(item.originalItem || item);
        props.onChange(items);
      }
      return { id: component.state.id };
    }
  } };exports.containerTarget = containerTarget;


const dragAndDropContainer = (0, _reactDnd.DropTarget)('DRAG_AND_DROP_ITEM', containerTarget, (connect) => ({
  connectDropTarget: connect.dropTarget() }))(
DragAndDropContainer);var _default =

(0, _reactDnd.DragDropContext)(_reactDndHtml5Backend.HTML5Backend)(dragAndDropContainer);exports.default = _default;