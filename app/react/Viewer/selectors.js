"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.selectTargetReferences = exports.selectTargetDoc = exports.selectReferences = exports.selectDoc = exports.parseReferences = void 0;var _reselect = require("reselect");
var _immutable = require("immutable");

const documentViewer = (s) => s.documentViewer;

function isRelationshipAReference(doc, reference) {
  return (
    reference.get('entity') === doc.get('sharedId') &&
    typeof reference.getIn(['reference', 'text']) !== 'undefined');

}

const parseReferences = (doc, refs) => {
  const textReferences = (0, _immutable.Set)(refs.filter((r) => isRelationshipAReference(doc, r)));
  //select basereferences
  const hubIdToBaseReference = new Map();
  textReferences.forEach((tr) => {
    const hubId = tr.get('hub');
    if (!hubIdToBaseReference.has(hubId)) {
      hubIdToBaseReference.set(hubId, tr);
    }
  });
  // collect baseref copies with associatedRelationships
  const hubIdToRelationships = new Map();
  Array.from(hubIdToBaseReference.keys()).forEach((hubId) => {
    hubIdToRelationships.set(hubId, []);
  });
  refs.forEach((r) => {
    const hubId = r.get('hub');
    const baseRef = hubIdToBaseReference.get(hubId);
    if (!textReferences.has(r) && baseRef) {
      hubIdToRelationships.get(hubId).push(baseRef.set('associatedRelationship', r));
    }
  });
  // flatten to immutable list
  const result = (0, _immutable.List)(Array.from(hubIdToRelationships.values())).flatMap((v) => v);
  return result;
};exports.parseReferences = parseReferences;

const selectDoc = (0, _reselect.createSelector)(
(s) => documentViewer(s).doc,
(doc) => doc);exports.selectDoc = selectDoc;

const selectRefs = (0, _reselect.createSelector)(
(s) => documentViewer(s).references,
(references) => references);


const selectReferences = (0, _reselect.createSelector)(selectDoc, selectRefs, parseReferences);exports.selectReferences = selectReferences;

const selectTargetDoc = (0, _reselect.createSelector)(
(s) => documentViewer(s).targetDoc,
(doc) => doc);exports.selectTargetDoc = selectTargetDoc;


const selectTargetRefs = (0, _reselect.createSelector)(
(s) => documentViewer(s).targetDocReferences,
(references) => references);


const selectTargetReferences = (0, _reselect.createSelector)(selectTargetDoc, selectTargetRefs, parseReferences);exports.selectTargetReferences = selectTargetReferences;