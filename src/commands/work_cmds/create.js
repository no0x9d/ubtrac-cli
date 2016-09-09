'use strict';
const unset = Symbol('unset');

exports.command = 'create';
exports.desc = 'create a new work log item with a <description>';
exports.builder = {
  start: {
    alias: 's',
    describe: 'start time',
    type: 'string',
    default: unset,
    coerce: (input) => {
      if (input === unset) return unset;
      return require('../../cli-util/date-time-parser')(input).toDate()
    }
  },
  end: {
    alias: 'e',
    describe: 'end time',
    type: 'string',
    default: unset,
    coerce: (input) => {
      if (input === unset) return unset;
      return require('../../cli-util/date-time-parser')(input).toDate()
    }
  },
  description: {
    alias: 'd',
    describe: 'Adding a longer description text',
    type: 'string',
    default: unset
  },
  task: {
    alias: 't',
    describe: 'id of parent task',
    type: 'string',
    default: unset
  },
  stop: {
    alias: 'S',
    describe: 'stops the previous running task with the start date of the new one',
    type: 'boolean'
  }

};
exports.handler = function(argv) {
  console.log('adding work log');
  const workRepository = require('../../bootstrap').ubtrac.workLogRepository;
  const objectMapper = require('../../cli-util/object-mapper');

  const workitem = objectMapper(argv, mapping, {filter: (v) => v !== unset});
  workRepository.create(workitem, {stopRunning: argv.stop})
    .then(w => console.log(w))
    .catch(e => console.log(e.message));
};

const mapping = {
  start: 'start',
  end: 'end',
  description: 'description',
  task: 'taskId'
};
