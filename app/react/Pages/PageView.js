"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));

var _BasicReducer = require("../BasicReducer");
var _libraryActions = require("../Library/actions/libraryActions");
var _Multireducer = require("../Multireducer");
var _RouteHandler = _interopRequireDefault(require("../App/RouteHandler"));
var _ViewMetadataPanel = _interopRequireDefault(require("../Library/components/ViewMetadataPanel"));
var _SelectMultiplePanelContainer = _interopRequireDefault(require("../Library/containers/SelectMultiplePanelContainer"));

var _ErrorBoundary = require("../App/ErrorHandling/ErrorBoundary");
var _PageViewer = require("./components/PageViewer");
var _getPageAssets = require("./utils/getPageAssets");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class PageView extends _RouteHandler.default {
  static async requestState(requestParams) {
    try {
      const { pageView, itemLists, datasets } = await (0, _getPageAssets.getPageAssets)(requestParams);
      return [
      _BasicReducer.actions.set('page/pageView', pageView),
      _BasicReducer.actions.set('page/itemLists', itemLists),
      _BasicReducer.actions.set('page/datasets', datasets)];

    } catch (e) {
      return [_BasicReducer.actions.set('page/error', e)];
    }
  }

  closeSidePanel() {
    (0, _Multireducer.wrapDispatch)(this.context.store.dispatch, 'library')((0, _libraryActions.unselectAllDocuments)());
  }

  componentDidMount() {
    this.closeSidePanel();
  }

  componentWillUnmount() {
    this.emptyState();
  }

  emptyState() {
    this.closeSidePanel();
    this.context.store.dispatch(_BasicReducer.actions.unset('page/pageView'));
    this.context.store.dispatch(_BasicReducer.actions.unset('page/itemLists'));
    this.context.store.dispatch(_BasicReducer.actions.unset('page/datasets'));
    this.context.store.dispatch(_BasicReducer.actions.unset('page/error'));
  }

  setReduxState(state) {
    this.context.store.dispatch(_BasicReducer.actions.set('page/pageView', state.page.pageView));
    this.context.store.dispatch(_BasicReducer.actions.set('page/itemLists', state.page.itemLists));
    this.context.store.dispatch(_BasicReducer.actions.set('page/datasets', state.page.datasets));
    this.context.store.dispatch(_BasicReducer.actions.set('page/error', state.page.error));
  }

  render() {
    return /*#__PURE__*/(
      _jsx(_ErrorBoundary.ErrorBoundary, {}, void 0, /*#__PURE__*/
      _jsx(_PageViewer.PageViewer, {}), /*#__PURE__*/
      _jsx(_ViewMetadataPanel.default, { storeKey: "library" }), /*#__PURE__*/
      _jsx(_SelectMultiplePanelContainer.default, { storeKey: "library" })));


  }}var _default =


PageView;exports.default = _default;