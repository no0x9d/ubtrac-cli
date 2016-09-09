'use strict';

exports.command = 'edit';
exports.desc = 'edit a new work log item with a <description>';
exports.builder = {
  id: {
    alias: 'i',
    describe: 'the id',
    type: 'string'
  },
  start: {
    alias: 's',
    describe: 'start time',
    type: 'string',
    coerce: (input) => {
      if (input == undefined) return undefined;
      return require('../../cli-util/date-time-parser')(input).toDate()
    }
  },
  end: {
    alias: 'e',
    describe: 'end time',
    type: 'string',
    coerce: (input) => {
      if (input == undefined) return undefined;
      return require('../../cli-util/date-time-parser')(input).toDate()
    }
  },
  description: {
    alias: 'd',
    describe: 'Adding a longer description text',
    type: 'string'
  },
  task: {
    alias: 't',
    describe: 'id of parent task',
    type: 'string'
  },

};
exports.handler = function(argv) {
  const bootstrapCommandHandler = require('../../bootstrap-command-handler');
  bootstrapCommandHandler(argv, require('../../command-handler/work/edit'))
};
