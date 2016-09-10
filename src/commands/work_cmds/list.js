'use strict';
exports.command = 'list';
exports.desc = 'lists all work items';
exports.builder = { };
exports.handler = function(argv) {
  const bootstrapCommandHandler = require('../../bootstrap-command-handler');
  bootstrapCommandHandler(argv, require('../../command-handler/work/list'))
};