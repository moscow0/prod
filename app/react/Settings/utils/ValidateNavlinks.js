"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;function _default(links) {
  const validator = {
    '': {} };


  links.forEach((_link, index) => {
    validator[''][`links.${index}.title.required`] = (form) => {
      if (!form.links[index]) {
        return true;
      }
      const { title } = form.links[index];
      return Boolean(title && String(title).trim().length);
    };
  });

  return validator;
}