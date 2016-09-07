'use strict';

exports.command = 'work [command]';
exports.desc = 'Manage work log items';
exports.builder = function(yargs) {
  return yargs.commandDir('work_cmds')
};
exports.handler = function(argv = {}) {
  if (argv.command) return;
};

if(module.parent == undefined){
  exports.handler();
}