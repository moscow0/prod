"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = translate;exports.getContext = getContext;exports.getLocaleTranslation = getLocaleTranslation; /** @format */

function getLocaleTranslation(translations, locale) {
  return translations.find((d) => d.locale === locale) || { contexts: [] };
}

function getContext(translation, contextId = '') {
  return (
    translation.contexts.find((ctx) => ctx.id.toString() === contextId.toString()) || { values: {} });

}

function translate(context, key, text) {
  return context.values[key] || text;
}