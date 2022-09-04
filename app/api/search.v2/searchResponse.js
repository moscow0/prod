"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapResults = void 0;



function getSnippetsForNonFullText(hit) {
  return hit.highlight ?
  Object.entries(hit.highlight).reduce((memo, [property, highlights]) => {
    memo.push({ field: property, texts: highlights });
    return memo;
  }, []) :
  [];
}

function extractFullTextSnippets(hit) {
  const fullTextSnippets = [];

  if (hit.inner_hits && hit.inner_hits.fullText.hits.hits.length > 0) {
    const { highlight } = hit.inner_hits.fullText.hits.hits[0];
    const regex = /\[{2}(\d+)]{2}/g;

    Object.values(highlight).forEach((snippets) => {
      snippets.forEach((snippet) => {
        const matches = regex.exec(snippet);
        fullTextSnippets.push({
          text: snippet.replace(regex, ''),
          page: matches ? Number(matches[1]) : 0 });

      });
    });
  }

  const hitsCount = hit.highlight ?
  Object.values(hit.highlight).reduce(
  (memo, highlights) => memo + highlights.length,
  0) :

  0;

  return {
    count: fullTextSnippets.length + hitsCount,
    metadata: getSnippetsForNonFullText(hit),
    fullText: fullTextSnippets };

}

const mapResults = (entityResults, searchQuery) =>
entityResults.hits.hits.map((entityResult) => {
  const entity = entityResult._source;
  entity._id = entityResult._id;
  if (searchQuery.fields && searchQuery.fields.includes('snippets')) {
    entity.snippets = extractFullTextSnippets(entityResult);
  }
  return entity;
});exports.mapResults = mapResults;