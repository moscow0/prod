"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.exportDocuments = exportDocuments;exports.exportEnd = exportEnd;exports.triggerLocalDownload = triggerLocalDownload;var _superagent = _interopRequireDefault(require("superagent"));
var _JSONRequest = require("../../../shared/JSONRequest");
var _BasicReducer = require("../../BasicReducer");
var _notificationsActions = require("../../Notifications/actions/notificationsActions");
var _I18N = require("../../I18N");




var _libraryActions = require("./libraryActions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


function triggerLocalDownload(content, fileName) {
  const url = window.URL.createObjectURL(new Blob([content]));
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function clearState(dispatch) {
  dispatch(_BasicReducer.actions.set('exportSearchResultsProcessing', false));
  dispatch(_BasicReducer.actions.set('exportSearchResultsContent', ''));
  dispatch(_BasicReducer.actions.set('exportSearchResultsFileName', ''));
}

function exportEnd() {
  return (dispatch, getState) => {
    const { exportSearchResultsContent, exportSearchResultsFileName } =
    getState().exportSearchResults;

    triggerLocalDownload(exportSearchResultsContent, exportSearchResultsFileName);

    clearState(dispatch);
  };
}

function extractFileName(contentDisposition) {
  const startIndex = contentDisposition.indexOf('filename="') + 10;
  const endIndex = contentDisposition.length - 1;
  return contentDisposition.substring(startIndex, endIndex);
}

const requestHandler = (params, dispatch, captcha) => {
  let request = _superagent.default.
  get(`/api/export${(0, _JSONRequest.toUrlParams)(params)}`).
  set('Accept', 'text/csv').
  set('X-Requested-With', 'XMLHttpRequest');

  if (captcha) {
    request = request.set('Captcha-text', captcha.text).set('Captcha-id', captcha.id);
  }

  request.
  then((response) => {
    const fileName = extractFileName(response.header['content-disposition']);
    dispatch(_BasicReducer.actions.set('exportSearchResultsContent', response.text));
    dispatch(_BasicReducer.actions.set('exportSearchResultsFileName', fileName));
    dispatch(exportEnd());
  }).
  catch((err) => {
    clearState(dispatch);
    if (err.status === 403) {
      dispatch((0, _notificationsActions.notify)((0, _I18N.t)('System', 'Invalid captcha'), 'danger'));
    } else {
      dispatch((0, _notificationsActions.notify)((0, _I18N.t)('System', 'An error has occured during data export'), 'danger'));
    }
    return err;
  });
};

function exportDocuments(storeKey, captcha) {
  return async (dispatch, getState) => {
    const state = getState()[storeKey];
    const { search, filters } = state;
    const exportFilters = filters.toJS();

    const finalSearchParams = (0, _libraryActions.processFilters)(search, exportFilters, 10000);
    finalSearchParams.searchTerm = state.search.searchTerm;

    if (state.ui.get('selectedDocuments').size) {
      finalSearchParams.ids = state.ui.
      get('selectedDocuments').
      map((entity) => entity.get('sharedId'));
    }

    if (storeKey === 'uploads') finalSearchParams.unpublished = true;

    dispatch(_BasicReducer.actions.set('exportSearchResultsProcessing', true));

    requestHandler(finalSearchParams, dispatch, captcha);
  };
}