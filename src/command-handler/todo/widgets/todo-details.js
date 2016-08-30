'use strict';
const blessed = require('blessed');
const contrib = require('blessed-contrib');

module.exports = function Details() {
  var box = new blessed.Box({
    left: 'center',
    top: 'center',
    width: '50%',
    height: '75%',
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: '#f0f0f0'
      },
    }
  });
  const grid = new contrib.grid({
    screen: box,
    dashboardMargin: 1,
    rows: 12,
    cols: 1,
  });

  box.title = grid.set(0, 0, 1, 1, blessed.Box, {label: 'Title'});
  box.description = grid.set(1, 0, 5, 1, contrib.markdown, {label: 'Description'});
  box.workorder = grid.set(6, 0, 1, 1, blessed.Box, {label: 'Workorder'});
  box.project = grid.set(7, 0, 1, 1, blessed.Box, {label: 'Project'});
  box.state = grid.set(8, 0, 1, 1, blessed.Box, {label: 'State'});
  box.worklog = grid.set(9, 0, 3, 1, blessed.List, {label: 'Worklog'});

  function hideWithEscape(ch, key) {
    if (!box.hidden && key.name === 'escape') {
      box.hide();
      box.screen.render();
      return false;
    }
  }

  box.on('show', ()=> {
    box.onScreenEvent('keypress', hideWithEscape);
  });
  box.on('hide', ()=> {
    box.removeScreenEvent('keypress', hideWithEscape);
  });

  box.setItem = function(item) {
    this.title.setContent(item.title);
    this.description.setMarkdown(item.description || '');
    this.workorder.setContent(item.workorder);
    this.project.setContent(item.project);
    this.state.setContent(item.state);
  };

  return box;
}
;