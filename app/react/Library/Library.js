"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _RouteHandler = _interopRequireDefault(require("../App/RouteHandler"));
var _BasicReducer = require("../BasicReducer");
var _libraryActions = require("./actions/libraryActions");
var _DocumentsList = _interopRequireDefault(require("./components/DocumentsList"));
var _LibraryModeToggleButtons = _interopRequireDefault(require("./components/LibraryModeToggleButtons"));
var _requestState = require("./helpers/requestState");
var _LibraryLayout = _interopRequireDefault(require("./LibraryLayout"));
var _Multireducer = require("../Multireducer");
var _react = _interopRequireDefault(require("react"));
var _TableViewer = require("../Layout/TableViewer");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Library extends _RouteHandler.default {
  constructor(props, context) {
    super(props, context);
    this.superComponentWillReceiveProps = super.componentWillReceiveProps;

    const { dispatch } = context.store;
    (0, _Multireducer.wrapDispatch)(dispatch, 'library')((0, _libraryActions.enterLibrary)());
    this.zoomIn = () => (0, _Multireducer.wrapDispatch)(dispatch, 'library')((0, _libraryActions.zoomIn)());
    this.zoomOut = () => (0, _Multireducer.wrapDispatch)(dispatch, 'library')((0, _libraryActions.zoomOut)());
  }

  static renderTools() {}

  static async requestState(requestParams, globalResources) {
    return (0, _requestState.requestState)(requestParams, globalResources);
  }

  urlHasChanged(nextProps) {
    return nextProps.location.query.q !== this.props.location.query.q;
  }

  componentWillUnmount() {
    this.emptyState();
  }

  componentDidUpdate(prevProps) {
    if (this.urlHasChanged(prevProps)) {
      this.getClientState(this.props);
    }
  }

  emptyState() {
    (0, _Multireducer.wrapDispatch)(this.context.store.dispatch, 'library')((0, _libraryActions.unsetDocuments)());
    _BasicReducer.actions.set('library.sidepanel.quickLabelState', {});
  }

  render() {
    const tableViewMode = this.props.viewer === _TableViewer.TableViewer;
    return /*#__PURE__*/(
      _jsx(_LibraryLayout.default, {
        sidePanelMode: this.props.sidePanelMode,
        noScrollable: this.props.noScrollable }, void 0, /*#__PURE__*/

      _jsx(_LibraryModeToggleButtons.default, {
        storeKey: "library",
        zoomIn: this.zoomIn,
        zoomOut: this.zoomOut,
        tableViewMode: tableViewMode }), /*#__PURE__*/

      _jsx(_DocumentsList.default, { storeKey: "library", CollectionViewer: this.props.viewer })));


  }}exports.default = Library;