'use strict';
const blessed = require('blessed');

module.exports = exports = function Board(options, columnDefinitions) {
  const board = blessed.element(options);

  // calculate width for an individual column
  const percetualWidth = Math.floor(100 / columnDefinitions.length);

  //create columns from parameter definitions
  const columns = columnDefinitions.map((columnDefinition, index) => {
    const list = createTodoBox(columnDefinition.label, percetualWidth, index);
    list.set('state', columnDefinition.state);
    return list;
  });

  //add columns to our board and setup all key events
  columns.forEach((column, index, columns) => {
    board.append(column);
    setupKeypress(board, column, columns[index - 1], columns[index + 1]);
    setupEvents(board, column)
  });

  board.set('columns', columns);

  board.setItems = setItems;
  return board;
};

function setItems(items, labelConverter) {
  this.get('columns').forEach(stateList => {
    var newItems = items[stateList.get('state')] || [];
    stateList.setItems(newItems.map(labelConverter));
    stateList.set('items', newItems);
  });
  this.screen.render();
}

function createTodoBox(label, width, index) {
  return blessed.list({
    width: width + '%',
    height: '100%',
    left: index * width + '%',
    label: label,
    mouse: true,
    keys: true,
    vi: true,
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      border: {
        fg: '#f0f0f0'
      },
      selected: {
        bg: 'default',
        fg: 'default'
      }
    }
  });
}

function setupKeypress(board, list, left, right) {
  list.on('keypress', function(ch, key) {
    function changeFocusOrState(target) {
      if (key.shift) {
        var item = getSelectedMetaItem(list);
        if (item) {
          board.emit('change state', item, target.get('state'))
        }
      } else {
        target.focus();
        board.screen.render();
      }
    }

    if (key.name == 'left' && left) {
      changeFocusOrState(left);
    } else if (key.name == 'right' && right) {
      changeFocusOrState(right);
    } else if (key.name == 'delete') {
      var item = getSelectedMetaItem(list);
      if (item) {
        board.emit('archive', item)
      }
    }
  });
}

function setupEvents(board, list) {
  list.on('select', () => {
    let item = getSelectedMetaItem(list);
    if (item) {
      board.emit('selected item', item)
    }
  });

  //set green border
  list.on('focus', function() {
    if (list.border) list.style.border.fg = 'green';
    if (list.style.selected) list.style.selected.bg = 'green';
    board.screen.render();
  });

  //reset border
  list.on('blur', function() {
    if (list.border) list.style.border.fg = 'default';
    if (list.style.selected) list.style.selected.bg = 'default';
    board.screen.render();
  });
}

function getSelectedMetaItem(list) {
  var items = list.get('items');
  if (!items) return;
  return items[list.selected];
}
