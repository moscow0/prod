"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = ui;var _immutable = _interopRequireDefault(require("immutable"));

var types = _interopRequireWildcard(require("../actions/actionTypes"));
var uploadTypes = _interopRequireWildcard(require("../../Uploads/actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const initialState = _immutable.default.fromJS({
  searchTerm: '',
  previewDoc: '',
  suggestions: [],
  selectedDocuments: [],
  filtersPanel: false,
  zoomLevel: 0,
  tableViewColumns: [] });


function ui(state = initialState, action = {}) {
  if (action.type === types.SET_SEARCHTERM) {
    let newState = state.set('searchTerm', action.searchTerm);
    if (!action.searchTerm) {
      newState = newState.set('suggestions', []);
    }
    return newState;
  }

  if (action.type === types.SELECT_DOCUMENT) {
    const alreadySelected = state.
    get('selectedDocuments').
    filter((doc) => doc.get('_id') === action.doc._id).size;
    if (!alreadySelected) {
      return state.update('selectedDocuments', (selectedDocuments) =>
      selectedDocuments.push(_immutable.default.fromJS(action.doc)));

    }

    return state;
  }

  if (action.type === types.SELECT_SINGLE_DOCUMENT) {
    const doc = _immutable.default.fromJS(action.doc);
    return state.update('selectedDocuments', () => _immutable.default.fromJS([doc]));
  }

  if (action.type === uploadTypes.UPLOAD_COMPLETE) {
    const docIndex = state.
    get('selectedDocuments').
    findIndex((doc) => doc.get('sharedId') === action.doc);

    if (docIndex >= 0) {
      const doc = state.get('selectedDocuments').get(docIndex).toJS();
      doc.documents.push(action.file);

      return state.setIn(['selectedDocuments', docIndex], _immutable.default.fromJS(doc));
    }
  }

  if (action.type === uploadTypes.UPLOADS_COMPLETE) {
    const docIndex = state.
    get('selectedDocuments').
    findIndex((doc) => doc.get('sharedId') === action.doc);

    if (docIndex >= 0) {
      const doc = state.get('selectedDocuments').get(docIndex).toJS();
      return state.setIn(
      ['selectedDocuments', docIndex],
      _immutable.default.fromJS(_objectSpread(_objectSpread({}, doc), {}, { documents: action.files })));

    }
  }

  if (action.type === types.SELECT_DOCUMENTS) {
    return action.docs.reduce((_state, doc) => {
      const alreadySelected = _state.
      get('selectedDocuments').
      filter((_doc) => _doc.get('_id') === doc._id).size;
      if (!alreadySelected) {
        return _state.update('selectedDocuments', (selectedDocuments) =>
        selectedDocuments.push(_immutable.default.fromJS(doc)));

      }
      return _state;
    }, state);
  }

  if (action.type === types.UNSELECT_DOCUMENT) {
    return state.update('selectedDocuments', (selectedDocuments) =>
    selectedDocuments.filter((doc) => doc.get('_id') !== action.docId));

  }

  if (action.type === types.UNSELECT_ALL_DOCUMENTS) {
    return state.set('selectedDocuments', _immutable.default.fromJS([]));
  }

  if (action.type === types.UPDATE_SELECTED_ENTITIES) {
    return state.set('selectedDocuments', action.entities);
  }

  if (action.type === types.HIDE_FILTERS) {
    return state.set('filtersPanel', false);
  }

  if (action.type === types.SHOW_FILTERS) {
    return state.set('filtersPanel', true);
  }

  if (action.type === types.SET_PREVIEW_DOC) {
    return state.set('previewDoc', action.docId);
  }

  if (action.type === types.SET_SUGGESTIONS) {
    return state.set('suggestions', _immutable.default.fromJS(action.suggestions));
  }

  if (action.type === types.SHOW_SUGGESTIONS) {
    return state.set('showSuggestions', true);
  }

  if (action.type === types.HIDE_SUGGESTIONS) {
    return state.set('showSuggestions', false);
  }

  if (action.type === types.OVER_SUGGESTIONS) {
    return state.set('overSuggestions', action.hover);
  }

  if (action.type === types.ZOOM_IN) {
    const maxLevel = 3;
    return state.set('zoomLevel', Math.min(state.get('zoomLevel') + 1, maxLevel));
  }

  if (action.type === types.ZOOM_OUT) {
    const minLevel = -3;
    return state.set('zoomLevel', Math.max(state.get('zoomLevel') - 1, minLevel));
  }

  if (action.type === types.SET_TABLE_VIEW_COLUMNS) {
    if (action.columns.length === 0) {
      return state;
    }
    const columnsWithSelection = action.columns.map((column) => {
      const previousColumnState = state.
      get('tableViewColumns').
      find((c) => c.get('name') === column.name);

      const previousHidden =
      previousColumnState && previousColumnState.has('hidden') ?
      previousColumnState.get('hidden') :
      column.hidden;
      const hidden = previousHidden !== undefined ? previousHidden : !column.showInCard;

      return Object.assign(column, { hidden });
    });

    return state.set('tableViewColumns', _immutable.default.fromJS(columnsWithSelection));
  }

  if (action.type === types.SET_TABLE_VIEW_COLUMN_HIDDEN) {
    const index = state.get('tableViewColumns').findIndex((c) => c.get('name') === action.name);
    return state.setIn(['tableViewColumns', index, 'hidden'], action.hidden);
  }

  if (action.type === types.SET_TABLE_VIEW_ALL_COLUMNS_HIDDEN) {
    return state.update('tableViewColumns', (columns) =>
    columns.map((c, index) => index ? c.set('hidden', action.hidden) : c));

  }

  return _immutable.default.fromJS(state);
}