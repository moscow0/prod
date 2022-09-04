"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));

var _BasicReducer = require("../BasicReducer");
var _SearchButton = _interopRequireDefault(require("../Entities/components/SearchButton"));
var _RelationTypesAPI = _interopRequireDefault(require("../RelationTypes/RelationTypesAPI"));
var relationships = _interopRequireWildcard(require("../Relationships/utils/routeUtils"));

var _getPageAssets = require("../Pages/utils/getPageAssets");

var _Notifications = require("../Notifications");
var _EntityViewer = _interopRequireDefault(require("../Entities/components/EntityViewer"));
var _EntitiesAPI = _interopRequireDefault(require("../Entities/EntitiesAPI"));
var _pageAssets = require("./pageAssets");

var uiActions = _interopRequireWildcard(require("../Entities/actions/uiActions"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class Entity extends _react.Component {
  static async requestState(requestParams, state) {
    const [[entity], relationTypes, [connectionsGroups, searchResults, sort, filters]] =
    await Promise.all([
    _EntitiesAPI.default.get(requestParams.set({ sharedId: requestParams.data.sharedId })),
    _RelationTypesAPI.default.get(requestParams.onlyHeaders()),
    relationships.requestState(requestParams, state)]);


    const entityTemplate = state.templates.find((t) => t.get('_id') === entity.template);

    const pageActions = [];
    if (entityTemplate.get('entityViewPage')) {
      const assets = (0, _pageAssets.prepareAssets)(entity, entityTemplate, state, relationTypes);
      const { pageView, itemLists, datasets, errors } = await (0, _getPageAssets.getPageAssets)(
      requestParams.set({ sharedId: entityTemplate.get('entityViewPage') }),
      undefined, _objectSpread({},

      assets));



      pageActions.push(
      _BasicReducer.actions.set('page/pageView', pageView),
      _BasicReducer.actions.set('page/itemLists', itemLists),
      _BasicReducer.actions.set('page/datasets', datasets));

      if (errors && state.user.get('_id')) {
        pageActions.push(_Notifications.notificationActions.notify(errors, 'warning'));
      }
    }

    return [
    _BasicReducer.actions.set('relationTypes', relationTypes),
    _BasicReducer.actions.set('entityView/entity', entity),
    relationships.setReduxState({
      relationships: {
        list: {
          sharedId: entity.sharedId,
          entity,
          connectionsGroups,
          searchResults,
          sort,
          filters,
          view: 'graph' } } })].



    concat(pageActions);
  }

  componentWillUnmount() {
    this.context.store.dispatch(uiActions.resetUserSelectedTab());
    this.context.store.dispatch(_BasicReducer.actions.unset('page/pageView'));
    this.context.store.dispatch(_BasicReducer.actions.unset('page/itemLists'));
    this.context.store.dispatch(_BasicReducer.actions.unset('page/datasets'));
  }

  static renderTools() {
    return /*#__PURE__*/(
      _jsx("div", { className: "searchBox" }, void 0, /*#__PURE__*/
      _jsx(_SearchButton.default, { storeKey: "library" })));


  }

  render() {
    return /*#__PURE__*/_jsx(_EntityViewer.default, {});
  }}


Entity.contextTypes = {
  store: _propTypes.default.object };var _default =


Entity;exports.default = _default;