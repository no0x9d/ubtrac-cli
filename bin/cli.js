#!/usr/bin/env node
'use strict';

var argv = require('yargs')
  .commandDir('../src/commands')
  .demand(1)
  .help()
  .fail((msg, err) => {
    if (err) throw err;
    console.log(msg);
    process.exit(1);
  })
  .completion('completion')
  .argv;

