"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.OneUpReviewBase = void 0;var _RouteHandler = _interopRequireDefault(require("../App/RouteHandler"));
var _BasicReducer = require("../BasicReducer");
var _Loader = _interopRequireDefault(require("../components/Elements/Loader"));
var uiActions = _interopRequireWildcard(require("../Entities/actions/uiActions"));

var _libraryActions = require("../Library/actions/libraryActions");
var _requestState = require("../Library/helpers/requestState");
var _Multireducer = require("../Multireducer");
var relationships = _interopRequireWildcard(require("../Relationships/utils/routeUtils"));
var _RelationTypesAPI = _interopRequireDefault(require("../RelationTypes/RelationTypesAPI"));
var reviewActions = _interopRequireWildcard(require("./actions/actions"));
var _OneUpEntityViewer = require("./components/OneUpEntityViewer");
var _SearchAPI = _interopRequireDefault(require("../Search/SearchAPI"));
var _TemplatesAPI = _interopRequireDefault(require("../Templates/TemplatesAPI"));
var _ThesauriAPI = _interopRequireDefault(require("../Thesauri/ThesauriAPI"));

var _referencesActions = require("../Viewer/actions/referencesActions");
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");
var _propertyTypes = require("../../shared/propertyTypes");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}











function buildInitialOneUpState(
documentsRequest,
numDocuments,
thesauri,
templates)
{var _documentsRequest$dat, _documentsRequest$dat2;
  const thesaurusValues = [];
  const thesauriKeys = Object.keys((_documentsRequest$dat = (_documentsRequest$dat2 = documentsRequest.data) === null || _documentsRequest$dat2 === void 0 ? void 0 : _documentsRequest$dat2.filters) !== null && _documentsRequest$dat !== void 0 ? _documentsRequest$dat : {}).reduce((res, k) => {
    const propName = k.startsWith('__') ? k.substring(2) : k;
    if (k.startsWith('__')) {
      thesaurusValues.push(
      ...documentsRequest.data.filters[k].values.filter(
      (v) => v && !['any', 'missing'].includes(v)));


    }
    return _objectSpread(_objectSpread({},
    res),
    templates.reduce((res2, tmpl) => {
      const prop = (tmpl.properties || []).find((p) => p.name === propName);
      if (
      !prop ||
      !prop.content ||
      prop.type !== _propertyTypes.propertyTypes.select && prop.type !== _propertyTypes.propertyTypes.multiselect)
      {
        return res2;
      }
      return _objectSpread(_objectSpread({}, res2), {}, { [prop.content]: true });
    }, {}));

  }, {});
  const thesaurus =
  Object.keys(thesauriKeys).length === 1 ?
  thesauri.find((t) => t._id.toString() === Object.keys(thesauriKeys)[0]) :
  null;
  thesauri.forEach((t) => {
    (t.values || []).forEach((tv) => {
      const i = thesaurusValues.findIndex((v) => v === tv.id);
      if (i >= 0) {
        thesaurusValues[i] = tv.label;
      }
    });
  });
  return {
    loaded: true,
    fullEdit: false,
    loadConnections: false,
    indexInDocs: 0,
    totalDocs: numDocuments,
    maxTotalDocs: 5001,
    requestHeaders: documentsRequest.headers,
    reviewThesaurusName: thesaurus ? thesaurus.name : '',
    reviewThesaurusId: thesaurus ? thesaurus._id.toString() : '',
    reviewThesaurusValues: thesaurusValues };

}

class OneUpReviewBase extends _RouteHandler.default {
  static async requestState(requestParams, state) {
    const documentsRequest = requestParams.set(_objectSpread(_objectSpread({},
    (0, _requestState.processQuery)(requestParams.data, state)), {}, {
      limit: 5001,
      select: ['sharedId'],
      unpublished: !!requestParams.data.unpublished,
      includeUnpublished: !!requestParams.data.includeUnpublished,
      includeReviewAggregations: true }));


    const [templates, thesauri, relationTypes, documents] = await Promise.all([
    _TemplatesAPI.default.get(requestParams.onlyHeaders()),
    _ThesauriAPI.default.getThesauri(requestParams.onlyHeaders()),
    _RelationTypesAPI.default.get(requestParams.onlyHeaders()),
    _SearchAPI.default.search(documentsRequest)]);


    const firstSharedId = documents.rows.length ? documents.rows[0].sharedId : '';

    return [
    _BasicReducer.actions.set('relationTypes', relationTypes),
    (dispatch) => (0, _Multireducer.wrapDispatch)(dispatch, 'library')((0, _libraryActions.unsetDocuments)()),
    (dispatch) => (0, _Multireducer.wrapDispatch)(dispatch, 'library')((0, _libraryActions.setDocuments)(documents)),
    _BasicReducer.actions.set(
    'oneUpReview.state',
    buildInitialOneUpState(documentsRequest, documents.rows.length, thesauri, templates)),

    ...(firstSharedId ?
    await reviewActions.getAndLoadEntity(
    requestParams.set({ sharedId: firstSharedId }),
    templates,
    state,
    false) :

    [])];

  }

  urlHasChanged(nextProps) {
    return nextProps.location.query.q !== this.props.location.query.q;
  }

  componentWillUnmount() {
    this.emptyState();
  }

  componentDidMount() {
    this.context.store.dispatch(uiActions.showTab('info'));
  }

  emptyState() {
    (0, _Multireducer.wrapDispatch)(this.context.store.dispatch, 'library')((0, _libraryActions.unsetDocuments)());
    this.context.store.dispatch((0, _referencesActions.setReferences)([]));
    this.context.store.dispatch(_BasicReducer.actions.unset('entityView/entity'));
    this.context.store.dispatch(_reactReduxForm.actions.reset('entityView.entityForm'));
    this.context.store.dispatch(relationships.emptyState());
    _BasicReducer.actions.set('oneUpReview.state', {});
  }

  render() {
    const { entity, oneUpState } = this.props;
    if (
    !oneUpState ||
    !oneUpState.get('loaded') ||
    oneUpState.get('totalDocs') && (!entity || !entity.get('_id')))
    {
      return /*#__PURE__*/_jsx(_Loader.default, {});
    }
    return /*#__PURE__*/_jsx(_OneUpEntityViewer.OneUpEntityViewer, {});
  }}exports.OneUpReviewBase = OneUpReviewBase;var _default =











(0, _reactRedux.connect)(
(state) => (
{
  entity: state.entityView.entity,
  oneUpState: state.oneUpReview.state }))(

OneUpReviewBase);exports.default = _default;