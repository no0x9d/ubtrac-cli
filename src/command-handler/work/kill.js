module.exports = killWorkHandler;

function killWorkHandler(argv, context) {
  console.log(`delete item ${argv.id}`);
  const workRepository = context.ubtrac.workLogRepository;
  workRepository.deleteById(argv.id)
    .then(w => console.log(w))
    .catch(e => console.log(e.message));
}
