"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getLabeledValueStage = exports.getFileStage = exports.getEntityStage = exports.getCurrentValueStage = void 0;

const getEntityStage = (languages) => {var _languages$find;
  const defaultLanguage = (_languages$find = languages.find((l) => l.default)) === null || _languages$find === void 0 ? void 0 : _languages$find.key;
  const configuredLanguages = languages.map((l) => l.key);
  return [
  {
    $lookup: {
      from: 'entities',
      let: {
        localFieldEntityId: '$entityId',
        localFieldLanguage: {
          $cond: [
          {
            $not: [{ $in: ['$language', configuredLanguages] }] },

          defaultLanguage,
          '$language'] } },



      pipeline: [
      {
        $match: {
          $expr: {
            $and: [
            { $eq: ['$sharedId', '$$localFieldEntityId'] },
            { $eq: ['$language', '$$localFieldLanguage'] }] } } }],





      as: 'entity' } },


  {
    $addFields: { entity: { $arrayElemAt: ['$entity', 0] } } }];


};exports.getEntityStage = getEntityStage;

const getCurrentValueStage = () => [
{
  $addFields: {
    currentValue: {
      $cond: [
      { $eq: ['$propertyName', 'title'] },
      { v: [{ value: '$entity.title' }] },
      {
        $arrayElemAt: [
        {
          $filter: {
            input: {
              $objectToArray: '$entity.metadata' },

            as: 'property',
            cond: {
              $eq: ['$$property.k', '$propertyName'] } } },



        0] }] } } },






{
  $addFields: {
    currentValue: { $arrayElemAt: ['$currentValue.v', 0] } } },


{
  $addFields: {
    currentValue: { $ifNull: ['$currentValue.value', ''] } } }];exports.getCurrentValueStage = getCurrentValueStage;




const getFileStage = () => [
{
  $lookup: {
    from: 'files',
    let: {
      localFieldFileId: '$fileId' },

    pipeline: [
    {
      $match: {
        $expr: {
          $eq: ['$_id', '$$localFieldFileId'] } } }],




    as: 'file' } },


{
  $addFields: { file: { $arrayElemAt: ['$file', 0] } } }];exports.getFileStage = getFileStage;



const getLabeledValueStage = () => [
{
  $addFields: {
    labeledValue: {
      $arrayElemAt: [
      {
        $filter: {
          input: '$file.extractedMetadata',
          as: 'label',
          cond: {
            $eq: ['$propertyName', '$$label.name'] } } },



      0] } } },




{
  $addFields: {
    labeledValue: '$labeledValue.selection.text' } }];exports.getLabeledValueStage = getLabeledValueStage;