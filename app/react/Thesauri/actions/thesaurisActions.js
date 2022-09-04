"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.checkThesaurusCanBeDeleted = checkThesaurusCanBeDeleted;exports.deleteThesaurus = deleteThesaurus;exports.editThesaurus = editThesaurus;exports.reloadThesauri = reloadThesauri;var _BasicReducer = require("../../BasicReducer");
var _TemplatesAPI = _interopRequireDefault(require("../../Templates/TemplatesAPI"));
var _ThesauriAPI = _interopRequireDefault(require("../ThesauriAPI"));
var _RequestParams = require("../../utils/RequestParams");
var _reactReduxForm = require("react-redux-form");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function editThesaurus(thesaurus) {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.reset('thesauri.data'));
    dispatch(_reactReduxForm.actions.load('thesauri.data', thesaurus));
  };
}

function deleteThesaurus(thesaurus) {
  return (dispatch) =>
  _ThesauriAPI.default.delete(new _RequestParams.RequestParams({ _id: thesaurus._id })).then(() => {
    dispatch(_BasicReducer.actions.remove('dictionaries', thesaurus));
  });
}

function checkThesaurusCanBeDeleted(thesaurus) {
  return (dispatch) =>
  _TemplatesAPI.default.countByThesauri(new _RequestParams.RequestParams({ _id: thesaurus._id })).then((count) =>
  count ? Promise.reject() : dispatch);

}

function reloadThesauri() {
  return (dispatch) =>
  _ThesauriAPI.default.get().then((response) => {
    dispatch(_BasicReducer.actions.set('thesauris', response));
  });
}