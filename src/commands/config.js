'use strict';

exports.command = 'config [command]';
exports.desc = 'Manage configuration for ubtrac';
exports.builder = function(yargs) {
  return yargs.commandDir('config_cmds')
};
exports.handler = function() {
};
