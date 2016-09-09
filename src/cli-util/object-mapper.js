module.exports = function objectMapper(obj, mapping, options = {}) {
  const forOwn = require('lodash.forown');

  const mappedObj = {};

  function applyOptionalFilter(sourceKey) {
    return options.filter && options.filter(obj[sourceKey], sourceKey) || !options.filter;
  }

  forOwn(mapping, (targetKey, sourceKey) => {
    if (applyOptionalFilter(sourceKey)) {
      mappedObj[targetKey] = obj[sourceKey];
    }
  });
  return mappedObj;
};