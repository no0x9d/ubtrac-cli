'use strict';
const blessed = require('blessed');

module.exports = function() {
  var menu = blessed.listbar({
    bottom: 1,
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
      },
      selected: {
        bg: 'red'
      }
    }
  });

  menu.setItems({
    'new': function() {
      menu.emit('create new task');
    },
    // 'show/edit': function() {
    // },
    // 'search': function() {
    //   menu.emit('trigger search');
    // },
    'show archived': function() {
      menu.emit('toggle show archived', this.element);
    },
    // 'work log': function() {
    //   menu.emit('show work log');
    // },
  });

  return menu
};
