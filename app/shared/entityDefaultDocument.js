"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.entityDefaultDocument = void 0;
var _languagesList = require("./languagesList");

const entityDefaultDocument = (
entityDocuments,
entityLanguage,
defaultLanguage) =>
{
  const documents = entityDocuments || [];
  const documentMatchingEntity = documents.find(
  (document) =>
  document.language && (0, _languagesList.language)(document.language, 'ISO639_1') === entityLanguage);


  const documentMatchingDefault = documents.find(
  (document) =>
  document.language && (0, _languagesList.language)(document.language, 'ISO639_1') === defaultLanguage);


  return documentMatchingEntity || documentMatchingDefault || documents[0];
};exports.entityDefaultDocument = entityDefaultDocument;