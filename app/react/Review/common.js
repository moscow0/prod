"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.selectOneUpState = exports.selectMlThesauri = exports.selectIsPristine = exports.selectEntity = void 0;var _reselect = require("reselect");


const selectEntity = (0, _reselect.createSelector)(
(state) => state.entityView.entity,
(entity) => entity === null || entity === void 0 ? void 0 : entity.toJS());exports.selectEntity = selectEntity;


const selectOneUpState = (0, _reselect.createSelector)(
(state) => state.oneUpReview.state,
(state) => state === null || state === void 0 ? void 0 : state.toJS());exports.selectOneUpState = selectOneUpState;


const selectMlThesauri = (0, _reselect.createSelector)(
(state) => state.thesauris,
(thesauri) =>
thesauri.
filter((thes) => !!thes.get('enable_classification')).
map((thes) => {var _get$toString, _get;return (_get$toString = (_get = thes.get('_id')) === null || _get === void 0 ? void 0 : _get.toString()) !== null && _get$toString !== void 0 ? _get$toString : '';}).
toJS());exports.selectMlThesauri = selectMlThesauri;


const selectIsPristine = (0, _reselect.createSelector)(
(state) => state.entityView.entityFormState.$form.pristine,
(value) => value);exports.selectIsPristine = selectIsPristine;