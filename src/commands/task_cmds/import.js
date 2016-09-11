'use strict';
exports.command = 'import <ticket>';
exports.desc = 'create a new task from a Jira <ticket>';
exports.builder = {};
exports.handler = function(argv) {
  const bootstrapCommandHandler = require('../../bootstrap-command-handler');
  bootstrapCommandHandler(argv, require('../../command-handler/task/import'))
};
