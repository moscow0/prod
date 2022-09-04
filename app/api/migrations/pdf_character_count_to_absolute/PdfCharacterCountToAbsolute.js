"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PdfCharacterCountToAbsolute = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _childProcessPromise = require("child-process-promise");
var _xmlJs = _interopRequireDefault(require("xml-js"));
var _path = _interopRequireDefault(require("path"));
var _util = require("util");
var os = _interopRequireWildcard(require("os"));

var _AbsolutePositionLettersList = require("./AbsolutePositionLettersList");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}












const readXml = async (xmlRelativePath) => {
  const readFile = (0, _util.promisify)(_fs.default.readFile);
  const xmlContentBuffer = await readFile(xmlRelativePath);
  return xmlContentBuffer.toString();
};

class PdfCharacterCountToAbsolute {














  constructor() {_defineProperty(this, "lettersTags", void 0);_defineProperty(this, "pdfInfo", void 0);_defineProperty(this, "xmlPath", '');_defineProperty(this, "htmlPath", '');_defineProperty(this, "pdfPath", '');_defineProperty(this, "pdfSanitizedPath", '');_defineProperty(this, "pageSizes", void 0);
    this.lettersTags = new _AbsolutePositionLettersList.AbsolutePositionLettersList([], []);
    this.pdfInfo = [];
    this.pageSizes = [];
  }

  async loadPdf(pdfRelativePath, pagesEndingCharacterCount) {
    this.pdfPath = pdfRelativePath;
    this.pdfInfo = pagesEndingCharacterCount;
    this.setXmlRelativePath();

    await this.convertPdfToXML();
    const xmlContentObject = this.convertToJson(await readXml(this.xmlPath));
    const htmlContentObject = this.convertToJson(await readXml(this.htmlPath));

    await this.deleteXmlFile();
    this.lettersTags = _AbsolutePositionLettersList.AbsolutePositionLettersList.fromXmlObject(
    xmlContentObject,
    htmlContentObject);

  }

  convertToJson(contentString) {
    let errorMessage;
    let contentObject;
    for (let iterations = 0; iterations < 300; iterations += 1) {
      try {
        contentObject = JSON.parse(_xmlJs.default.xml2json(contentString));
      } catch (e) {
        errorMessage = e.toString();
        contentString = this.removeFailingLines(errorMessage, contentString);
      }

      if (contentObject) {
        break;
      }
    }

    if (!contentObject) {
      throw new Error(`xml2json error ${errorMessage}\r\n`);
    }
    return contentObject;
  }

  sanitizeLine(line) {
    if (!line.includes('<text')) {
      return line;
    }

    return `${line.split('>')[0]}>${line.split('>')[1].split('<')[0]}</text>`;
  }

  removeFailingLines(errorMessage, xmlContentString) {
    let sanitizedContentString = xmlContentString;
    const anchorsMatches = sanitizedContentString.match(/<text.*<a href=".*<\/text>/g) || [];

    anchorsMatches.forEach((line) => {
      if (!line.includes('</a>')) {
        sanitizedContentString = sanitizedContentString.replace(line, this.sanitizeLine(line));
      }
    });

    const anchorsNotClosedMatches = sanitizedContentString.match(/<text.*<a href=".*\n/g) || [];

    anchorsNotClosedMatches.forEach((line) => {
      if (!line.includes('</a>')) {
        sanitizedContentString = sanitizedContentString.replace(line, this.sanitizeLine(line));
      }
    });

    sanitizedContentString.split('\n').forEach((x) => {
      if (x.includes('<fontspec')) {
        sanitizedContentString = sanitizedContentString.replace(x, '<fontspec />');
      }
      if (x.charAt(0) === '"') {
        sanitizedContentString = sanitizedContentString.replace(x, '<fontspec />');
      }
    });

    sanitizedContentString = sanitizedContentString.replace(/<i>/g, '');
    sanitizedContentString = sanitizedContentString.replace(/<\/i>/g, '');

    sanitizedContentString = sanitizedContentString.replace(/<b>/g, '');
    sanitizedContentString = sanitizedContentString.replace(/<\/b>/g, '');

    const errorLineNumber = parseInt(errorMessage.split('Line: ')[1].split('Column')[0], 10);
    const lines = sanitizedContentString.split('\n');
    const problematicLines = [
    lines[errorLineNumber - 2],
    lines[errorLineNumber - 1],
    lines[errorLineNumber]];

    const escapeRegex = (lineText) =>
    lineText.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    problematicLines.forEach(
    (x) =>
    sanitizedContentString = sanitizedContentString.replace(
    new RegExp(escapeRegex(x), 'g'),
    this.sanitizeLine(x)));



    return sanitizedContentString;
  }

  setXmlRelativePath() {
    const fileName = _path.default.basename(this.pdfPath);
    this.pdfSanitizedPath = `${os.tmpdir()}/${fileName}`;
    this.xmlPath = `${os.tmpdir()}/${fileName.replace('.pdf', '.xml')}`;
    this.htmlPath = `${os.tmpdir()}/${fileName.replace('.pdf', '.html')}`;
  }

  async convertPdfToXML() {
    await (0, _childProcessPromise.spawn)('pdftohtml', [
    '-q',
    '-hidden',
    '-nodrm',
    '-xml',
    '-zoom',
    '1.33333',
    '-i',
    this.pdfPath,
    this.xmlPath]);


    await (0, _childProcessPromise.spawn)('pdftotext', ['-q', '-bbox', '-raw', this.pdfPath, this.htmlPath]);
  }

  async deleteXmlFile() {
    const unlink = (0, _util.promisify)(_fs.default.unlink);
    await unlink(this.xmlPath);
    await unlink(this.htmlPath);
    if (_fs.default.existsSync(this.pdfSanitizedPath)) {
      await unlink(this.pdfSanitizedPath);
    }
  }

  convertToAbsolutePosition(
  label,
  startRange,
  endRange)
  {
    const absolutePositionByStringMatch = this.lettersTags.getAbsolutePositionByStringMatch(label);

    const absolutePositionByCharacterCount = this.getAbsolutePositionByCharacterCount(
    startRange,
    endRange);


    const existMatchByCharacterCount = absolutePositionByCharacterCount.length > 0;
    const existMatchByString = absolutePositionByStringMatch.length > 0;

    if (!existMatchByCharacterCount && !existMatchByString) {
      return {
        text: label,
        selectionRectangles: [] };

    }
    if (!existMatchByCharacterCount) {
      return {
        text: label,
        selectionRectangles:
        this.lettersTags.getWordsAbsolutePositions(absolutePositionByStringMatch[0]) || [] };

    }

    const closerAbsolutePositionStringMatch = this.lettersTags.getWordsAbsolutePositions(
    PdfCharacterCountToAbsolute.getCloserStringMatchToTag(
    absolutePositionByStringMatch,
    absolutePositionByCharacterCount[0]));



    const selectionRectangles =
    closerAbsolutePositionStringMatch ||
    absolutePositionByCharacterCount ||
    absolutePositionByStringMatch[0];

    return {
      selectionRectangles,
      text: label };

  }

  static getCloserStringMatchToTag(
  stringMatches,
  tag)
  {
    const stringMatchesFromMatchingPage = stringMatches.filter(
    (x) => x[0].pageNumber === tag.pageNumber);

    const { top } = tag;
    return stringMatchesFromMatchingPage.reduce(
    (acc, val) => Math.abs(top - val[0].top) < Math.abs(top - acc[0].top) ? val : acc,
    stringMatches[0]);

  }

  getAbsolutePositionByCharacterCount(startRange, endRange) {
    const pagesCharacterCountBeforeMatchingPage = this.pdfInfo.filter((x) => x < startRange);
    const startingCharacterMatchingPage =
    Number(pagesCharacterCountBeforeMatchingPage.slice(-1)) + 1;

    const startRangeMatchingPage = Math.max(startRange - startingCharacterMatchingPage, 0);
    const endRangeMatchingPage = Math.max(
    endRange - startingCharacterMatchingPage,
    startRangeMatchingPage + 1);


    const pageNumber = pagesCharacterCountBeforeMatchingPage.length + 1;

    return this.lettersTags.getCharacterCountMatch(
    pageNumber,
    startRangeMatchingPage,
    endRangeMatchingPage);

  }}exports.PdfCharacterCountToAbsolute = PdfCharacterCountToAbsolute;