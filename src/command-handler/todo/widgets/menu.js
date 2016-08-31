'use strict';
const blessed = require('blessed');

module.exports = function() {
  var menu = blessed.listbar({
    bottom: 0,
    left: 0,
    right: 0,
    height: 'shrink',
    mouse: true,
    autoCommandKeys: true,
    border: 'line',
    vi: true,
    style: {
      item: {
        bg: 'red',
        hover: {
          bg: 'blue'
        },
      }
    }
  });

  menu.setItems({
    'new': function() {
      menu.emit('create new task');
    },
    'edit': function() {
    },
    'search': function() {
      menu.emit('trigger search');
    },
    'show archived': function() {
      menu.emit('toggle show archived', this.element);
    },
    'work log': function() {
      menu.emit('show work log');
    },
  });

  return menu
};
