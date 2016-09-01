'use strict';

exports.command = 'task [command]';
exports.desc = 'Manage tasks';
exports.builder = function(yargs) {
  return yargs.commandDir('task_cmds')
};
exports.handler = function(argv = {}) {
  if (argv.command) return;

  //only require modules if command is executed
  const Tui = require('../command-handler/task/tui');
  const Controller = require('../command-handler/task/controller');

  const tui = new Tui();
  const controller = new Controller(tui);
  tui.show(controller);

  controller.setTasks();
};

if(module.parent == undefined){
  exports.handler();
}