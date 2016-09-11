'use strict';
const moment = require('moment');

module.exports = listWorkHandler;

function listWorkHandler(argv, context) {

  var from, to;
  // handle time based queries
  // handle option flags and set 'from' & 'to'

  if(argv.from || argv.to){
    from = argv.from && moment(argv.from) || moment().startOf('day');
    to = argv.to && moment(argv.to) || moment().endOf('day');
  } else {
    var unitOfTime = 'day';
    if (argv.week) {
      unitOfTime = 'week';
    }
    if (argv.month) {
      unitOfTime = 'month';
    }
    if (argv.year) {
      unitOfTime = 'year';
    }
    from = moment().startOf(unitOfTime);
    to = moment().endOf(unitOfTime);

    if (argv.last) {
      from = from.subtract(1, unitOfTime);
      to = to.subtract(1, unitOfTime);
    }
  }

  const workRepository = context.ubtrac.workLogRepository;
  workRepository.findByTime(from.toDate(), to.toDate())
    .then(w => console.log(w))
    .catch(err => console.log(err.message))
}
