const moment = require('moment');
module.exports = function dateTimeParser(dateString) {
  const parsedDate = moment(dateString, ['DD.MM.YYYY', 'DD.MM.YYYY HH:mm', 'HH:mm']);
  if (!parsedDate.isValid()) throw new Error('could not parse date from ' + dateString);
  return parsedDate
};