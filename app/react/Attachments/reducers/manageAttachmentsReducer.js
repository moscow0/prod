"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.manageAttachmentsReducer = void 0;var _immutable = require("immutable");
var attachmentsTypes = _interopRequireWildcard(require("../actions/actionTypes"));
var uploadTypes = _interopRequireWildcard(require("../../Uploads/actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const getId = (state, setInArray) => state.getIn(setInArray.concat(['_id']));
const getSharedId = (state, setInArray) => state.getIn(setInArray.concat(['sharedId']));

const getAttachments = (state, setInArray) =>
state.getIn(setInArray.concat(['attachments'])) || (0, _immutable.fromJS)([]);

const getDocuments = (state, setInArray) =>
state.getIn(setInArray.concat(['documents'])) || (0, _immutable.fromJS)([]);

const manageAttachmentsReducer =
(originalReducer, { useDefaults = true, setInArray = [] } = {}) =>
(orignialState, originalAction) => {
  let state = orignialState;
  const action = originalAction || {};

  if (useDefaults) {
    state = orignialState || {};
  }

  if (
  action.type === uploadTypes.UPLOAD_COMPLETE &&
  getSharedId(state, setInArray) === action.doc)
  {
    const documents = getDocuments(state, setInArray);
    return state.setIn(setInArray.concat(['documents']), documents.push((0, _immutable.fromJS)(action.file)));
  }

  if (
  action.type === attachmentsTypes.ATTACHMENT_COMPLETE &&
  getSharedId(state, setInArray) === action.entity)
  {
    const attachments = getAttachments(state, setInArray);
    return state.setIn(
    setInArray.concat(['attachments']),
    attachments.push((0, _immutable.fromJS)(action.file)));

  }

  if (
  action.type === attachmentsTypes.ATTACHMENT_DELETED &&
  getSharedId(state, setInArray) === action.entity)
  {
    const attachments = getAttachments(state, setInArray);
    return state.setIn(
    setInArray.concat(['attachments']),
    attachments.filterNot((a) => a.get('_id') === action.file._id));

  }

  if (
  action.type === attachmentsTypes.ATTACHMENT_RENAMED &&
  getSharedId(state, setInArray) === action.entity)
  {
    if (getId(state, setInArray) === action.file._id) {
      return state.setIn(setInArray.concat(['file']), (0, _immutable.fromJS)(action.file));
    }

    const attachments = getAttachments(state, setInArray);
    return state.setIn(
    setInArray.concat(['attachments']),
    attachments.map((a) => {
      if (a.get('_id') === action.file._id) {
        return a.set('originalname', action.file.originalname);
      }

      return a;
    }));

  }

  return originalReducer(state, action);
};exports.manageAttachmentsReducer = manageAttachmentsReducer;