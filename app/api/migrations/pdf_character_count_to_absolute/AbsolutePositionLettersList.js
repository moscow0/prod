"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.AbsolutePositionLettersList = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








class AbsolutePositionLettersList {






  constructor(
  absolutePositionTagList,
  wordPositionTagList)
  {_defineProperty(this, "letterList", []);_defineProperty(this, "letterListNoSpaces", []);_defineProperty(this, "wordPositionTagList", []);
    this.wordPositionTagList = wordPositionTagList;
    const tagListNoEmpty = absolutePositionTagList.filter((x) => x.text !== ' ');
    this.splitByLetters(tagListNoEmpty);
  }

  splitByLetters(absolutePositionTagList) {
    this.letterList = absolutePositionTagList.reduce(
    (accumulator, currentValue) => {
      const letters = currentValue.text.split('').map((x) => ({
        pageNumber: currentValue.pageNumber,
        top: currentValue.top,
        left: currentValue.left,
        height: currentValue.height,
        width: currentValue.width,
        text: x }));

      Array.prototype.push.apply(accumulator, letters);
      return accumulator;
    },
    []);


    this.letterListNoSpaces = this.letterList.filter((x) => x.text !== ' ');
  }

  getAbsolutePositionByStringMatch(label) {
    const labelNoSpaces = label.replace(/ /g, '');

    const absolutePositionsLists = [];

    for (let startRange = 0; startRange < this.letterListNoSpaces.length; startRange += 1) {
      if (labelNoSpaces[0] === this.letterListNoSpaces[startRange].text) {
        const endRange = startRange + labelNoSpaces.length;
        const lettersToMatch = this.letterListNoSpaces.slice(startRange, endRange);

        if (labelNoSpaces === lettersToMatch.map((x) => x.text).join('')) {
          absolutePositionsLists.push(
          AbsolutePositionLettersList.lettersTagsToAbsolutePositionTags(lettersToMatch));

        }
      }
    }

    return absolutePositionsLists;
  }

  getCharacterCountMatch(pageNumber, startRange, endRange) {
    const lettersFromMatchingPage = this.letterList.filter((x) => x.pageNumber >= pageNumber);

    const matchingLetters = lettersFromMatchingPage.slice(startRange, endRange);

    return AbsolutePositionLettersList.lettersTagsToAbsolutePositionTags(matchingLetters);
  }

  static parseHtmlContent(htmlContentObject) {
    const tags = [];
    const { elements } = htmlContentObject.elements[1];
    const body = elements.filter((x) => x.name === 'body')[0];
    const pages = body.elements.filter((x) => x.name === 'doc')[0].elements;
    for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
      const pageElements = pages[pageIndex].elements || [];
      const pageTags = pageElements.map(
      (x) =>



      x.elements ?
      {
        pageNumber: pageIndex + 1,
        top: Math.round(Number(x.attributes.yMin) / 0.75),
        left: Math.round(Number(x.attributes.xMin) / 0.75),
        height: Math.round(
        Number(x.attributes.yMax) / 0.75 - Number(x.attributes.yMin) / 0.75),

        width: Math.round(
        Number(x.attributes.xMax) / 0.75 - Number(x.attributes.xMin) / 0.75),

        text: x.elements[0].text } :

      { pageNumber: 0, top: 0, left: 0, height: 0, width: 0, text: 0 });


      Array.prototype.push.apply(tags, pageTags);
    }
    return tags;
  }

  static fromXmlObject(xmlContentObject, htmlContentObject) {
    const pages = xmlContentObject.elements[1].elements.filter(
    (x) => x.attributes && x.attributes.number);

    const allTags = [];
    for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
      let pageElements = pages[pageIndex].elements || [];

      pageElements = pageElements.
      reduce(AbsolutePositionLettersList.removeXmlOneLevel(), []).
      reduce(AbsolutePositionLettersList.removeXmlOneLevel(), []).
      reduce(AbsolutePositionLettersList.removeXmlOneLevel(), []).
      reduce(AbsolutePositionLettersList.removeXmlOneLevel(), []).
      reduce(AbsolutePositionLettersList.removeXmlOneLevel(), []);

      pageElements = pageElements.filter(
      (x) => x.text && x.attributes && x.attributes.top);


      const pageTags = pageElements.map(
      (x) => ({
        pageNumber: Number(pages[pageIndex].attributes.number),
        top: Math.round(Number(x.attributes.top)),
        left: Math.round(Number(x.attributes.left)),
        height: Math.round(Number(x.attributes.height)),
        width: Math.round(Number(x.attributes.width)),
        text: x.text.replace(/^\s+/g, '') }));



      Array.prototype.push.apply(allTags, pageTags);
    }

    return new AbsolutePositionLettersList(
    allTags,
    AbsolutePositionLettersList.parseHtmlContent(htmlContentObject));

  }




















  static isTagInList(tags, tag) {
    if (tags.length === 0) {
      return false;
    }

    const lastTagInserted = tags.slice(-1)[0];

    if (
    lastTagInserted.pageNumber === tag.pageNumber &&
    lastTagInserted.top === tag.top &&
    lastTagInserted.left === tag.left &&
    lastTagInserted.height === tag.height &&
    lastTagInserted.width === tag.width)
    {
      return true;
    }

    return false;
  }

  static lettersTagsToAbsolutePositionTags(lettersTags) {
    return lettersTags.reduce(
    (accumulator, letterTag) => {
      if (AbsolutePositionLettersList.isTagInList(accumulator, letterTag)) {
        accumulator.slice(-1)[0].text += letterTag.text;
      } else {
        accumulator.push(_objectSpread({}, letterTag));
      }

      return accumulator;
    },
    []);

  }

  getWordsAbsolutePositions(absolutePositionTags) {
    if (!absolutePositionTags) {
      return undefined;
    }
    const wordsAbsolutePosition = [];

    for (let tagIndex = 0; tagIndex < absolutePositionTags.length; tagIndex += 1) {
      const absolutePositionTag = absolutePositionTags[tagIndex];

      const wordsInsideTag = this.wordPositionTagList.filter(
      (x) => x.pageNumber === absolutePositionTag.pageNumber && x.top === absolutePositionTag.top);


      const lineText = wordsInsideTag.reduce((acc, val) => acc + val.text, '') || '';
      const indexTextInRow = lineText.indexOf(absolutePositionTag.text);
      if (indexTextInRow === -1) {
        wordsAbsolutePosition.push(absolutePositionTags[tagIndex]);
      } else {
        const matchedWords = [];
        let lettersCount = 0;
        for (let wordIndex = 0; wordIndex < wordsInsideTag.length; wordIndex += 1) {
          const wordEnd = lettersCount + wordsInsideTag[wordIndex].text.length;
          if (
          lettersCount <= indexTextInRow && indexTextInRow < wordEnd ||
          lettersCount < indexTextInRow + absolutePositionTag.text.length &&
          indexTextInRow + absolutePositionTag.text.length <= wordEnd)
          {
            matchedWords.push(wordsInsideTag[wordIndex]);
          }
          lettersCount += wordsInsideTag[wordIndex].text.length;
        }

        wordsAbsolutePosition.push({
          pageNumber: matchedWords[0].pageNumber,
          top: matchedWords[0].top,
          left: matchedWords[0].left,
          height: matchedWords[0].height,
          width:
          matchedWords[matchedWords.length - 1].left +
          matchedWords[matchedWords.length - 1].width -
          matchedWords[0].left,
          text: '' });

      }
    }

    return wordsAbsolutePosition;
  }}exports.AbsolutePositionLettersList = AbsolutePositionLettersList;_defineProperty(AbsolutePositionLettersList, "removeXmlOneLevel", () => (accumulator, currentValue) => {if (currentValue.elements && currentValue.elements.length > 0) {Array.prototype.push.apply(accumulator, currentValue.elements.map((x) => {const flatOneLevel = x;flatOneLevel.attributes = currentValue.attributes;return flatOneLevel;}));return accumulator;}accumulator.push(currentValue);return accumulator;});