'use strict';
const groupBy = require('lodash.groupby');

class Controller {
  constructor(tui) {
    this.tui = tui;
    this.taskRepository = require('../../bootstrap').ubtrac.taskRepository;
    this.showArchived = false;
  }

  changeState(item, state) {
    this.taskRepository.updateById(item._id, {state: state})
      .then(()=> this.setItems())
  }

  updateItem(id, props) {
    this.taskRepository.updateById(id, props)
      .then(() => this.setItems());
  }

  createItem(props) {
    this.taskRepository.create(props)
      .then(() => this.setItems());
  }

  setItems() {
    this.taskRepository.findAll(this.showArchived)
      .then(tasks => this.tui.setItems(groupBy(tasks, 'state')))
      .catch(err => console.log(err.message));
  }

  archiveItem(item) {
    if (item.state === 'done') {
      this.taskRepository.updateById(item._id, {archived: true})
        .then(()=> this.setItems())
    }
  }

  toggleShowArchived() {
    this.showArchived = !this.showArchived;
    this.setItems();
  }
}

module.exports = Controller;
