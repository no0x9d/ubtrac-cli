'use strict';
exports.command = 'list';
exports.desc = 'lists all work items';
exports.builder = {
  from: {
    alias: 'f',
    describe: 'time from which to query (default: today 0:00 am)',
    type: 'string',
    coerce: (input) => {
      if (input == undefined) return undefined;
      return require('../../cli-util/date-time-parser')(input).toDate()
    }
  },
  to: {
    alias: 't',
    describe: 'time to which to query (default: today 11:59 pm)',
    type: 'string',
    coerce: (input) => {
      if (input == undefined) return undefined;
      return require('../../cli-util/date-time-parser')(input).toDate()
    }
  },
  week: {
    alias: 'w',
    describe: 'show all entries of current week. is partially overwritten by -f and -t',
    type: 'boolean'
  },
  month: {
    alias: 'm',
    describe: 'show all entries of current month. is partially overwritten by -f and -t',
    type: 'boolean'
  },
  year: {
    alias: 'y',
    describe: 'show all entries of current year. is partially overwritten by -f and -t',
    type: 'boolean'
  },
  last: {
    alias: 'l',
    describe: 'shows the last unit of the chosen time frame, e.g. -lw for last week. use together with -w -m -y or without -f or -t to get day.',
    type: 'boolean'
  }
};
exports.handler = function(argv) {
  const bootstrapCommandHandler = require('../../bootstrap-command-handler');
  bootstrapCommandHandler(argv, require('../../command-handler/work/list'))
};