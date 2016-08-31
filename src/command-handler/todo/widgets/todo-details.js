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

  box._.title = grid.set(0, 0, 1, 1, blessed.Box, {label: 'Title', clickable: true, keyable: true});
  box._.description = grid.set(1, 0, 5, 1, contrib.markdown, {label: 'Description', clickable: true, keyable: true});
  box._.workorder = grid.set(6, 0, 1, 1, blessed.Box, {label: 'Workorder', clickable: true, keyable: true});
  box._.project = grid.set(7, 0, 1, 1, blessed.Box, {label: 'Project', clickable: true, keyable: true});
  box._.state = grid.set(8, 0, 1, 1, blessed.Box, {label: 'State'});
  box._.worklog = grid.set(9, 0, 3, 1, blessed.List, {label: 'Worklog'});

  function hideWithEscape(ch, key) {
    if (!box.hidden && key.name === 'escape') {
      box.hide();
      box.screen.rewindFocus();
      box.screen.render();
      return false;
    }
  }

  function setupKeyListener(el, ch, key) {
    if (key.name === 'down') {
      box.screen.focusNext();
    } else if (key.name === 'up') {
      box.screen.focusPrev();
    }
  }

  box.on('show', ()=> {
    box._.title.focus();
    box.onScreenEvent('keypress', hideWithEscape);
    box.on('element keypress', setupKeyListener)
  });
  box.on('hide', ()=> {
    box.removeScreenEvent('keypress', hideWithEscape);
    box.removeListener('element keypress', setupKeyListener)
  });

  //set green border
  box.on('element focus', function(el) {
    if (el.border) el.style.border.fg = 'green';
    box.screen.render();
  });

  //reset border
  box.on('element blur', function(el) {
    if (el.border) el.style.border.fg = 'default';
    box.screen.render();
  });

  var prompt = blessed.prompt({
    parent: box,
    border: 'line',
    height: 'shrink',
    width: 'half',
    top: 'center',
    left: 'center',
    keys: true,
    vi: true
  });

  //register 'edit' events
  [box._.title, box._.workorder, box._.project].forEach(el => {
    el.on('key e', ()=> {
      prompt.input('', el.content, (err, value) => {
        if (err) {
          return box.screen.debug(err)
        }
        if (value !== null) {
          el.setContent(value);
        }
        box.screen.render();
      })
    })
  });

  box._.description.on('key e', ()=> {
    box.screen.readEditor({value: box._.description.get('markdown')}, (err, value) => {
      if (err) {
        return box.screen.debug(err);
      }

      box._.description.setMarkdown(value);
      box._.description.set('markdown', value);
      box.screen.render();
    });
  });

  box.edit = function(item) {
    this.setItem(item);
    this.show();
    this.screen.render();
  };

  box.setItem = function setItem(item = {}) {
    this._.item = item;
    this._.title.setContent(item.title);
    this._.description.setMarkdown(item.description || '');
    this._.description.set('markdown', item.description);
    this._.workorder.setContent(item.workorder);
    this._.project.setContent(item.project);
    this._.state.setContent(item.state);
  };

  return box;
}
;