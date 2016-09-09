module.exports = bootstrapCommandHandler;

function bootstrapCommandHandler(argv, handler) {
  const context = require('./bootstrap');
  return handler(argv, context);
}