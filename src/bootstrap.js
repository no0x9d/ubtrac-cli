'use strict';
const Db = require('tingodb')().Db;
const Ubtrac = require('ubtrac-core');
const osenv = require('osenv');
const path = require('path');
const mkdirp = require('mkdirp');

var dbPath = path.join(osenv.home(), '.ubtrac', 'db');
mkdirp.sync(dbPath);

const db = new Db(dbPath, {});

const ubtrac = Ubtrac(db);

module.exports.db = db;
module.exports.ubtrac = ubtrac;