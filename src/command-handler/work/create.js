const objectMapper = require('../../cli-util/object-mapper');

module.exports = createWorkHandler;

const mapping = {
  start: 'start',
  end: 'end',
  description: 'description',
  task: 'taskId'
};

function createWorkHandler(argv, context) {
  console.log('adding work log');
  const workRepository = context.ubtrac.workLogRepository;
  const workitem = objectMapper(argv, mapping, {filter: (v) => v != null});

  workRepository.create(workitem, {stopRunning: argv.stop})
    .then(w => console.log(w))
    .catch(e => console.log(e.message));
}

