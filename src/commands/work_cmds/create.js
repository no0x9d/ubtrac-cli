'use strict';

exports.command = 'create';
exports.desc = 'create a new work log item with a <description>';
exports.builder = {
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
    type: 'string',
  },
  task: {
    alias: 't',
    describe: 'id of parent task',
    type: 'string',
  },
  stop: {
    alias: 'S',
    describe: 'stops the previous running task with the start date of the new one',
    type: 'boolean'
  }
};

exports.handler = function(argv) {
  const bootstrapCommandHandler = require('../../bootstrap-command-handler');
  bootstrapCommandHandler(argv, require('../../command-handler/work/create'))
};

