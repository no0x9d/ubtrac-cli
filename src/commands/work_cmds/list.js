'use strict';
exports.command = 'list';
exports.desc = 'lists all work items';
exports.builder = { };
exports.handler = function() {
  const workLogRepository = require('../../bootstrap').ubtrac.workLogRepository;
  workLogRepository.findAll()
    .then(w => console.log(w))
    .catch(err => console.log(err.message))
};