"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getCompatibleTypes = getCompatibleTypes;exports.propertyTypes = void 0;const propertyTypes = {
  date: 'date',
  daterange: 'daterange',
  geolocation: 'geolocation',
  image: 'image',
  link: 'link',
  markdown: 'markdown',
  media: 'media',
  multidate: 'multidate',
  multidaterange: 'multidaterange',
  multiselect: 'multiselect',
  nested: 'nested',
  numeric: 'numeric',
  preview: 'preview',
  relationship: 'relationship',
  select: 'select',
  text: 'text',
  generatedid: 'generatedid' };exports.propertyTypes = propertyTypes;


function getCompatibleTypes(type) {
  switch (type) {
    case propertyTypes.date:
    case propertyTypes.multidate:
      return [propertyTypes.date, propertyTypes.multidate];
    case propertyTypes.daterange:
    case propertyTypes.multidaterange:
      return [propertyTypes.daterange, propertyTypes.multidaterange];
    case propertyTypes.select:
    case propertyTypes.multiselect:
      return [propertyTypes.select, propertyTypes.multiselect];
    case propertyTypes.text:
    case propertyTypes.markdown:
      return [propertyTypes.text, propertyTypes.markdown];

    default:
      return [type];}

}