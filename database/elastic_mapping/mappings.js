"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.textSortField = exports.text = exports.propertyMappings = exports.number = exports.noSorttext = exports.noSortNumber = exports.noIndexText = exports.nested = exports.id = exports.date = void 0;const { USE_ELASTIC_ICU } = process.env;
// eslint-disable-next-line import/no-mutable-exports
let textSortField = {};exports.textSortField = textSortField;
if (USE_ELASTIC_ICU === 'true') {
  exports.textSortField = textSortField = { type: 'icu_collation_keyword', numeric: true };
} else {
  exports.textSortField = textSortField = { type: 'text', fielddata: true, analyzer: 'string_sorter' };
}

const text = {
  type: 'text',
  analyzer: 'tokenizer',
  fields: {
    sort: textSortField },

  term_vector: 'with_positions_offsets' };exports.text = text;


const noSorttext = {
  type: 'text',
  analyzer: 'tokenizer',
  term_vector: 'with_positions_offsets' };exports.noSorttext = noSorttext;


const noIndexText = {
  type: 'text',
  index: false };exports.noIndexText = noIndexText;


const id = {
  type: 'keyword',
  fields: {
    sort: textSortField } };exports.id = id;



const date = {
  type: 'date',
  format: 'epoch_millis',
  fields: {
    sort: { type: 'date', format: 'epoch_millis' } } };exports.date = date;



const nested = { type: 'nested' };exports.nested = nested;
const number = {
  type: 'double',
  doc_values: true,
  fields: {
    sort: { type: 'double' } } };exports.number = number;



const noSortNumber = {
  type: 'double',
  doc_values: true };exports.noSortNumber = noSortNumber;


const textType = () => ({
  value: text });


const markdownType = () => ({
  value: noSorttext });


const dateType = () => ({
  value: number });


const daterangeType = () => ({
  value: {
    properties: {
      from: number,
      to: number } } });




const geolocationType = () => ({
  value: {
    properties: {
      label: text,
      lat: noSortNumber,
      lon: noSortNumber } } });




const imageType = () => ({
  value: noIndexText });


const linkType = () => ({
  value: {
    properties: {
      label: text,
      url: noIndexText } } });




const selectType = () => ({
  label: text,
  value: id });


const numericType = () => ({
  value: number });


const relationshipType = () => ({
  icon: { type: 'object', enabled: false },
  label: text,
  value: id,
  type: noIndexText });


const nestedType = () => ({
  value: nested });


const propertyMappings = {
  text: textType,
  date: dateType,
  daterange: daterangeType,
  geolocation: geolocationType,
  image: imageType,
  link: linkType,
  markdown: markdownType,
  media: imageType,
  multidate: dateType,
  multidaterange: daterangeType,
  multiselect: selectType,
  nested: nestedType,
  numeric: numericType,
  relationship: relationshipType,
  select: selectType,
  generatedid: textType };exports.propertyMappings = propertyMappings;