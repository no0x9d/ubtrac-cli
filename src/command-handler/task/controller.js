'use strict';
const groupBy = require('lodash.groupby');

class Controller {
  constructor(tui) {
    this.tui = tui;
    this.taskRepository = require('../../bootstrap').ubtrac.taskRepository;
    this.showArchived = false;
  }

  changeState(task, state) {
    this.taskRepository.updateById(task._id, {state: state})
      .then(()=> this.setTasks())
  }

  updateTask(id, props) {
    this.taskRepository.updateById(id, props)
      .then(() => this.setTasks());
  }

  createTask(props) {
    this.taskRepository.create(props)
      .then(() => this.setTasks());
  }

  setTasks() {
    this.taskRepository.findAll(this.showArchived)
      .then(tasks => this.tui.setTasks(groupBy(tasks, 'state')))
      .catch(err => console.log(err.message));
  }

  archiveTask(item) {
    if (item.state === 'done') {
      this.taskRepository.updateById(item._id, {archived: true})
        .then(()=> this.setTasks())
    }
  }

  toggleShowArchived() {
    this.showArchived = !this.showArchived;
    this.setTasks();
  }
}

module.exports = Controller;
