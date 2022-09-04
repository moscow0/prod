"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.DocumentForm = void 0;exports.mapDispatchToProps = mapDispatchToProps;var _reactRedux = require("react-redux");
var _redux = require("redux");
var _Metadata = require("../../Metadata");
var _Relationships = require("../../Relationships");
var _documentActions = require("../actions/documentActions");

function mapStateToProps({ documentViewer, templates, thesauris }) {
  return {
    model: 'documentViewer.sidepanel.metadata',
    isEntity: !documentViewer.sidepanel.file,
    templateId: documentViewer.sidepanel.metadata.template,
    templates,
    thesauris };

}

function mapDispatchToProps(dispatch, ownProps) {
  const { fileID, onEntitySave = () => {} } = ownProps;
  return (0, _redux.bindActionCreators)(
  {
    changeTemplate: _Metadata.actions.changeTemplate,
    onSubmit: (doc) => async (disp, state) => {
      const updateDoc = await (0, _documentActions.saveDocument)(doc, fileID)(disp, state);
      disp(_Relationships.actions.reloadRelationships(doc.sharedId));
      onEntitySave(updateDoc);
    } },

  dispatch);

}
const connected = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Metadata.MetadataForm);exports.DocumentForm = connected;