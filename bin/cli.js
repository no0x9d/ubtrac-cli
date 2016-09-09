#!/usr/bin/env node
'use strict';

var argv = require('yargs')
  .commandDir('../src/commands')
  .demand(1)
  .help()
  .fail((msg, err) => {
    console.error(err);
    process.exit(1);
  })
  .argv;

