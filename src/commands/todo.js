'use strict';

exports.command = 'todo [command]';
exports.desc = 'Manage todos';
exports.builder = function(yargs) {
  return yargs.commandDir('todo_cmds')
};
exports.handler = function(argv = {}) {
  if (argv.command) return;

  //only require modules if command is executed
  const Tui = require('../command-handler/todo/tui');
  const Controller = require('../command-handler/todo/controller');

  const tui = new Tui();
  const controller = new Controller(tui);
  tui.show(controller);

  controller.setItems();
};

if(module.parent == undefined){
  exports.handler();
}