'use strict';
const objectMapper = require('../../cli-util/object-mapper');

module.exports = createTaskHandler;

const mapping = {
  title: 'title',
  description: 'description',
  workorder: 'workorder',
  project: 'project',
  state: 'state',
  archived: 'archived'
};

function createTaskHandler(argv, context) {
  console.log('adding task');
  const taskRepository = context.ubtrac.taskRepository;

  const task = objectMapper(argv, mapping, {filter: (v) => v != null});
  taskRepository.create(task)
    .then(task => console.log(task))
    .catch(e => console.log(e.message));
}
