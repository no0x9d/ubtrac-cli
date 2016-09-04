'use strict';
exports.command = 'set <key> <value>';
exports.desc = 'sets a config value';
exports.builder = {};
exports.handler = function(argv) {
  const Config = require('../../config');
  Config.set('config', {[argv.key]: argv.value});
  console.log(`set ${argv.key} to ${argv.value}`);
};