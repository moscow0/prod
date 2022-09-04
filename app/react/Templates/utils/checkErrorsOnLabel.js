"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.checkErrorsOnLabel = void 0;var _reselect = require("reselect");

const checkErrorsOnLabel = (0, _reselect.createSelector)(
(state, props) =>
state.template.formState.$form.errors[`properties.${props.index}.label.required`],
(state, props) =>
state.template.formState.$form.errors[`properties.${props.index}.label.duplicated`],
(required, duplicated) => required || duplicated);exports.checkErrorsOnLabel = checkErrorsOnLabel;