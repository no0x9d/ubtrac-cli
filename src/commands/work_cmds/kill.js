'use strict';
exports.command = 'kill';
exports.desc = 'deletes a work log item>';
exports.builder = {
  id: {
    demand: true,
    alias: 'i',
    describe: 'the id',
    type: 'string'
  }
};
exports.handler = function(argv) {
  console.log(`delete item ${argv.id}`);
  const workRepository = require('../../bootstrap').ubtrac.workLogRepository;
  workRepository.deleteById(argv.id)
    .then(w => console.log(w))
    .catch(e => console.log(e.message));
};
