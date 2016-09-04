'use strict';
exports.command = 'show [key]';
exports.desc = 'shows current config values';
exports.builder = {};
exports.handler = function(argv) {
  const Config = require('../../config');
  const config = Config.load('config');

  if(argv.key)
    printSingleValue(config, argv.key);
  else
    console.dir(config, {depth: null});
};

function printSingleValue(config, prop) {
  const get = require('lodash.get');
  const {inspect} = require('util');
  const configValue = get(config, prop);

  if (configValue != undefined)
    console.log(`${prop}=${inspect(configValue, {depth: null})}`);
  else
    console.log(`value ${prop} is not set`)
}
