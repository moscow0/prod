"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = setReduxState;var _Multireducer = require("../../Multireducer");
var _libraryActions = require("../actions/libraryActions");




var _reactReduxForm = require("react-redux-form");
var _BasicReducer = require("../../BasicReducer");

function setReduxState(state, key, addinsteadOfSet) {
  return (_dispatch) => {
    const dispatch = (0, _Multireducer.wrapDispatch)(_dispatch, key);
    dispatch(_reactReduxForm.actions.load(`${key}.search`, state[key].search));

    dispatch(
    (0, _libraryActions.initializeFiltersForm)({
      documentTypes: state[key].filters.documentTypes,
      libraryFilters: state[key].filters.properties,
      aggregations: state[key].aggregations }));



    dispatch(
    addinsteadOfSet ? (0, _libraryActions.addDocuments)(state[key].documents) : (0, _libraryActions.setDocuments)(state[key].documents));


    if (key === 'library') {
      dispatch(_BasicReducer.actions.set('library.markers', state[key].markers));
    }
  };
}