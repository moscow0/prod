"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.documentsReducer = void 0;var _immutable = _interopRequireDefault(require("immutable"));

var types = _interopRequireWildcard(require("../actions/actionTypes"));
var uploadTypes = _interopRequireWildcard(require("../../Uploads/actions/actionTypes"));
var attachmentTypes = _interopRequireWildcard(require("../../Attachments/actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const initialState = { rows: [], totalRows: 0 };

const getBySharedId = (state, action) => {
  const docIndex = state.get('rows').findIndex((_doc) => _doc.get('sharedId') === action.entity);
  const doc = state.get('rows').get(docIndex).toJS();
  return { docIndex, doc };
};

const getFilterByObjectWithId = (itemToSearch) => (candidateItem) =>
candidateItem.get('_id') === itemToSearch._id;

const getFilterBySharedId = (sharedIdToSearch) => (candidateItem) =>
candidateItem.get('sharedId') === sharedIdToSearch;

const removeDocuments = (items, currentState, getFilter, updateTotalRows = false) =>
items.reduce((_state, item) => {
  const docIndex = _state.get('rows').findIndex(getFilter(item));

  if (docIndex >= 0) {
    const newState = _state.deleteIn(['rows', docIndex]);
    if (!updateTotalRows) {
      return newState;
    }
    return newState.set('totalRows', newState.get('totalRows') - 1);
  }
  return _state;
}, currentState);

// eslint-disable-next-line max-statements
const documentsReducer = (state = initialState, action = {}) => {
  let docIndex = 0;
  let doc;
  let file;

  switch (action.type) {
    case types.SET_DOCUMENTS:
      return _immutable.default.fromJS(action.documents);

    case types.UNSET_DOCUMENTS:
      return _immutable.default.fromJS(initialState);

    case types.ADD_DOCUMENTS:
      return state.
      setIn(['rows'], state.get('rows').concat(_immutable.default.fromJS(action.documents.rows))).
      setIn(['totalRows'], action.documents.totalRows);

    case types.UPDATE_DOCUMENT:
      docIndex = state.get('rows').findIndex((_doc) => _doc.get('_id') === action.doc._id);
      return state.setIn(['rows', docIndex], _immutable.default.fromJS(action.doc));

    case types.UPDATE_DOCUMENTS:
      return action.docs.reduce((_state, document) => {
        const index = state.get('rows').findIndex((_doc) => _doc.get('_id') === document._id);
        return _state.setIn(['rows', index], _immutable.default.fromJS(document));
      }, state);

    case types.UPDATE_DOCUMENTS_PUBLISHED:
      return action.sharedIds.reduce((_state, sharedId) => {
        const index = state.get('rows').findIndex((_doc) => _doc.get('sharedId') === sharedId);
        return _state.setIn(['rows', index, 'published'], action.published);
      }, state);

    case types.ELEMENT_CREATED:
      return state.update('rows', (rows) => rows.insert(0, _immutable.default.fromJS(action.doc)));

    case types.REMOVE_DOCUMENT:
      docIndex = state.get('rows').findIndex((_doc) => _doc.get('_id') === action.doc._id);
      if (docIndex >= 0) {
        return state.deleteIn(['rows', docIndex]);
      }
      return state;

    case types.REMOVE_DOCUMENTS:
      return removeDocuments(action.docs, state, getFilterByObjectWithId);

    case types.REMOVE_DOCUMENTS_SHAREDIDS:
      return removeDocuments(action.sharedIds, state, getFilterBySharedId, true);

    case uploadTypes.UPLOAD_COMPLETE:
      docIndex = state.get('rows').findIndex((_doc) => _doc.get('sharedId') === action.doc);
      if (docIndex >= 0) {
        doc = state.get('rows').get(docIndex).toJS();
        doc.documents.push(action.file);
        return state.setIn(['rows', docIndex], _immutable.default.fromJS(doc));
      }
      break;

    case uploadTypes.UPLOADS_COMPLETE:
      docIndex = state.get('rows').findIndex((_doc) => _doc.get('sharedId') === action.doc);
      if (docIndex >= 0) {
        doc = state.get('rows').get(docIndex).toJS();
        return state.setIn(
        ['rows', docIndex],
        _immutable.default.fromJS(_objectSpread(_objectSpread({}, doc), {}, { documents: action.files })));

      }
      break;

    case attachmentTypes.ATTACHMENT_COMPLETE:
      ({ docIndex, doc } = getBySharedId(state, action));
      doc.attachments.push(action.file);
      return state.setIn(['rows', docIndex], _immutable.default.fromJS(doc));

    case attachmentTypes.ATTACHMENT_DELETED:
      ({ docIndex, doc } = getBySharedId(state, action));
      doc.attachments = doc.attachments.filter((att) => att._id !== action.file._id);
      return state.setIn(['rows', docIndex], _immutable.default.fromJS(doc));

    case attachmentTypes.ATTACHMENT_RENAMED:
      ({ docIndex, doc } = getBySharedId(state, action));
      [file] = doc.attachments.filter((att) => att._id === action.file._id);
      file.originalname = action.file.originalname;
      return state.setIn(['rows', docIndex], _immutable.default.fromJS(doc));

    default:
      break;}


  return _immutable.default.fromJS(state);
};exports.documentsReducer = documentsReducer;