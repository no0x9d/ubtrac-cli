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
  const bootstrapCommandHandler = require('../../bootstrap-command-handler');
  bootstrapCommandHandler(argv, require('../../command-handler/task/list'))
};