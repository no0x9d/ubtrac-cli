module.exports = listWorkHandler;

function listWorkHandler(argv, context) {
  const workRepository = context.ubtrac.workLogRepository;
  workRepository.findAll()
    .then(w => console.log(w))
    .catch(err => console.log(err.message))
}
