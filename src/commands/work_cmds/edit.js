'use strict';
const unset = Symbol('unset');

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
    default: unset
  },
  end: {
    alias: 'e',
    describe: 'end time',
    type: 'string',
    default: unset
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

};
exports.handler = function(argv) {
  if(!argv.id) return console.log('could not update. No id specified.');

  console.log('updating work log');
  const workRepository = require('../../bootstrap').ubtrac.workLogRepository;
  const objectMapper = require('../../cli-util/object-mapper');

  const workitem = objectMapper(argv, mapping, {filter: (v) => v !== unset});
  workRepository.updateById(argv.id, workitem)
    .then(w => console.log(w))
    .catch(e => console.log(e.message));
};

const mapping = {
  start: 'start',
  end: 'end',
  description: 'description',
  task: 'taskId'
};
