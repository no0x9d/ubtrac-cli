const objectMapper = require('../../cli-util/object-mapper');

module.exports = editWorkHandler;

const mapping = {
  start: 'start',
  end: 'end',
  description: 'description',
  task: 'taskId'
};

function editWorkHandler(argv, context) {
  if(!argv.id) return console.log('could not update. No id specified.');

  console.log('updating work log');
  const workRepository = context.ubtrac.workLogRepository;

  const workitem = objectMapper(argv, mapping, {filter: (v) => v != undefined});
  workRepository.updateById(argv.id, workitem)
    .then(w => console.log(w))
    .catch(e => console.log(e.message));
}

