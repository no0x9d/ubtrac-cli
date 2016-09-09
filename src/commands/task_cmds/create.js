'use strict';
exports.command = 'create';
exports.desc = 'create a new task with a <title>';
exports.builder = {
  title: {
    alias: 't',
    demand: true,
    describe: 'Adding a short title for a new task',
    type: 'string'
  },
  description: {
    alias: 'd',
    describe: 'Adding a longer description text',
    type: 'string'
  },
  workorder: {
    alias: 'w',
    describe: 'Adding a work order',
    type: 'string'
  },
  project: {
    alias: 'p',
    describe: 'Adding a Project for the task',
    type: 'string'
  },
  state: {
    alias: 's',
    type: 'string',
    describe: 'The state for a new task',
    choices: ['open', 'doing', 'done']
  },
  archived: {
    alias: 'a',
    describe: 'The new task should already be archived',
    type: 'boolean'
  }
};
exports.handler = function(argv) {
  console.log('adding task');
  const taskRepository = require('../../bootstrap').ubtrac.taskRepository;
  const objectMapper = require('../../cli-util/object-mapper');

  const task = objectMapper(argv, mapping, {filter: (v) => v != null});
  taskRepository.create(task)
    .then(task => console.log(task))
    .catch(e => console.log(e.message));
};

const mapping = {
  title: 'title',
  description: 'description',
  workorder: 'workorder',
  project: 'project',
  state: 'state',
  archived: 'archived'
};
