"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.prepareHTMLMediaView = exports.isSerializedFile = exports.constructFile = void 0;


const isSerializedFile = (file) =>
file.serializedFile !== undefined;exports.isSerializedFile = isSerializedFile;

const constructFile = ({ serializedFile: base64, originalname }) => {
  const fileParts = base64.split(',');
  const fileFormat = fileParts[0].split(';')[0].split(':')[1];
  const fileContent = fileParts[1];
  const buff = Buffer.from(fileContent, 'base64');

  return new File([buff], originalname || '', { type: fileFormat });
};exports.constructFile = constructFile;

const prepareHTMLMediaView = (supportingFile) => {
  const file = constructFile(supportingFile);
  return URL.createObjectURL(file);
};exports.prepareHTMLMediaView = prepareHTMLMediaView;