"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.NavlinkForm = exports.LinkTarget = exports.LinkSource = void 0;exports.mapStateToProps = mapStateToProps;var _reactDnd = require("react-dnd");
var _reactReduxForm = require("react-redux-form");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactDom = require("react-dom");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _navlinksActions = require("../actions/navlinksActions");
var _UI = require("../../UI");
var _I18N = require("../../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const groupStyles = {
  paddingRight: '0px',
  display: 'flex' };


const linkStyles = {
  display: 'flex' };


const LinkSource = {
  beginDrag(props) {
    return {
      id: props.localID,
      index: props.index };

  } };exports.LinkSource = LinkSource;


const LinkTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect(); // eslint-disable-line react/no-find-dom-node

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.sortLink(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  } };exports.LinkTarget = LinkTarget;


class NavlinkForm extends _react.Component {
  constructor(props) {
    super(props);
    this.firstLoad = true;
    // eslint-disable-next-line react/no-unused-class-component-methods
    this.focus = () => {
      this.focusableInput.focus();
    };
  }

  componentDidMount() {
    this.props.blockReferences.push(this);
  }

  componentDidUpdate(previousProps) {
    if (this.firstLoad) {
      this.firstLoad = false;
      return;
    }

    this.focusOnNewElement(previousProps);
  }

  focusOnNewElement(previousProps) {
    if (this.props.link.type === 'group') {
      const links = this.props.links[this.props.index].sublinks;
      const previousLinks = previousProps.links[this.props.index].sublinks;
      const hasNewItem = (links === null || links === void 0 ? void 0 : links.length) > (previousLinks === null || previousLinks === void 0 ? void 0 : previousLinks.length);
      if (hasNewItem) {
        this.items[this.items.length - 1].focus();
      }
    }
  }

  render() {var _links$index$sublinks;
    const {
      link,
      links,
      index,
      isDragging,
      connectDragPreview,
      connectDragSource,
      connectDropTarget,
      formState } =
    this.props;
    let className = `list-group-item${isDragging ? ' dragging' : ''}`;
    let titleClass = 'input-group';

    if (formState.$form.errors[`links.${index}.title.required`]) {
      className += ' error';
      titleClass += ' has-error';
    }

    this.items = [];

    return connectDragPreview(
    connectDropTarget( /*#__PURE__*/
    _jsx("li", { className: className }, void 0, /*#__PURE__*/
    _jsx("div", { className: "propery-form expand" }, void 0, /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "col-sm-12" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
    _jsx("div", {
      className: link.type === 'group' ? 'col-sm-11' : 'col-sm-3',
      style: link.type === 'group' ? groupStyles : linkStyles }, void 0,

    connectDragSource( /*#__PURE__*/
    _jsx("span", {
      className: "property-name",
      style: { paddingRight: '10px', width: '70px' } }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "bars", className: "reorder" }), "\xA0", /*#__PURE__*/

    _jsx(_UI.Icon, { icon: link.type === 'group' ? 'caret-square-down' : 'link' }))), /*#__PURE__*/


    _jsx("div", { className: `${titleClass} input-group-width` }, void 0, /*#__PURE__*/
    _jsx("span", { className: "input-group-addon" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Title")), /*#__PURE__*/

    _jsx(_reactReduxForm.Field, { model: `settings.navlinksData.links[${index}].title` }, void 0, /*#__PURE__*/
    _react.default.createElement("input", {
      className: "form-control",
      style: { width: 'calc(100% + 5px)' },
      ref: (f) => {
        this.focusableInput = f;
      } })))),




    link.type !== 'group' && /*#__PURE__*/
    _jsx("div", { className: "col-sm-8", style: { paddingRight: '0px' } }, void 0, /*#__PURE__*/
    _jsx("div", { className: "input-group" }, void 0, /*#__PURE__*/
    _jsx("span", { className: "input-group-addon" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "URL")), /*#__PURE__*/

    _jsx(_reactReduxForm.Field, { model: `settings.navlinksData.links[${index}].url` }, void 0, /*#__PURE__*/
    _jsx("input", { className: "form-control", style: { width: 'calc(100% + 5px)' } })))), /*#__PURE__*/




    _jsx("div", { className: "col-sm-1" }, void 0, /*#__PURE__*/
    _jsx("button", {
      type: "button",
      className: "btn btn-danger btn-xs property-remove, menu-delete-button",
      style: { marginLeft: '4px' },
      onClick: () => this.props.removeLink(index) }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "trash-alt" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Delete")))), /*#__PURE__*/



    _jsx("div", { className: "row" }, void 0,
    link.type === 'group' && /*#__PURE__*/
    _jsx("div", { style: { paddingLeft: '80px' } }, void 0, /*#__PURE__*/
    _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "col-sm-12" }, void 0, (_links$index$sublinks =
    links[index].sublinks) === null || _links$index$sublinks === void 0 ? void 0 : _links$index$sublinks.map((_, i) => /*#__PURE__*/
    _jsx("div", {
      className: "row",
      style: { paddingBottom: '5px', paddingTop: '5px' } },
    i, /*#__PURE__*/

    _jsx("div", { className: "col-sm-3", style: { display: 'flex' } }, void 0, /*#__PURE__*/
    _jsx("span", { style: { padding: '5px 10px 0px 0px' } }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "link" })), /*#__PURE__*/

    _jsx("div", { className: `${titleClass} input-group-width` }, void 0, /*#__PURE__*/
    _jsx("span", { className: "input-group-addon" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Title")), /*#__PURE__*/

    _jsx(_reactReduxForm.Field, {
      model: `settings.navlinksData.links[${index}].sublinks[${i}].title` }, void 0, /*#__PURE__*/

    _react.default.createElement("input", {
      className: "form-control",
      style: { width: '100%' },
      ref: (f) => this.items.push(f) })))), /*#__PURE__*/




    _jsx("div", { className: "col-sm-8" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "input-group" }, void 0, /*#__PURE__*/
    _jsx("span", { className: "input-group-addon" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "URL")), /*#__PURE__*/

    _jsx(_reactReduxForm.Field, {
      model: `settings.navlinksData.links[${index}].sublinks[${i}].url` }, void 0, /*#__PURE__*/

    _jsx("input", { className: "form-control" })))), /*#__PURE__*/



    _jsx("div", { className: "col-sm-1", style: { paddingLeft: '0px' } }, void 0, /*#__PURE__*/
    _jsx("button", {
      type: "button",
      className: "btn btn-danger btn-xs property-remove, menu-delete-button",
      onClick: () => this.props.removeGroupLink(index, i) }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "trash-alt" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Delete"))))), /*#__PURE__*/




    _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "col-sm-12" }, void 0, /*#__PURE__*/
    _jsx("button", {
      className: "menu-link-group-button",
      type: "button",
      onClick: this.props.addGroupLink.bind(this, links, index) }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "link" }), "\xA0", /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Add link")))))))))))))));















  }}exports.NavlinkForm = NavlinkForm;


NavlinkForm.defaultProps = {
  blockReferences: [] };



















const dropTarget = (0, _reactDnd.DropTarget)('LINK', LinkTarget, (connectDND) => ({
  connectDropTarget: connectDND.dropTarget() }))(
NavlinkForm);

const dragSource = (0, _reactDnd.DragSource)('LINK', LinkSource, (connectDND, monitor) => ({
  connectDragSource: connectDND.dragSource(),
  connectDragPreview: connectDND.dragPreview(),
  isDragging: monitor.isDragging() }))(
dropTarget);

function mapStateToProps({ settings }) {
  const { links } = settings.navlinksData;
  return {
    formState: settings.navlinksFormState,
    links };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ removeLink: _navlinksActions.removeLink, addGroupLink: _navlinksActions.addGroupLink, removeGroupLink: _navlinksActions.removeGroupLink }, dispatch);
}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(dragSource);exports.default = _default;