'use strict';
exports.command = 'list';
exports.desc = 'lists all tasks';
exports.builder = {
  all: {
    alias: 'a',
    type: 'boolean'
  }
};
exports.handler = function(argv) {
  console.log('list all tasks');
  const taskRepository = require('../../bootstrap').ubtrac.taskRepository;
  taskRepository.findAll(argv.all)
    .then(tasks => console.log(tasks))
    .catch(err => console.log(err.message))
};