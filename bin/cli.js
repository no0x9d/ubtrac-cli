#!/usr/bin/env node
'use strict';

var argv = require('yargs')
  .commandDir('../src/commands')
  .demand(1)
  .help()
  .argv;

