"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.addEntity = addEntity;exports.addHub = addHub;exports.edit = edit;exports.immidiateSearch = immidiateSearch;exports.moveEntities = moveEntities;exports.parseResults = parseResults;exports.reloadRelationships = reloadRelationships;exports.saveRelationships = saveRelationships;exports.search = search;exports.selectConnection = selectConnection;exports.selectRelationTypes = void 0;exports.setAddToData = setAddToData;exports.toggelRemoveLeftRelationship = toggelRemoveLeftRelationship;exports.toggleMoveEntity = toggleMoveEntity;exports.toggleRemoveEntity = toggleRemoveEntity;exports.toggleRemoveRightRelationshipGroup = toggleRemoveRightRelationshipGroup;exports.unselectConnection = unselectConnection;exports.updateLeftRelationshipType = updateLeftRelationshipType;exports.updateRelationshipEntityData = updateRelationshipEntityData;exports.updateRightRelationshipType = updateRightRelationshipType;var _api = _interopRequireDefault(require("../../utils/api"));
var _BasicReducer = require("../../BasicReducer");
var _debounce = _interopRequireDefault(require("../../utils/debounce"));
var _reselect = require("reselect");
var _Notifications = require("../../Notifications");
var _Viewer = require("../../Viewer");
var _RequestParams = require("../../utils/RequestParams");
var _SearchAPI = _interopRequireDefault(require("../../Search/SearchAPI"));
var _I18N = require("../../I18N");
var _EntitiesAPI = _interopRequireDefault(require("../../Entities/EntitiesAPI"));
var types = _interopRequireWildcard(require("./actionTypes"));
var uiActions = _interopRequireWildcard(require("./uiActions"));
var routeUtils = _interopRequireWildcard(require("../utils/routeUtils"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function parseResults(results, parentEntity, editing) {
  return { type: types.PARSE_RELATIONSHIPS_RESULTS, results, parentEntity, editing };
}

function edit(value, results, parentEntity) {
  return { type: types.EDIT_RELATIONSHIPS, value, results, parentEntity, editing: value };
}

function addHub() {
  return { type: types.ADD_RELATIONSHIPS_HUB };
}

function toggelRemoveLeftRelationship(index) {
  return { type: types.TOGGLE_REMOVE_RELATIONSHIPS_LEFT, index };
}

function toggleRemoveRightRelationshipGroup(index, rightIndex) {
  return { type: types.TOGGLE_REMOVE_RELATIONSHIPS_RIGHT_GROUP, index, rightIndex };
}

function updateLeftRelationshipType(index, _id) {
  return { type: types.UPDATE_RELATIONSHIPS_LEFT_TYPE, index, _id };
}

function setAddToData(index, rightIndex) {
  return { type: types.SET_RELATIONSHIPS_ADD_TO_DATA, index, rightIndex };
}

function updateRelationshipEntityData(entity) {
  return { type: types.UPDATE_RELATIONSHIP_ENTITY_DATA, entity };
}

function updateRightRelationshipType(index, rightIndex, _id) {
  return (dispatch, getState) => {
    const { hubs } = getState().relationships;
    const newRightRelationshipType =
    rightIndex === hubs.getIn([index, 'rightRelationships']).size - 1;

    dispatch({
      type: types.UPDATE_RELATIONSHIPS_RIGHT_TYPE,
      index,
      rightIndex,
      _id,
      newRightRelationshipType });


    if (newRightRelationshipType) {
      dispatch(setAddToData(index, rightIndex));
      dispatch(uiActions.openPanel());
    }
  };
}

function addEntity(index, rightIndex, entity, errors = []) {
  return (dispatch) => {
    const title = entity.title.length > 75 ? `${entity.title.slice(0, 75)}(...)` : entity.title;
    let message = `${title} added to hub`;
    if (errors.length) {
      message = `${message} with the following errors: ${JSON.stringify(errors, null)}`;
    }
    dispatch(
    _Notifications.notificationActions.notify(
    `${message}. Save your work to make change permanent.`,
    errors.length ? 'warning' : 'success'));


    dispatch({ type: types.ADD_RELATIONSHIPS_ENTITY, index, rightIndex, entity });
  };
}

function toggleRemoveEntity(index, rightIndex, relationshipIndex) {
  return { type: types.TOGGLE_REMOVE_RELATIONSHIPS_ENTITY, index, rightIndex, relationshipIndex };
}

function toggleMoveEntity(index, rightIndex, relationshipIndex) {
  return { type: types.TOGGLE_MOVE_RELATIONSHIPS_ENTITY, index, rightIndex, relationshipIndex };
}

function moveEntities(index, rightRelationshipIndex) {
  return { type: types.MOVE_RELATIONSHIPS_ENTITY, index, rightRelationshipIndex };
}

function reloadRelationships(sharedId) {
  return (dispatch, getState) =>
  routeUtils.
  requestState(new _RequestParams.RequestParams({ sharedId }), getState()).
  then(([connectionsGroups, searchResults]) => {
    dispatch(_BasicReducer.actions.set('relationships/list/connectionsGroups', connectionsGroups));
    dispatch(_BasicReducer.actions.set('relationships/list/searchResults', searchResults));
  });
}

function saveRelationships() {
  return (dispatch, getState) => {
    dispatch({ type: types.SAVING_RELATIONSHIPS });
    const parentEntityId = getState().relationships.list.sharedId;
    const hubs = getState().relationships.hubs.toJS();

    const apiCall = hubs.reduce(
    (apiActions, hubData) => {
      if (!hubData.hub && !hubData.deleted) {
        const leftRelationship = _objectSpread({ entity: parentEntityId }, hubData.leftRelationship);
        const rightRelationships = hubData.rightRelationships.reduce(
        (relationships, rightGroup) => {
          if (!rightGroup.deleted) {
            const newRelationships = rightGroup.relationships.filter((r) => !r.deleted);

            return relationships.concat(newRelationships);
          }
          return relationships;
        },
        []);

        const fullHubData = [leftRelationship].concat(rightRelationships);
        apiActions.save.push(fullHubData);
      }

      if (hubData.hub) {
        if (hubData.deleted) {
          apiActions.delete.push({ _id: hubData.leftRelationship._id, entity: parentEntityId });
        }

        if (hubData.modified && !hubData.deleted) {
          apiActions.save.push(_objectSpread({
            entity: parentEntityId,
            hub: hubData.hub },
          hubData.leftRelationship));

        }

        hubData.rightRelationships.forEach((rightGroup) => {
          rightGroup.relationships.forEach((r) => {
            const deleted = rightGroup.deleted || r.deleted || r.moved;

            if (deleted && r._id) {
              apiActions.delete.push({ _id: r._id, entity: r.entity });
            }

            const toSave = rightGroup.modified || !r._id;
            if (toSave && !deleted) {
              apiActions.save.push(
              Object.assign(r, {
                entity: r.entity,
                hub: hubData.hub,
                template: rightGroup.template }));


            }
          });
        });
      }
      return apiActions;
    },
    { save: [], delete: [] });


    return _api.default.
    post('relationships/bulk', new _RequestParams.RequestParams(apiCall)).
    then((response) =>
    Promise.all([
    response,
    _EntitiesAPI.default.get(new _RequestParams.RequestParams({ sharedId: parentEntityId })).then(([r]) => r),
    reloadRelationships(parentEntityId)(dispatch, getState)])).


    then(([response, parentEntity]) => {
      dispatch(_BasicReducer.actions.set('entityView/entity', parentEntity));
      dispatch(_BasicReducer.actions.set('viewer/doc', parentEntity));

      dispatch(uiActions.closePanel());
      dispatch(
      edit(
      false,
      getState().relationships.list.searchResults,
      getState().relationships.list.entity));


      dispatch(_Viewer.referencesActions.loadReferences(parentEntityId));
      dispatch({ type: types.SAVED_RELATIONSHIPS, response });
      dispatch(_Notifications.notificationActions.notify('Relationships saved', 'success'));
    }).
    catch((e) => {
      dispatch({ type: types.SAVED_RELATIONSHIPS, e });
    });
  };
}

function immidiateSearch(dispatch, searchTerm) {
  dispatch(uiActions.searching());

  const requestParams = new _RequestParams.RequestParams({
    searchTerm,
    fields: ['title'],
    includeUnpublished: true });


  return _SearchAPI.default.search(requestParams).then(({ rows: results }) => {
    dispatch(_BasicReducer.actions.set('relationships/searchResults', results));
  });
}

const debouncedSearch = (0, _debounce.default)(immidiateSearch, 400);

const selectRelationTypes = (0, _reselect.createSelector)(
(state) => state.translations,
(state) => state.relationTypes,
(state) => state.locale,
(translations, relationTypes, locale) => {
  const translationContexts = translations.find(
  (translation) => translation.get('locale') === locale);

  const relations = relationTypes.toJS().map((rel) => {
    const [translationContext] = translationContexts.
    get('contexts').
    filter((context) => context.get('id') === rel._id);
    const name = translationContext ?
    (0, _I18N.t)(translationContext.get('id'), rel.name, null, false) :
    rel.name;
    return _objectSpread(_objectSpread({},
    rel), {}, {
      name });

  });
  return [{ _id: null, name: (0, _I18N.t)('System', 'No Label', null, false) }].concat(relations);
});exports.selectRelationTypes = selectRelationTypes;


function search(searchTerm) {
  return (dispatch) => {
    dispatch(_BasicReducer.actions.set('relationships/searchTerm', searchTerm));
    return debouncedSearch(dispatch, searchTerm);
  };
}

function selectConnection(connection) {
  return _BasicReducer.actions.set('relationships/connection', connection);
}

function unselectConnection() {
  return _BasicReducer.actions.set('relationships/connection', {});
}