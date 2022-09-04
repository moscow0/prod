"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.saveEntity = void 0;var _lodash = require("lodash");
var _entities = _interopRequireDefault(require("./entities"));


var _managerFunctions = require("./managerFunctions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const saveEntity = async (
_entity,
{
  user,
  language,
  files: reqFiles,
  socketEmiter }) =>

{
  const { attachments, documents } = (reqFiles || []).reduce(
  (acum, file) => (0, _lodash.set)(acum, file.fieldname, file),
  {
    attachments: [],
    documents: [] });



  const entity = (0, _managerFunctions.handleAttachmentInMetadataProperties)(_entity, attachments);

  const updatedEntity = await _entities.default.save(
  entity,
  { user, language },
  { includeDocuments: false });


  const { proccessedAttachments, proccessedDocuments } = await (0, _managerFunctions.processFiles)(
  entity,
  updatedEntity,
  attachments,
  documents);


  const fileSaveErrors = await (0, _managerFunctions.saveFiles)(
  proccessedAttachments,
  proccessedDocuments,
  updatedEntity,
  socketEmiter);


  const [entityWithAttachments] =
  await _entities.default.getUnrestrictedWithDocuments(
  {
    sharedId: updatedEntity.sharedId,
    language: updatedEntity.language },

  '+permissions');


  return { entity: entityWithAttachments, errors: fileSaveErrors };
};exports.saveEntity = saveEntity;