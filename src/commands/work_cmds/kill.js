'use strict';
exports.command = 'kill';
exports.desc = 'deletes a work log item>';
exports.builder = {
  id: {
    demand: true,
    alias: 'i',
    describe: 'the id',
    type: 'string'
  }
};
exports.handler = function(argv) {
  const bootstrapCommandHandler = require('../../bootstrap-command-handler');
  bootstrapCommandHandler(argv, require('../../command-handler/work/kill'))
};
