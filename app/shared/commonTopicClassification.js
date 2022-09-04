"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.buildFullModelName = buildFullModelName;exports.convertThesaurusName = convertThesaurusName;exports.getThesaurusPropertyNames = getThesaurusPropertyNames;var _propertyTypes = require("./propertyTypes");


function convertThesaurusName(thesaurusName) {
  return `${thesaurusName.toLowerCase().replace(/[^0-9a-z]/g, '')}`;
}

/* Convert Uwazi concepts into their Topic Classification model equivalent. */
function buildFullModelName(thesaurusName) {
  return `${process.env.DATABASE_NAME}-${convertThesaurusName(thesaurusName)}`;
}

/* Find all property names using this thesaurus */
function getThesaurusPropertyNames(
thesaurusId,
templates)
{
  const propNames = {};
  templates.forEach((t) => {var _t$properties;return (_t$properties =
    t.properties) === null || _t$properties === void 0 ? void 0 : _t$properties.forEach((p) => {var _p$content;
      if (
      p.name && (
      p.type === _propertyTypes.propertyTypes.select || p.type === _propertyTypes.propertyTypes.multiselect) &&
      ((_p$content = p.content) === null || _p$content === void 0 ? void 0 : _p$content.toString()) === thesaurusId.toString())
      {
        propNames[p.name] = true;
      }
    });});

  return Object.keys(propNames);
}