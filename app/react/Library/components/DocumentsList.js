"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.clickOnDocument = clickOnDocument;exports.default = void 0;exports.mapStateToProps = mapStateToProps;exports.selectAllDocuments = selectAllDocuments;var _reactRedux = require("react-redux");
var _redux = require("redux");
var _Multireducer = require("../../Multireducer");
var _BasicReducer = require("../../BasicReducer");

var _libraryActions = require("../actions/libraryActions");







var _DocumentsList = _interopRequireDefault(require("../../Layout/DocumentsList"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function clickOnDocument(e, doc, active) {
  const specialkeyPressed = e.metaKey || e.ctrlKey || e.shiftKey;

  if (!specialkeyPressed) {
    this.props.unselectAllDocuments();
  }

  if (active && !specialkeyPressed) {
    return this.props.selectDocument(doc);
  }

  if (active) {
    return this.props.unselectDocument(doc.get('_id'));
  }

  if (!active && e.shiftKey) {
    const lastSelectedDocument = this.props.selectedDocuments.last();
    const docs = this.props.documents.get('rows');
    const startIndex = docs.reduce((result, _doc, index) => {
      if (_doc.get('_id') === lastSelectedDocument.get('_id')) {
        return index;
      }
      return result;
    }, -1);

    const endIndex = docs.reduce((result, _doc, index) => {
      if (_doc.get('_id') === doc.get('_id')) {
        return index;
      }
      return result;
    }, -1);

    let docsToSelect = docs.slice(startIndex, endIndex + 1);
    if (endIndex < startIndex) {
      docsToSelect = docs.slice(endIndex, startIndex + 1);
    }
    return this.props.selectDocuments(docsToSelect.toJS());
  }

  return this.props.selectDocument(doc);
}

function selectAllDocuments() {
  const docs = this.props.documents.get('rows');
  return this.props.selectDocuments(docs.toJS());
}

function mapStateToProps(state, props) {
  return {
    documents: state[props.storeKey].documents,
    filters: state[props.storeKey].filters,
    filtersPanel: state[props.storeKey].ui.get('filtersPanel'),
    search: state[props.storeKey].search,
    selectedDocuments: state[props.storeKey].ui.get('selectedDocuments'),
    multipleSelected: state[props.storeKey].ui.get('selectedDocuments').size > 1,
    rowListZoomLevel: state[props.storeKey].ui.get('zoomLevel'),
    clickOnDocument,
    selectAllDocuments };

}

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)(
  {
    loadMoreDocuments: _libraryActions.loadMoreDocuments,
    searchDocuments: _libraryActions.searchDocuments,
    selectDocument: _libraryActions.selectDocument,
    selectDocuments: _libraryActions.selectDocuments,
    unselectDocument: _libraryActions.unselectDocument,
    unselectAllDocuments: _libraryActions.unselectAllDocuments,
    onSnippetClick: () => _BasicReducer.actions.set(`${props.storeKey}.sidepanel.tab`, 'text-search') },

  (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_DocumentsList.default);exports.default = _default;