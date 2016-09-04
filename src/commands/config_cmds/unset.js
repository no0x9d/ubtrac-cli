'use strict';
exports.command = 'unset <key>';
exports.desc = 'unsets a config value. may also delete a whole config hierarchy';
exports.builder = {};
exports.handler = function(argv) {
  const Config = require('../../config');
  const unset = Config.unset('config', [argv.key]);
  if (unset)
    console.log(`unset ${argv.key}`);
  else
    console.log(`could not unset ${argv.key}`);
};