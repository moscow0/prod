"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getTwitterImagesData = exports.getTwitterImages = exports.getTextWithAttachedImages = void 0;


var _files = require("../../files");






const saveImage = async (twitterImageData, entity) => {
  const fileResponse = await fetch(twitterImageData.url);
  const fileStream = fileResponse.body;
  if (!fileStream) {
    throw new Error(`Error requesting for twitter image: ${twitterImageData.url}`);
  }

  await _files.storage.storeFile(twitterImageData.fileName, fileStream, 'attachment');
  await _files.files.save({
    entity: entity.sharedId,
    filename: twitterImageData.fileName,
    originalname: twitterImageData.url.split('/').slice(-1)[0],
    type: 'attachment' });

};

const getTwitterImages = async (entity, imagesFileNamesUrls) => {
  for (let i = 0; i < imagesFileNamesUrls.length; i += 1) {
    const twitterImageData = imagesFileNamesUrls[i];
    // eslint-disable-next-line no-await-in-loop
    await saveImage(twitterImageData, entity);
  }
};exports.getTwitterImages = getTwitterImages;

const getTextWithAttachedImages = (
message,
imagesFileNamesUrls) =>
{var _message$params;
  let textWithImagesInAttachments = (_message$params = message.params) === null || _message$params === void 0 ? void 0 : _message$params.text;

  for (let i = 0; i < imagesFileNamesUrls.length; i += 1) {
    const twitterImageData = imagesFileNamesUrls[i];
    textWithImagesInAttachments = textWithImagesInAttachments.replace(
    twitterImageData.url,
    `/api/files/${twitterImageData.fileName}`);

  }

  return textWithImagesInAttachments;
};exports.getTextWithAttachedImages = getTextWithAttachedImages;

const getTwitterImagesData = (message) => {var _message$params2, _message$params3;
  return (_message$params2 = message.params) !== null && _message$params2 !== void 0 && _message$params2.images_urls ? (_message$params3 =
  message.params) === null || _message$params3 === void 0 ? void 0 : _message$params3.images_urls.map((url) => ({
    fileName: (0, _files.generateFileName)({
      originalname: url.split('/').slice(-1)[0] }),

    url: url })) :

  [];
};exports.getTwitterImagesData = getTwitterImagesData;