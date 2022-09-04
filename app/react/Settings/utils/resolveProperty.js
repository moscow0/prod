"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.resolveTemplateProp = resolveTemplateProp; /** @format */



/**
 * A given template property may refer to an existing thesaurus to provide
 * multi-select values. This function resolves a template property name that
 * refers to a particular thesaurus.
 */
function resolveTemplateProp(thesaurus, templates) {
  let matchingProp;
  for (let i = 0; i < templates.length; i += 1) {var _template$properties;
    const template = templates[i];
    const matchProp = (_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.find((prop) => prop.content === thesaurus._id);
    if (matchProp !== undefined) {
      matchingProp = matchProp;
      // TODO: Consider supporting multiple fields referring to the same thesaurus.
      break;
    }
  }
  return matchingProp;
}