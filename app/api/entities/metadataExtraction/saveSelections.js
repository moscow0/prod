"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.saveSelections = void 0;var _files = require("../../files");
var _lodash = require("lodash");








const updateSelections = (
newSelections,
storedSelections) =>
{
  const merged = newSelections.concat(storedSelections);
  const selections = (0, _lodash.uniqBy)(merged, 'name');
  return selections;
};

const prepareSelections = (entity, file) => {var _entity$__extractedMe;
  let selections = ((_entity$__extractedMe = entity.__extractedMetadata) === null || _entity$__extractedMe === void 0 ? void 0 : _entity$__extractedMe.selections) || [];

  if (file.extractedMetadata) {
    selections = updateSelections(selections, file.extractedMetadata).filter(
    (selection) => !selection.deleteSelection);

  }

  return selections;
};

const selectionsHaveChanged = (
fileExtractedMetadata,
selections) =>
{
  if (fileExtractedMetadata.length === selections.length) {
    const hasChanges = fileExtractedMetadata.filter(
    (extractedData, index) => {var _extractedData$select, _selections$index$sel;return ((_extractedData$select = extractedData.selection) === null || _extractedData$select === void 0 ? void 0 : _extractedData$select.text) !== ((_selections$index$sel = selections[index].selection) === null || _selections$index$sel === void 0 ? void 0 : _selections$index$sel.text);});

    return hasChanges.length > 0;
  }
  return true;
};

const saveSelections = async (entity) => {var _entity$__extractedMe2;
  let mainDocument = [];

  if ((_entity$__extractedMe2 = entity.__extractedMetadata) !== null && _entity$__extractedMe2 !== void 0 && _entity$__extractedMe2.fileID) {
    mainDocument = await _files.files.get({
      _id: entity.__extractedMetadata.fileID });

  }

  if (mainDocument.length > 0) {
    const selections = prepareSelections(entity, mainDocument[0]);

    if (selectionsHaveChanged(mainDocument[0].extractedMetadata || [], selections)) {
      return _files.files.save({ _id: mainDocument[0]._id, extractedMetadata: selections });
    }
  }

  return null;
};exports.saveSelections = saveSelections;