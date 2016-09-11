module.exports = listTaskHandler;

function listTaskHandler(argv, context) {
  const taskRepository = context.ubtrac.taskRepository;
  taskRepository.findAll()
    .then(task => console.log(task))
    .catch(err => console.log(err.message))
}
