module.exports = bootstrapCommandHandler;

function bootstrapCommandHandler(argv, handler) {

  console.log(argv, handler);
  const context = require('./bootstrap');
  return handler(argv, context);
}