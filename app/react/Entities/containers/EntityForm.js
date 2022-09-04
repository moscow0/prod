"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.mapDispatchToProps = mapDispatchToProps;var _reactRedux = require("react-redux");
var _redux = require("redux");

var _actions = require("../actions/actions");
var _Metadata = require("../../Metadata");

function mapStateToProps(state) {
  return {
    model: 'entityView.entityForm',
    templateId: state.entityView.entityForm.template,
    templates: state.templates,
    thesauris: state.thesauris };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    changeTemplate: _Metadata.actions.changeTemplate,
    onSubmit: _actions.saveEntity,
    componentWillUnmount: _actions.resetForm },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Metadata.MetadataForm);exports.default = _default;