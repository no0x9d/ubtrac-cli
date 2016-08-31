'use strict';
const blessed = require('blessed');
const Board = require('./widgets/kanban-board');
const Menu = require('./widgets/menu');
const Details = require('./widgets/todo-details');

class Tui {
  show(controller) {
    var screen = blessed.screen({
      //dump: __dirname + '/logs/widget.log',
      //log: __dirname + '/logs/console.log',
      smartCSR: true,
      debug: true
    });

    const board = new Board({
      width: '100%',
      height: '95%',
    }, [
      {label: ' open ', state: 'open'},
      {label: ' doing ', state: 'doing'},
      {label: ' done ', state: 'done'}
    ]);
    this.board = board;

    const details = Details();
    details.hide();
    board.on('selected item', item => details.edit(item));
    board.on('archive', item => controller.archiveItem(item));
    board.on('change state', controller.changeState.bind(controller));

    screen.append(board);
    board.children[0].focus();

    const menu = new Menu();
    menu.on('toggle show archived', (menuItem) => {
      controller.toggleShowArchived();
      menuItem.style.bg = controller.showArchived ? 'green' : 'red';
    });
    menu.on('create new task', () => details.new());

    screen.append(menu);
    screen.append(details);

    screen.render();

    // Quit on C-c and change focus on tab
    screen.on('keypress', function(ch, key) {
      if (key.name === 'tab') {
        return key.shift
          ? screen.focusPrevious()
          : screen.focusNext();
      }
      if (key.name === 'c' && key.ctrl) {
        return process.exit(0);
      }
    })
  }

  setItems(items) {
    this.board.setItems(items, t => t.title)
  }
}

module.exports = Tui;