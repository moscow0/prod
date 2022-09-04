"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.prepareMetadataAndFiles = void 0;exports.wrapEntityMetadata = wrapEntityMetadata;var _uniqueID = _interopRequireDefault(require("../../../shared/uniqueID"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const prepareFiles = async (mediaProperties, values) => {
  const metadataFiles = {};
  const entityAttachments = [];
  const files = [];

  if (values.metadata || mediaProperties.length === 0) {
    await Promise.all(
    mediaProperties.map(async (p) => {
      if (!values.metadata[p.name] || /^https?:\/\//.test(values.metadata[p.name])) {
        return Promise.resolve();
      }
      const { data, originalFile } = values.metadata[p.name];
      const blob = await fetch(data).then((r) => r.blob());
      const file = new File([blob], originalFile.name, { type: blob.type });
      const fileID = (0, _uniqueID.default)();

      metadataFiles[p.name] = fileID;

      entityAttachments.push({
        originalname: file.name,
        filename: file.name,
        type: 'attachment',
        mimetype: blob.type,
        fileLocalID: fileID });


      files.push(file);

      return URL.revokeObjectURL(values.metadata[p.name]);
    }));

  }

  return { metadataFiles, entityAttachments, files };
};

function wrapEntityMetadata(entity) {
  if (!entity.metadata) {
    return _objectSpread({}, entity);
  }
  const newFileMetadataValues = (entity.attachments || []).
  filter((attachment) => attachment.fileLocalID).
  reduce(
  (previousValue, attachment, index) => _objectSpread(_objectSpread({},
  previousValue), {}, {
    [attachment.fileLocalID]: { value: '', attachment: index } }),

  {});


  const metadata = Object.keys(entity.metadata).reduce((wrappedMo, key) => {
    const newFileMetadataValue = newFileMetadataValues[entity.metadata[key]];
    return _objectSpread(_objectSpread({},
    wrappedMo), {}, {
      [key]: Array.isArray(entity.metadata[key]) ?
      entity.metadata[key].map((v) => ({ value: v })) :
      [newFileMetadataValue || { value: entity.metadata[key] }] });

  }, {});
  // suggestedMetadata is always in metadata-object form.
  return _objectSpread(_objectSpread({}, entity), {}, { metadata });
}

const prepareMetadataAndFiles = async (values, attachedFiles, template) => {
  const mediaProperties = template.properties.filter((p) => p.type === 'image' || p.type === 'media');
  const { metadataFiles, entityAttachments, files } = await prepareFiles(mediaProperties, values);
  const fields = _objectSpread(_objectSpread({}, values.metadata), metadataFiles);
  const entity = _objectSpread(_objectSpread({}, values), {}, { metadata: fields, attachments: entityAttachments });
  const wrappedEntity = wrapEntityMetadata(entity);
  wrappedEntity.file = values.file ? values.file[0] : undefined;
  wrappedEntity.attachments = [];
  wrappedEntity.attachments.push(...files);
  wrappedEntity.attachments.push(...attachedFiles);
  return _objectSpread(_objectSpread({}, wrappedEntity), {}, { template: template._id });
};exports.prepareMetadataAndFiles = prepareMetadataAndFiles;