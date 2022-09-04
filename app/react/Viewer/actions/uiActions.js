"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.activateReference = activateReference;exports.closePanel = closePanel;exports.deactivateReference = deactivateReference;exports.goToActive = goToActive;exports.highlightReference = highlightReference;exports.highlightSnippet = highlightSnippet;exports.openPanel = openPanel;exports.resetReferenceCreation = resetReferenceCreation;exports.scrollTo = scrollTo;exports.scrollToActive = scrollToActive;exports.scrollToPage = scrollToPage;exports.scrollToToc = scrollToToc;exports.scrollTomark = scrollTomark;exports.selectReference = selectReference;exports.selectSnippet = selectSnippet;exports.selectTargetDocument = selectTargetDocument;var _BasicReducer = require("../../BasicReducer");
var _utils = require("../../utils");
var _selectionActions = require("./selectionActions");
var _Marker = _interopRequireDefault(require("../utils/Marker.js"));
var _Scroller = _interopRequireDefault(require("../utils/Scroller"));
var types = _interopRequireWildcard(require("./actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function closePanel() {
  return {
    type: types.CLOSE_PANEL };

}

function openPanel(panel) {
  return {
    type: types.OPEN_PANEL,
    panel };

}

function resetReferenceCreation() {
  return function (dispatch) {
    dispatch({ type: types.RESET_REFERENCE_CREATION });
    dispatch(_BasicReducer.actions.unset('viewer/targetDoc'));
    dispatch(_BasicReducer.actions.unset('viewer/targetDocHTML'));
    dispatch(_BasicReducer.actions.unset('viewer/targetDocReferences'));
  };
}

function selectTargetDocument(id) {
  return {
    type: types.SELECT_TARGET_DOCUMENT,
    id };

}

function highlightReference(reference) {
  return {
    type: types.HIGHLIGHT_REFERENCE,
    reference };

}

function deactivateReference() {
  return {
    type: types.DEACTIVATE_REFERENCE };

}

function goToActive(value = true) {
  return {
    type: types.GO_TO_ACTIVE,
    value };

}

function highlightSnippet(snippet) {
  _Marker.default.init('.document-viewer');
  _Marker.default.unmark();
  const text = snippet.get('text');
  if (!text) {
    return;
  }

  const textToMatcherRegExp = (_text) =>
  _text.
  replace(/…/g, '...').
  replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&').
  replace(/<[^>]*>/g, '').
  replace(/\s+/g, '\\s*').
  replace(/\n/g, '\\s*');

  const rawMatches = text.match(/<b>(.|\n)*?<\/b>/g);
  const matches = rawMatches ? rawMatches.map((m) => m.replace(/<.*?>/g, '')) : [];
  const highlight = textToMatcherRegExp(text);

  const markSearchTerm = () => {
    _Marker.default.init('mark');
    _Marker.default.mark(matches, {
      className: 'searchTerm',
      diacritics: false,
      acrossElements: false,
      separateWordSearch: true,
      accuracy: 'exactly' });

  };

  const tryFuzziMark = (chunkLenght = 20) => {
    if (!chunkLenght) {
      return;
    }
    const startOfText = textToMatcherRegExp(text.substring(0, chunkLenght));
    const endOfText = textToMatcherRegExp(
    text.substring(text.length - chunkLenght - 1, text.length - 1));

    const fuzziText = `${startOfText}.{1,200}${endOfText}`;
    const regexp = new RegExp(fuzziText);
    _Marker.default.markRegExp(regexp, {
      separateWordSearch: false,
      acrossElements: true,
      done: markSearchTerm,
      noMatch: tryFuzziMark.bind(this, chunkLenght - 5) });

  };

  const regexp = new RegExp(highlight);
  _Marker.default.markRegExp(regexp, {
    separateWordSearch: false,
    acrossElements: true,
    done: markSearchTerm,
    noMatch: tryFuzziMark.bind(this, 20) });

}

function scrollToPage(page, duration = 50) {
  _Scroller.default.to(`.document-viewer div#page-${page}`, '.document-viewer', {
    duration,
    dividerOffset: 1,
    offset: 50 });

}

function scrollTomark() {
  _Scroller.default.to('.document-viewer mark', '.document-viewer', { duration: 0 });
}

async function scrollToToc(toc) {
  const { page, top: offset } = toc.selectionRectangles[0];
  await _Scroller.default.to(`.document-viewer div#page-${page}`, '.document-viewer', {
    duration: 1,
    dividerOffset: 1,
    offset,
    force: true });

}

async function scrollTo(connection) {
  const { page } = connection.reference.selectionRectangles[0];
  const offset = -30;

  await _Scroller.default.to(`.document-viewer div#page-${page}`, '.document-viewer', {
    duration: 1,
    dividerOffset: 1 });


  await _Scroller.default.to(
  `.document-viewer [data-id="${connection._id}"] .highlight-rectangle`,
  '.document-viewer',
  {
    duration: 50,
    dividerOffset: 1,
    offset });



  await _Scroller.default.to(
  `.metadata-sidepanel .item-${connection._id}`,
  '.metadata-sidepanel .sidepanel-body',
  {
    duration: 50 });


}

function selectSnippet(page, snippet) {
  scrollToPage(page);
  setTimeout(() => {
    scrollTomark();
  }, 500);
  return (dispatch) => {
    dispatch({ type: types.SELECT_SNIPPET, snippet });
  };
}

function activateReference(connection, tab, delayActivation = false) {
  const tabName = tab && !Array.isArray(tab) ? tab : 'references';
  _utils.events.removeAllListeners('referenceRendered');

  return (dispatch) => {
    dispatch({ type: types.ACTIVE_REFERENCE, reference: connection._id });
    if (delayActivation) {
      dispatch(goToActive());
    }
    dispatch({ type: types.OPEN_PANEL, panel: 'viewMetadataPanel' });
    dispatch(_BasicReducer.actions.set('viewer.sidepanel.tab', tabName));
    if (!delayActivation) {
      setTimeout(() => {
        scrollTo(connection);
      });
    }
  };
}

function scrollToActive(reference, tab, doScroll) {
  return (dispatch) => {
    if (doScroll) {
      dispatch(goToActive(false));
      dispatch(activateReference(reference, tab));
    }
  };
}

function selectReference(connection) {
  return (dispatch) => {
    dispatch(activateReference(connection));
    dispatch((0, _selectionActions.setTargetSelection)(connection.reference));
  };
}